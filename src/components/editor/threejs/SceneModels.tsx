import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEditorStore from '../EditorStore';
import GMesh from './GMesh';
import Tags from './Tags';
import { useThree } from '@react-three/fiber';

export default function SceneModels() {
  const { id } = useParams();
  const models = useEditorStore((state) => state.models);
  const viewMode = useEditorStore((state) => state.viewMode);
  const setThumbnail = useEditorStore((state) => state.setThumbnail)
  const { gl, scene, camera } = useThree()

  useEffect(() => {
    if (id) setThumbnail(gl, scene, camera, id);
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
