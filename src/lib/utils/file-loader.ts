import { Mesh, Material, MeshStandardMaterial, Vector3, Quaternion, BufferGeometry, Scene, Object3D, LoadingManager } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface Item {
  name: string;
  type: string;
  file: File | null;
  scene: Scene | Object3D;
  inScene: boolean;
}
// returnArrayofGeometries takes input files, converts them to bufferArrays -> geometries/scenes
// this function returns an array (items) of objects containing file name, type, original file and geometry data
// Can handle STL, OBJ, FBX, GLTF
async function returnArrayOfGeometries(files: FileList) {


  let items: Array<Item> = [];
  let buffers: Map<string, ArrayBuffer> = new Map();

  if (!files || files.length === 0) {
    throw new Error("No files were selected or files list is empty.");
  }


  // STAGE 1 : POPULATE BUFFERS
  // Function to convert file to Bufferarray and add to buffers map (these are .bin files)
  const readFileAsArrayBuffer = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          buffers.set(file.name, event.target.result as ArrayBuffer);
          resolve();
        } else {
          reject(new Error("Failed to read file as ArrayBuffer."));
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Reads through files that contain bin files and sends them to readFileAsArrayBuffer (function above)
  const readPromises = Array.from(files)
    .filter(file => file.name.endsWith('.bin'))
    .map(file => readFileAsArrayBuffer(file));
  // Wait for all promises to complete (function above)
  await Promise.all(readPromises);


  // STAGE 2 : CONVERT FILES TO GEOMETRY AND RETURN THEM
  for (const file of files) {
    const name = file.name.split('.')[0]
    const type = file.name.split('.')[1].toLowerCase()
    if (!(type === "gltf" || type === "glb" || type === "stl" || type === "obj" || type === "fbx")) continue
    const geometry = await loadGeometry(file, type, name, buffers)
    items.push({ name, type, file: file, scene: geometry, inScene: false })
  }

  return items

}

// Takes file, finds file type then converts to bufferArray then Loader -> Geometry data is then returned
async function loadGeometry(file: File, type: string, name: string, buffers: Map<string, ArrayBuffer>): Promise<Mesh | Object3D> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    switch (type) {
      case 'stl': //ignoring stls until i add functionality later
        reader.onload = (event) => {
          try {

            if (!event.target || !event.target.result) {
              reject(new Error("Failed to read STL file as ArrayBuffer. Event target is null or result is undefined."));
              return;
            }

            const geometry = new STLLoader().parse(event.target.result);
            // geometry.sourceType = "stl";
            // geometry.sourceFile = name;
            const material = new MeshStandardMaterial({ color: 0xffffff })
            let mesh = new Mesh(geometry, material)

            resolve(mesh);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };

        if (reader.readAsBinaryString !== undefined) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
        break;

      case 'obj':
        reader.onload = (event) => {
          try {

            if (!event.target || !event.target.result) {
              reject(new Error("Failed to read obj file as ArrayBuffer. Event target is null or result is undefined."));
              return;
            }

            const geometry = new OBJLoader().parse(event.target.result as string);
            geometry.name = name
            resolve(geometry);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsText(file)
        break;

      case 'fbx':
        reader.onload = (event) => {
          try {

            if (!event.target || !event.target.result) {
              reject(new Error("Failed to read fbx file as ArrayBuffer. Event target is null or result is undefined."));
              return;
            }

            const geometry = new FBXLoader().parse(event.target.result, '')
            resolve(geometry)
          } catch (error) {
            reject(error)
          }

        }
        reader.readAsArrayBuffer(file)
        break

      case 'glb':

        reader.onload = (event) => {
          try {

            if (!event.target || !event.target.result) {
              reject(new Error("Failed to read glb file as ArrayBuffer. Event target is null or result is undefined."));
              return;
            }

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('/draco/')

            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            gltfLoader.parse(event.target.result, '', (result) => {
              let scene = result.scene
              resolve(scene)
            })

          } catch (error) {
            reject(error)
          }

        }
        reader.readAsArrayBuffer(file)

        break

      case 'gltf':

        loadGLTF(file, buffers).then((scene: Object3D) => {
          resolve(scene)
        }).catch((error) => {
          //console.error('Error loading GLTF:', error);
          reject(error)
        });
        break

      default:
        reject(new Error("Unsupported file type"));
    }
  });
}


// Specific function for 'gltf' as it receives a separate bin file, the threejs loadingManager needs modifying to accept it
const loadGLTF = (file: File, buffers: Map<string, ArrayBuffer>): Promise<Object3D> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {

        if (!event.target || !event.target.result) {
          reject(new Error("Failed to read fbx file as ArrayBuffer. Event target is null or result is undefined."));
          return;
        }

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        const loadingManager = new LoadingManager();
        const gltfLoader = new GLTFLoader(loadingManager);
        gltfLoader.setDRACOLoader(dracoLoader);


        // Set URL modifier to intercept resource requests and provide Blob URLs
        loadingManager.setURLModifier((url) => {
          const buffer = buffers.get(url);
          if (buffer) {
            const resourceBlob = new Blob([buffer], { type: 'application/octet-stream' });
            return URL.createObjectURL(resourceBlob);
          }
          return url; // Return the original URL if not found in buffers
        });

        gltfLoader.parse(event.target.result, '', (result) => {
          let scene = result.scene;
          resolve(scene);
        });

      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};


// For loading an example file
function loadPublicGLTFFile(filepath: string): Promise<Item[]> {

  const gltfLoader = new GLTFLoader();

  return new Promise<Item[]>((resolve, reject) => {
    gltfLoader.load(
      filepath,
      (gltf) => {
        const items: Item[] = [{ name: filepath, type: 'gltf', file: null, scene: gltf.scene, inScene: false }];
        resolve(items);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
}

interface MeshData {
  name: string;
  uuid: string;
  geometry: BufferGeometry;
  material: Material;
  position: Vector3;
  quaternion: Quaternion;
  scale: Vector3;
}

function extractMeshes(scene: Scene | Object3D): MeshData[] {
  let meshArray: MeshData[] = [];

  scene.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    let childWorldPosition = child.getWorldPosition(new Vector3())
    let childWorldQuaternion = child.getWorldQuaternion(new Quaternion())
    let childWorldScale = child.getWorldScale(new Vector3())
    let material;
    if (child.material instanceof MeshStandardMaterial) {
      material = child.material.clone();
    } else {
      console.log("Having to swap")
      material = new MeshStandardMaterial({ color: 0xffffff });
    }

    meshArray.push({
      name: child.name,
      uuid: child.uuid,
      geometry: child.geometry.clone(),
      material: material,
      position: childWorldPosition.clone(),
      quaternion: childWorldQuaternion.clone(),
      scale: childWorldScale.clone()
    });
  });
  return meshArray;
}

function generateModels(items: Array<Item>): { [key: string]: MeshData[] } {
  let modelArray: { [key: string]: MeshData[] } = {};

  items.forEach((object) => {
    if (modelArray[object.name]) {
      console.warn(`Duplicate model name detected: ${object.name}`);
    }
    modelArray[object.name] = extractMeshes(object.scene);
  });

  console.log(modelArray);

  return modelArray;
}



export { returnArrayOfGeometries, loadPublicGLTFFile, generateModels, extractMeshes };
