import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Bounds,
  useBounds,
  Environment,
  GizmoHelper,
  GizmoViewcube,
} from "@react-three/drei";
import useEditorStore from "./EditorStore";
import SceneModels from "./threejs/SceneModels";
import GUI from "./ui/GUI";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const Editor = () => {
  const ref = useRef<OrbitControlsImpl>(null);
  const unSelectedAll = useEditorStore((s) => s.unSelectedAll);
  const setupProject = useEditorStore((s) => s.setupProject);
  const insertBookMarkEntry = useEditorStore((s) => s.insertBookmarkEntry)
  const { id } = useParams();


  useEffect(() => {

    if (!id) {
      console.error("No id returned from url params");
      return;
    }

    const fetchProject = async () => {
      try {
        await setupProject(id);
        toast.success("Project Ready", {
          duration: 500
        });

        let isBookmarked = await insertBookMarkEntry()

        if (isBookmarked) {
          toast.success("Project added to dashboard", {
            duration: 900
          });
        }


      } catch (e) {
        console.error(e);
      }
    };

    fetchProject();

  }, [id]);


  return (
    <>
      <Toaster position="top-center"
        containerStyle={{
          zIndex: '9999 !important'
        }} />

      <React.StrictMode>
        <Canvas
          onPointerMissed={() => unSelectedAll()}
          shadows
          camera={{ position: [-15, 10, 15], fov: 25 }}
        >
          <color attach="background" args={["#F6F8FC"]} />
          <Bounds fit clip observe margin={1.2} maxDuration={1}>
            <SceneModels />
            <CameraControl />
          </Bounds>
          <OrbitControls ref={ref} />
          <Environment preset="city" />
          <OrbitControls makeDefault />
        </Canvas>
        <GUI />
      </React.StrictMode>
    </>
  );
};

function CameraControl() {
  const viewMode = useEditorStore((state) => state.viewMode);
  const bounds = useBounds();

  useEffect(() => {
    bounds.refresh().clip().fit();
  }, [viewMode]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Space") {
        bounds.refresh().clip().fit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [bounds]);

  return null;
}

export default Editor;

