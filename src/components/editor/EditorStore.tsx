import { create } from "zustand";
import { WebGLRenderer, Scene, Camera, Material } from "three";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../supabaseClient";
import {
  MeshData,
  TagData,
  CommentData,
  ViewProjectData,
} from "../../types/index";
import JSZip from "jszip";
import {
  generateModels,
  returnArrayOfGeometries,
} from "../../lib/utils/file-loader";
import {
  deserializeTagDataInComments,
  serializeTagData,
} from "../../lib/utils/api-helpers";
// import { resizeBase64ImageToJPEGBlob } from "../../lib/utils/image-compression";

interface EditorStoreState {
  projectData: ViewProjectData | null;
  models: Record<string, MeshData[]>;
  selected: string;
  hideList: string[];
  selectedComment: string;
  comments: CommentData[];
  viewMode: boolean;
  commentMode: boolean;
  displayTags: boolean;
  tagSize: number;
  tempTags: TagData[];
  showComments: boolean;
  apiProjectId: string;
  thumbnailTaken: boolean;
  toggleShowComments: (value?: boolean) => void;
  unSelectedAll: () => void;
  updateSelectedComment: (newComment: string) => void;
  toggleDisplayTags: () => void;
  addComment: (
    content: string,
    userPicUrl: string | null,
    username: string
  ) => void;
  addTempTags: (newTag: TagData) => void;
  clearTempTags: () => void;
  updateTagSize: (newSize: number) => void;
  updateSelected: (newUUID: string) => void;
  updateHideList: (newUUID: string) => void;
  updateModels: (newModels: Record<string, MeshData[]>) => void;
  updateViewMode: (newViewMode: boolean) => void;
  updateCommentMode: (newCommentMode: boolean) => void;
  returnMeshProperties: (uuid: string) => MeshData | null;
  updateMesh: (uuid: string, newProperties: Partial<MeshData>) => void;
  updateComments: (updatedComments: CommentData[]) => void;
  uploadFile: (file: File) => Promise<string>;
  uploadProject: (name: string, url: string) => Promise<void>;
  setupProject: (id: string) => Promise<void>;
  apiGetProject: (id: string) => Promise<ViewProjectData>;
  apiGetFiles: (url: string) => Promise<Blob>;
  unzipFiles: (data: Blob) => Promise<FileList>;
  insertBookmarkEntry: () => Promise<boolean>;
  deleteWhiteListEntry: (id: string) => Promise<void>;
  insertWhiteListEntry: (projectId: string, email: string) => Promise<void>;
  updateProjectPrivacy: (projectId: string, isPublic: boolean) => Promise<void>;
  apiGetComments: () => Promise<void>;
  setThumbnail: (
    gl: WebGLRenderer,
    scene: Scene,
    camera: Camera
  ) => Promise<void>;
  subscribeToComments: (
    project_id: string
  ) => Promise<(project_id: string) => void>;
  resetStore: () => Promise<void>;
}

const useEditorStore = create<EditorStoreState>((set, get) => ({
  projectData: null,
  models: {},
  selected: "",
  hideList: [],
  selectedComment: "",
  comments: [],
  viewMode: false,
  commentMode: false,
  displayTags: true,
  tagSize: 1,
  tempTags: [],
  showComments: false,
  apiProjectId: "",
  thumbnailTaken: false,
  unSelectedAll: () =>
    set((state) => {
      if (!state.commentMode) {
        return {
          selectedComment: "",
          selected: "",
        };
      }
      return state;
    }),
  updateSelectedComment: (newComment) =>
    set(() => {
      console.log("New selected comment:", newComment);
      return { selectedComment: newComment };
    }),
  toggleDisplayTags: () =>
    set((state) => ({ displayTags: !state.displayTags })),
  toggleShowComments: (value?: boolean) =>
    set((state) => ({
      showComments: typeof value === "boolean" ? value : !state.showComments,
    })),
  addComment: async (content, userPicUrl, username) => {
    const { tempTags, projectData } = get(); // Destructure the needed parts of the state

    if (!projectData) return;

    let jsonTempTags = tempTags.map((tempTag) => {
      return serializeTagData(tempTag);
    });

    const { error: insertError } = await supabase.from("comments").insert({
      content: content,
      tags: jsonTempTags,
      project_id: projectData!.id,
      profile_img_url: userPicUrl,
      user_name: username,
    });

    if (!insertError) {
      set({
        tempTags: [],
        commentMode: false,
      });
      get().apiGetComments();
    } else {
      console.error("Failed to insert comment:", insertError);
    }
  },
  addTempTags: (newTag) =>
    set((state) => ({ tempTags: [...state.tempTags, newTag] })),
  clearTempTags: () =>
    set(() => ({
      tempTags: [],
    })),
  updateTagSize: (newSize) =>
    set(() => {
      return { tagSize: newSize };
    }),
  updateSelected: (newUUID) =>
    set(() => ({
      selected: newUUID,
    })),
  updateHideList: (newUUID) =>
    set((state) => {
      if (!state.hideList.includes(newUUID)) {
        return { hideList: [...state.hideList, newUUID] };
      } else {
        return { hideList: state.hideList.filter((val) => val !== newUUID) };
      }
    }),
  updateModels: (newModels) =>
    set(() => {
      return { models: newModels };
    }),
  updateViewMode: (newViewMode) =>
    set(() => {
      return { viewMode: newViewMode };
    }),
  updateCommentMode: (newCommentMode) =>
    set(() => {
      return { commentMode: newCommentMode };
    }),
  returnMeshProperties: (uuid) => {
    const state = get();
    for (const meshList of Object.values(state.models)) {
      for (const mesh of meshList) {
        if (mesh.uuid === uuid) {
          return { ...mesh };
        }
      }
    }
    return null;
  },
  updateMesh: (uuid, newProperties) =>
    set((state) => {
      const updatedModels = { ...state.models };

      for (const [key, meshList] of Object.entries(updatedModels)) {
        updatedModels[key] = (meshList as MeshData[]).map((mesh: MeshData) => {
          if (mesh.uuid === uuid) {
            const updatedMaterial = newProperties.material instanceof Material
              ? { ...mesh.material, ...newProperties.material }
              : mesh.material;

            return {
              ...mesh,
              material: updatedMaterial,
              ...newProperties,
            };
          }
          return mesh;
        });
      }

      return { models: updatedModels };
    }), // Closing brace for set function call
  updateComments: (updatedComments: CommentData[]) =>
    set(() => ({
      comments: updatedComments,
    })),
  uploadFile: async (file: File): Promise<string> => {
    const { data, error } = await supabase.storage
      .from("models")
      .upload(`${uuidv4()}-${file.name}`, file);
    if (error) {
      throw new Error(`File upload failed: ${error.message}`);
    } else {
      return data.path;
    }
  },
  uploadProject: async (name: string, url: string): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([{ name, url }])
        .select();

      if (error) {
        throw new Error(`Insert failed: ${error.message}`);
      }
      console.log("Insert successful", data);
      set({ apiProjectId: data[0].id });
    } catch (err) {
      console.error("Insert database error", err);
      throw new Error("Insert database failed");
    }
  },
  apiGetProject: async (id: string): Promise<ViewProjectData> => {
    const { data, error } = await supabase
      .from("view_all_project_details")
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(`Fetch failed: ${error.message}`);
    }

    if (data && data.length > 0) {
      set({ projectData: data[0] });
      return data[0];
    } else {
      throw new Error("No project found with the given id");
    }
  },
  apiGetFiles: async (url: string): Promise<Blob> => {
    const { data, error } = await supabase.storage.from("models").download(url);
    console.log("Data downloaded succesfully", data, url);
    if (error) throw new Error("File download failed");
    return data;
  },
  unzipFiles: async (data): Promise<FileList> => {
    const zip = await JSZip.loadAsync(data);
    const filesArray = [];

    // Iterate over each file in the ZIP
    for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
      // Check if the entry is a file (not a folder)
      if (!zipEntry.dir) {
        // Extract the file
        const fileData = await zipEntry.async("blob");

        // Create a File object from the Blob
        const file = new File([fileData], relativePath, {
          type: fileData.type,
        });

        // Add the File object to the array
        filesArray.push(file);
      }
    }

    const dataTransfer = new DataTransfer();
    filesArray.forEach((file) => dataTransfer.items.add(file));
    console.log("dataTranfer: ", dataTransfer.files);
    return dataTransfer.files;
  },
  setupProject: async (id: string): Promise<void> => {
    try {
      const data = await get().apiGetProject(id);
      console.log("data", data);
      set({ projectData: data });
      const zipData = await get().apiGetFiles(data.url);
      const files = await get().unzipFiles(zipData);
      const newModels = await returnArrayOfGeometries(files);
      const loadedModels = generateModels(newModels);
      get().updateModels(loadedModels);
      get().updateViewMode(true);
    } catch (err) {
      console.log(err);
    }
  },
  insertBookmarkEntry: async () => {
    let project = get().projectData;
    if (!project || project.is_owner) {
      return false; // Early return if no project data or user is the owner
    }

    // Check if a bookmark already exists
    const { data, error } = await supabase
      .from("view_bookmarks") // Assuming you want to check directly in the bookmarks table
      .select()
      .eq("project_id", project.id);

    console.log("DOES BOOKMARK EXIST?: ", data);

    if (error) {
      console.error("Error fetching bookmark:", error);
      return false; // Handle the error by returning false
    }

    if (data.length > 0) {
      return false; // Bookmark already exists, no need to add a new one
    } else {
      // Attempt to insert a new bookmark
      console.log("ATTEMPTING TO INSERT!");
      const { error: insertError } = await supabase
        .from("bookmarks")
        .insert({ project_id: project.id });

      if (insertError) {
        console.error("Error inserting bookmark:", insertError);
        return false; // Return false if there was an error inserting the bookmark
      }

      return true; // Return true if the bookmark was successfully added
    }
  },
  deleteWhiteListEntry: async (id: string) => {
    console.log("deleting whitelist entry", id);
    const { error } = await supabase
      .from("whitelist")
      .delete()
      .match({ id: id });

    if (error) {
      console.error("Error deleting whitelist entry", error);
      throw error; // Throw the error to propagate it to the parent
    }

    let projData = get().projectData
    try {
      if (projData) await get().apiGetProject(projData.id);
    } catch (err) {
      throw err;
    }
  },
  insertWhiteListEntry: async (projectId: string, email: string) => {
    const { error } = await supabase
      .from("whitelist")
      .insert([{ project_id: projectId, email: email }])
      .select();

    if (error) {
      throw new Error(`Insert failed: ${error.message}`);
    }

    try {
      await get().apiGetProject(projectId);
    } catch (err) {
      throw err;
    }
  },
  updateProjectPrivacy: async (projectId: string, isPublic: boolean) => {
    console.log("updating isPrivate! for", projectId, "isPublic", isPublic);
    const { error } = await supabase
      .from("projects")
      .update({ is_public: isPublic })
      .match({ id: projectId });

    if (error) {
      console.error("Error updating project privacy:", error);
    }
    try {
      await get().apiGetProject(projectId);
    } catch (err) {
      throw err;
    }
  },
  apiGetComments: async () => {
    const project = get().projectData; // Assuming get() is a correct function returning state.
    if (!project) {
      console.error("Project data is not available.");
      throw new Error("Project data is not available.");
    }

    console.log("Getting comments for project:", project.id);
    let data, error;

    try {
      ({ data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("project_id", project.id));

      if (error) {
        throw new Error(`Failed to fetch comments: ${error.message}`);
      }

      console.log("Comments received!", data);
      if (data) {
        const convertedComments = deserializeTagDataInComments(data);
        set({ comments: convertedComments });
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      throw err; // Rethrow or handle error as appropriate for your application's structure
    }
  },
  setThumbnail: async (gl, scene, camera) => {
    await new Promise((resolve) => setTimeout(resolve, 8000));

    const { projectData, apiGetProject } = get();

    // Early return if a thumbnail URL already exists
    if (projectData && projectData.thumbnail_url) {
      return;
    }

    // Render the scene and take a screenshot
    gl.render(scene, camera);
    const screenshot = gl.domElement.toDataURL("image/jpeg");

    try {
      // Resize the image to JPEG blob before uploading
      //const resizedBlob = await resizeBase64ImageToJPEGBlob(screenshot);

      const response = await fetch(screenshot);
      const blob = await response.blob();
      //      const resizedBlob = await resizeBase64ImageToJPEGBlob(screenshot); //to use compressor comment the two lines above!
      const filename = `${uuidv4()}-${new Date().toISOString()}.jpeg`; // Adjusted for JPEG extension
      const file = new File([blob], filename, { type: "image/jpeg" });

      // Upload the screenshot to storage
      const { data, error: uploadError } = await supabase.storage
        .from("thumbnails")
        .upload(filename, file);
      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      // Update the project entry with the new thumbnail URL
      const { error: updateError } = await supabase
        .from("projects")
        .update({ thumbnail_url: data.path })
        .match({ id: projectData!.id });

      if (updateError) {
        throw new Error(`Project update failed: ${updateError.message}`);
      }

      // Refresh project data after successful update
      apiGetProject(projectData!.id);
    } catch (error) {
      console.error("Error in setting thumbnail:", error);
    }
  },
  subscribeToComments: async (project_id) => {
    const changes = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `project_id=eq.${project_id}`,
        },
        (payload) => {
          console.log(payload);
          // Assuming get().apiGetComments() adds the payload to existing comments
          // You would modify the logic here as needed to merge new comments
          get().apiGetComments(); // Adjust based on your implementation
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(changes);
    };
  },
  resetStore: async () => {
    set({ projectData: null, models: {} });
  },
}));

export default useEditorStore;
