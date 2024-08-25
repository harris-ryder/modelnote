import { useRef, useState, ChangeEvent } from "react";
// import {
//   returnArrayOfGeometries,
//   generateModels,
// } from "../../lib/utils/fileLoader";
import Button from "../ui/Button";
import toast, { Toaster } from "react-hot-toast";
import JSZip from "jszip";
import { useApiStore } from "../../store/api-store";
import { useNavigate } from "react-router-dom";


type ModalLabel = 'fileUpload' | 'nameUpload'


export function Modal() {

  const fileInput = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const uploadFile = useApiStore((s) => s.uploadFile);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const uploadProject = useApiStore((s) => s.uploadProject);

  const navigate = useNavigate();

  const [modalState, setModalState] = useState<ModalLabel>("fileUpload")
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fileUpload(e: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    try {
      if (e.target.files && e.target.files.length > 0) {
        // const newModels = await returnArrayOfGeometries(e.target.files);
        // const loadedModels = generateModels(newModels);

        // Create a new ZIP file
        const zip = new JSZip();
        for (const file of Array.from(e.target.files)) {
          zip.file(file.name, file);
        }

        // Generate the ZIP file as a Blob
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Create a new File object from the Blob
        const zipFile = new File([zipBlob], `${e.target.files[0].name}.zip`, {
          type: "application/zip",
        });

        // Upload the ZIP file to Supabase
        try {
          const fileUrl = await uploadFile(zipFile);
          setFileUrl(fileUrl);

        } catch (error) {
          console.error("Error uploading file:", error);
          throw new Error(`File upload failed: ${error}`);
        }
        setModalState('nameUpload')
        toast.success("File Loaded!");
      }
    } catch (error) {
      if (fileInput && fileInput.current) fileInput.current.value = ''
      toast.error("Error with file try again");
    } finally {
      setIsLoading(false);
    }
  }

  async function submitProject() {

    try {
      setIsLoading(true)
      const id = fileUrl && (await uploadProject(projectName, fileUrl));
      navigate(`/editor/${id}`)
    } catch (error) {
      toast.error("Error with database try again");
    } finally {
      setIsLoading(false)

    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-600 bg-opacity-50 pointer-events-none z-50">
      </div>
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-sky-100  border border-sky-200 pointer-events-auto rounded flex-col items-center gap-2 flex shadow-level1 z-50"
        ref={modalRef}
      >
        {(modalState === "fileUpload") && (
          <div
            className={`flex items-center gap-4`}
          >
            <input
              type="file"
              ref={fileInput}
              onChange={fileUpload}
              style={{ display: "none" }}
              multiple={true}
              accept=".obj,.stl,.bin,.fbx,.glb,.gltf"
            />

            <Button size="lg" isLoading={isLoading} onClick={() => fileInput.current?.click()}>
              Upload Models
            </Button>

            <p className="text-stone-400">or</p>

            <Button onClick={() => navigate(`/editor/${'250108c9-73e9-4e74-b2e8-a4af6baebb47'}`)} size="lg">
              {" "}
              Try Example
            </Button>
          </div>
        )}

        {(modalState === "nameUpload") && (
          <div className="flex gap-2">
            <input
              className="border border-sky-300 p-2 min-w-64 h-10 cursor-text rounded no-focus-outline w-full"
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={handleInputChange}
            />
            <Button isLoading={isLoading} onClick={submitProject}>Submit</Button>
          </div>
        )}

        <hr
          className={`border-t border-stone-400 w-full ${isLoading ? "opacity-0" : "opacity-100"
            }`}
        />
        <div
          className={`flex justify-between w-full gap-2 text-stone-400 ${isLoading ? "opacity-0" : "opacity-100"
            }`}
        >
          <p>Accepts:</p>
          <p>OBJ</p>
          <p>STL</p>
          <p>FBX</p>
          <p>GLB</p>
          <p>GLTF</p>
        </div>
      </div>
    </>
  );
}
