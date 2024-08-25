import { useEffect } from 'react';
import useEditorStore from '../EditorStore';
import GMesh from './GMesh';
import Tags from './Tags';
import { useThree } from '@react-three/fiber';

export default function SceneModels() {
  const models = useEditorStore((state) => state.models);
  const viewMode = useEditorStore((state) => state.viewMode);
  const setThumbnail = useEditorStore((state) => state.setThumbnail)
  const { gl, scene, camera } = useThree()

  useEffect(() => {
    setThumbnail(gl, scene, camera);
  }, []);

  return (
    <>

      {viewMode &&
        Object.entries(models).map(([key, meshList]) => (
          meshList.map((mesh) => (
            <GMesh key={`${key}-${mesh.uuid}`} mesh={mesh} />
          ))
        ))}
      <Tags />

    </>
  );
}
