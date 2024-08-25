import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"
import { GLTF } from 'three-stdlib';
import { Mesh, Material, Group } from 'three';
import useDemoStore from '../DemoStore';

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: Mesh;
  };
  materials: {
    [key: string]: Material;
  };
};

export function DemoBuilding() {
  const { nodes, materials } = useGLTF('models/building.glb') as GLTFResult


  const selected = useDemoStore((state) => state.selected);
  const updateSelected = useDemoStore((state) => state.updateSelected);



  const ref = useRef<Group>(null!)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(Math.cos(t / 2) / 8, Math.sin(t / 4) / 8 + 2, (1 + Math.sin(t / 1.5)) / 20)
    ref.current.position.y = (1 + Math.sin(t / 1.1)) / 10 - 25
  })

  return (
    <>

      <group ref={ref} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lwpg0094003.geometry}
          material={materials.people}
          position={[-112.722, 52.556, 298.991]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lwpg0094004.geometry}
          material={materials.people}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lwpg0094005.geometry}
          material={materials.people}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lwpg0099002.geometry}
          material={materials.people}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lwpg0099007.geometry}
          material={materials.people}
          position={[-100.7, 53.289, 302.774]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_1256.geometry}
          material={materials.stone}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_1257.geometry}
          material={materials['/13']}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_1274.geometry}
          material={materials.green}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_1277.geometry}
          material={materials['/13']}
          position={[-141.995, 0, 272.486]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_1279.geometry}
          material={materials.pink}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_204.geometry}
          material={materials.rock}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_411.geometry}
          material={materials.brown}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_591.geometry}
          material={materials.water}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_592.geometry}
          material={materials.yellow}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_596.geometry}
          material={materials.pink}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_629.geometry}
          material={materials.stone}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_636.geometry}
          material={materials.green}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_781.geometry}
          material={materials.water}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_811.geometry}
          material={materials.rock}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_842.geometry}
          material={materials.chrome}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_849.geometry}
          material={materials.chrome}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.object_877.geometry}
          material={materials.chrome}
          position={[-125.898, 0, 268.194]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.pink}
          position={[-18.717, 17.184, 12.857]}
          rotation={[0, -0.897, 0]}
          scale={[1.617, 0.453, 8.563]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.pink}
          position={[-16.11, 17.034, -0.441]}
          rotation={[0.095, 0.684, -0.05]}
          scale={[1.27, 0.453, 5.405]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.pink}
          position={[-19.158, 17.796, -6.001]}
          rotation={[0.082, -0.436, 0.045]}
          scale={[0.751, 0.268, 3.196]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.pink}
          position={[-0.655, 17.11, 33.73]}
          rotation={[Math.PI, -1.029, Math.PI]}
          scale={[1.372, 0.385, 7.269]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={(selected === "1") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("1")
            e.stopPropagation()
          }}

          position={[1.613, 37.722, -45.426]}
          scale={1.937}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials.black}
          position={[1.613, 33.777, -45.426]}
          scale={[0.25, 2.44, 0.25]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={(selected === "2") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("2")
            e.stopPropagation()
          }}
          position={[10.702, 58.805, 21.283]}
          rotation={[0.674, -0.136, 0.091]}
          scale={1.937}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials.black}
          position={[11.059, 55.706, 18.87]}
          rotation={[0.674, -0.136, 0.091]}
          scale={[0.25, 2.44, 0.25]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={(selected === "3") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("3")
            e.stopPropagation()
          }}
          position={[-16.389, 22.574, 19.918]}
          scale={1.937}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials.black}
          position={[-16.389, 18.629, 19.918]}
          scale={[0.25, 2.44, 0.25]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={(selected === "4") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("4")
            e.stopPropagation()
          }}
          position={[3.448, 31.939, -4.958]}
          scale={1.937}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={materials.black}
          position={[3.448, 27.994, -4.958]}
          scale={[0.25, 2.44, 0.25]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={(selected === "5") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("5")
            e.stopPropagation()
          }}
          position={[12.777, 28.446, 18.178]}
          scale={1.443}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004.geometry}
          material={materials.black}
          position={[12.777, 25.508, 18.178]}
          scale={[0.186, 1.818, 0.186]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={(selected === "6") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("6")
            e.stopPropagation()
          }}
          position={[-0.238, 21.426, 23.59]}
          scale={1.443}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials.black}
          position={[-0.238, 18.488, 23.59]}
          scale={[0.186, 1.818, 0.186]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={(selected === "7") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("7")
            e.stopPropagation()
          }}
          position={[-3.588, 31.121, -22.933]}
          scale={1.443}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006.geometry}
          material={materials.black}
          position={[-3.588, 28.182, -22.933]}
          scale={[0.186, 1.818, 0.186]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={(selected === "8") ? materials.red : materials.stone}
          onPointerOver={(e) => {
            updateSelected("8")
            e.stopPropagation()
          }}
          position={[-4.761, 20.559, -0.267]}
          scale={1.139}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          material={materials.black}
          position={[-4.761, 18.239, -0.267]}
          scale={[0.147, 1.435, 0.147]}
        />
      </group>

    </>
  )
}

useGLTF.preload('models/building.glb')
