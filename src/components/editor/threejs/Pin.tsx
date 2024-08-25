import React from 'react';
import * as THREE from 'three';
import useEditorStore from '../EditorStore';

interface PinProps {
  position: THREE.Vector3;
  scale: number;
  targetNormal: THREE.Vector3;
  color?: string;
  commentUUID?: string | null;
}

const Pin: React.FC<PinProps> = ({ position, scale, targetNormal, color = 'skyblue', commentUUID = null }) => {
  const selectedComment = useEditorStore((s) => s.selectedComment)
  const updateSelectedComment = useEditorStore((s) => s.updateSelectedComment)
  const toggleShowComments = useEditorStore((s) => s.toggleShowComments)


  function rotateToNormal(targetNormal: THREE.Vector3): THREE.Quaternion {
    if (!targetNormal) {
      targetNormal = new THREE.Vector3(0, 1, 0); // Default normal
    }
    const defaultNormal = new THREE.Vector3(0, 1, 0);

    const rotationAxis = new THREE.Vector3().crossVectors(defaultNormal, targetNormal).normalize();
    const angle = Math.acos(defaultNormal.dot(targetNormal));
    const quaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, angle);

    return quaternion;
  }

  return (
    <group
      position={position.toArray()}
      quaternion={rotateToNormal(targetNormal)}
      scale={scale}
      onClick={commentUUID ? () => {
        updateSelectedComment(commentUUID)
        toggleShowComments(true)

      } : undefined}
    >
      <mesh position={[0, 6, 0]}>
        <sphereGeometry args={[2, 20, 20]} />
        <meshStandardMaterial color={commentUUID && (selectedComment === commentUUID) ? 'red' : color} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 10, 20]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};

export default Pin;

