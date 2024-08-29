import create from 'zustand';
import { v4 as uuidv4 } from "uuid";
import { supabase } from '../supabaseClient';
import { ViewProjectData } from '../types'

interface ApiStoreState {
  user: any;
  userPicUrl: string | null;
  newProjectId: string;
  projects: ViewProjectData[];
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
  fetchUser: () => Promise<void>;
  fetchProjects: () => Promise<any>
  uploadFile: (file: File) => Promise<string>;
  uploadProject: (name: string, url: string) => Promise<void>;
  updateProjectPrivacy: (projectId: string, isPublic: boolean) => Promise<void>;
  bookmarkWelcomeProject: () => Promise<void>;
  insertWhiteListEntry: (id: string, email: string) => Promise<void>;
  deleteWhiteListEntry: (id: string) => Promise<void>;
  getProjectUpdateUI: (id: string) => Promise<void>;
  deleteBookmarkEntry: (id: string) => Promise<void>;
  getSignedThumbnailUrl: (id: string) => Promise<string>;
  deleteProject: (projectId: string, url: string, thumbnail_url: string) => Promise<void>;
}

export const useApiStore = create<ApiStoreState>((set, get) => ({
  user: null,
  userPicUrl: null,
  newProjectId: "",
  projects: [],
  loginWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    }) as { data: any; error: any };

    if (error) {
      console.error('Login error:', error);
    } else {
      set({ user: data?.user, userPicUrl: data?.user?.user_metadata?.picture || null });
    }
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      return Promise.reject(error); // Return a rejected promise in case of error
    } else {
      set({ user: null, userPicUrl: null });
      return Promise.resolve(); // Return a resolved promise to indicate success
    }
  },

  isAuthenticated: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("User is", user);
    set({ user, userPicUrl: user?.user_metadata?.avatar_url });
    console.log("Authenticated", user, get().userPicUrl);
    if (user) {
      await get().bookmarkWelcomeProject();
    }
    return user !== null;
  },
  bookmarkWelcomeProject: async () => {
    console.log("is this working?")
    const createdAt = new Date(get().user.created_at);
    const lastSignInAt = new Date(get().user.last_sign_in_at);
    const timeDifference = Math.abs(lastSignInAt.getTime() - createdAt.getTime());
    const isFirstTimeLogin = timeDifference <= 60000; // 60000 milliseconds = 1 minute

    if (!isFirstTimeLogin) {
      // Check if a bookmark already exists
      const { data, error } = await supabase
        .from("view_bookmarks")
        .select()
        .eq("project_id", import.meta.env.VITE_EXAMPLE_PROJECT_URL);

      if (error) {
        console.error("Error fetching bookmark:", error);
        return;
      }

      if (data && data.length === 0) {
        // Attempt to insert a new bookmark
        console.log("ATTEMPTING TO INSERT!");
        const { error: insertError } = await supabase
          .from("bookmarks")
          .insert({ project_id: import.meta.env.VITE_EXAMPLE_PROJECT_URL });

        if (insertError) {
          console.error("Error inserting bookmark:", insertError);
        }
      }
    } else {
      console.log("Not first time bruh")
    }
  },
  fetchUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    set({ user, userPicUrl: user?.user_metadata?.avatar_url });
  },
  fetchProjects: async () => {

    let { data: userProjects, error: userProjectsError } = await supabase
      .from('view_user_project_details')
      .select(`*`);

    if (userProjectsError) {
      console.error("Error fetching user projects", userProjectsError);
      throw new Error("Failed to fetch user projects");
    }

    let { data: sharedProjects, error: sharedProjectsError } = await supabase
      .from('view_shared_project_details')
      .select(`*`);

    if (sharedProjectsError) {
      console.error("Error fetching shared projects", sharedProjectsError);
      throw new Error("Failed to fetch shared projects");
    }

    let combinedProjects: ViewProjectData[] = [...sharedProjects as ViewProjectData[], ...userProjects as ViewProjectData[]];
    set({ projects: combinedProjects });
    return combinedProjects;
  },
  uploadFile: async (file: File): Promise<string> => {
    const { data, error } = await supabase.storage.from('models').upload(`${uuidv4()}-${file.name}`, file);
    if (error) {
      throw new Error(`File upload failed: ${error.message}`);
    } else {
      return data.path;
    }
  },
  uploadProject: async (name: string, url: string): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          { name, url },
        ])
        .select()

      if (error) {
        throw new Error(`Insert failed: ${error.message}`);
      }
      console.log('Insert successful', data);
      set({ newProjectId: data[0].id });
      return data[0].id

    } catch (err) {
      console.error('Insert database error', err);
      throw new Error("Insert database failed");
    }
  },
  updateProjectPrivacy: async (projectId: string, isPublic: boolean) => {
    console.log("updating isPrivate! for", projectId, "isPublic", isPublic)
    const { error } = await supabase
      .from('projects')
      .update({ is_public: isPublic })
      .match({ id: projectId });

    if (error) {
      console.error('Error updating project privacy:', error);
    }
  },
  deleteWhiteListEntry: async (id: string) => {
    console.log('deleting whitelist entry', id)
    const { error } = await supabase
      .from('whitelist')
      .delete()
      .match({ id: id })

    if (error) {
      console.error("Error deleting whitelist entry", error)
      throw error  // Throw the error to propagate it to the parent
    }
  },
  insertWhiteListEntry: async (projectId: string, email: string) => {

    const { error } = await supabase
      .from('whitelist')
      .insert([
        { project_id: projectId, email: email },
      ])
      .select()

    if (error) {
      throw new Error(`Insert failed: ${error.message}`);
    }
  },
  getProjectUpdateUI: async (id) => {
    let { data: projectList, error } = await supabase
      .from('view_all_project_details')
      .select('*')
      .eq('id', id);

    console.log('project', projectList);

    if (error) {
      console.error('Error fetching project:', error);
      throw error;
    }

    if (!projectList || projectList.length === 0) {
      console.error('No project found with the specified ID');
      return;
    }

    let updatedProject = projectList[0];

    let tempProjects = [...get().projects];

    let updatedProjects = tempProjects.map((project) => {
      if (project.id === updatedProject.id) return updatedProject;
      return project;
    });

    set({ projects: updatedProjects });
  },
  deleteBookmarkEntry: async (id) => {
    console.log("Delete activated!")
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('project_id', id)
    if (error) throw error;

    let tempProjects = [...get().projects];

    let updatedProjects = tempProjects.filter((proj) => proj.id !== id)

    set({ projects: updatedProjects });

  },
  getSignedThumbnailUrl: async (url) => {

    const { data, error } = await supabase
      .storage
      .from('thumbnails')
      .createSignedUrl(url, 3600)

    if (error) throw Error
    return data?.signedUrl
  },
  deleteProject: async (projectId, url, thumbnail_url) => {
    // Delete the project from the 'projects' table
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.log("Error in deleting project:", error.message);
      throw new Error("Error in deleting project");
    }

    // Delete the thumbnail and model files concurrently
    const [{ error: thumbnailError }, { error: modelError }] = await Promise.all([
      supabase.storage.from('thumbnails').remove([thumbnail_url]),
      supabase.storage.from('models').remove([url])
    ]);

    if (thumbnailError) {
      console.log("Error in deleting thumbnail:", thumbnailError.message);
      throw new Error("Error in deleting thumbnail");
    }

    if (modelError) {
      console.log("Error in deleting model:", modelError.message);
      throw new Error("Error in deleting model");
    }

    // Filter out the deleted project from the state
    let updatedProjects = get().projects.filter((project) => project.id !== projectId);

    set({ projects: updatedProjects });
  }

}));
