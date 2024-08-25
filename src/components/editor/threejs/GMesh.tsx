import React, { useEffect, useState } from 'react';
import { Edges } from '@react-three/drei';
import useEditorStore from '../EditorStore';
import { Vector3, Mesh as ThreeMesh, Matrix3, Object3D } from 'three';
import Pin from './Pin';
import * as THREE from 'three';
import { MeshData } from '../../../types';

interface GMeshProps {
  mesh: MeshData;
}

const GMesh: React.FC<GMeshProps> = ({ mesh }) => {
  const [hover, setHover] = useState(false);
  const selected = useEditorStore((s) => s.selected);
  const updateSelected = useEditorStore((s) => s.updateSelected);
  const hideList = useEditorStore((s) => s.hideList);
  const commentMode = useEditorStore((state) => state.commentMode);
  const tagSize = useEditorStore((state) => state.tagSize);
  const addTempTags = useEditorStore((state) => state.addTempTags);
  const [tagCoords, setTagCoords] = useState(new Vector3());
  const [targetNormal, setTargetNormal] = useState(new Vector3(0, 1, 0));
  const models = useEditorStore((state) => state.models);

  useEffect(() => {
    console.log("From GMESH: ", tagSize);
  }, [tagSize]);

  const convertNormalToWorld = (normal: THREE.Vector3, object: ThreeMesh | Object3D) => {
    const normalMatrix = new Matrix3().getNormalMatrix(object.matrixWorld);
    return normal.clone().applyMatrix3(normalMatrix).normalize();
  };


  useEffect(() => {
    if (mesh.name === 'body_1') console.log("bod_1", mesh.material.color)
  }, [models])



  return (
    <>
      <mesh
        onClick={(e) => {
          updateSelected(mesh.uuid);

          const tempTag = {
            position: tagCoords,
            scale: tagSize,
            targetNormal: targetNormal,
            meshUUID: mesh.uuid,
          };

          addTempTags(tempTag);

          e.stopPropagation();
        }}
        onPointerOver={(e) => {
          setHover(true);
          if (!hideList.includes(mesh.uuid)) e.stopPropagation();
        }}
        onPointerMove={(e) => {
          if (e.intersections && e.intersections.length > 0) {
            const intersection = e.intersections[0];
            const worldNormal = convertNormalToWorld(intersection.normal!, intersection.object);
            setTargetNormal(worldNormal);
            setTagCoords(intersection.point);
          }
        }}
        onPointerOut={() => setHover(false)}
        position={mesh.position}
        quaternion={mesh.quaternion}
        scale={mesh.scale}
        visible={!hideList.includes(mesh.uuid)}
      >
        <Edges
          visible={selected === mesh.uuid}
          linewidth={2}
          scale={1.0}
          threshold={15}
          color="black"
        />
        <bufferGeometry attach="geometry" {...mesh.geometry} />
        <meshStandardMaterial
          attach="material"
          color={hover ? "#ff6080" : mesh.material.color}
        />
      </mesh>

      {hover && commentMode && (
        <Pin position={tagCoords} targetNormal={targetNormal} scale={tagSize} />
      )}
    </>
  );
};

export default GMesh;

