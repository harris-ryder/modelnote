import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useEditorStore from "../EditorStore";
import * as THREE from 'three';

function PaintTool() {
  const selected = useEditorStore((s) => s.selected as string);
  const returnMeshProperties = useEditorStore((s) => s.returnMeshProperties);
  const updateMesh = useEditorStore((s) => s.updateMesh);

  // Local state for color
  const [color, setColor] = useState<string>("#ffffff");

  useEffect(() => {
    const mesh = returnMeshProperties(selected);
    if (mesh && mesh.material) {
      const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshPhongMaterial) {
        setColor(`#${material.color.getHexString()}`);
      }
    }
  }, [selected, returnMeshProperties]);

  const handleColorChange = (newColor: string) => {
    const mesh = returnMeshProperties(selected);

    if (mesh && mesh.material) {
      const material = Array.isArray(mesh.material) ? mesh.material[0].clone() : mesh.material.clone();
      if (material.isMeshStandardMaterial) {
        material.color.set(new THREE.Color(newColor));
        updateMesh(selected, {
          material  //TODO Could cause some issues see original jsx if so
        });
      }
    }
    setColor(newColor);
  };
  return (
    <div>
      <HexColorPicker
        className="picker"
        color={color}
        onChange={handleColorChange}
      />
    </div>
  );
}

export default PaintTool;

