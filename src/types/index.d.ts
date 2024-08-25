import { BufferGeometry, Material, Vector3, Quaternion, MeshStandardMaterial } from 'three';

export interface MeshData {
  name: string;
  uuid: string;
  geometry: BufferGeometry;
  material: Material | any;
  position: Vector3;
  quaternion: Quaternion;
  scale: Vector3;
}
export interface CommentData {
  id: string;
  user_name: string;
  profile_img_url: string;
  project_id: string;
  user_id: string;
  tags: any[];
  content: string;
  created_at: string;
}

export interface PinData {
  position: THREE.Vector3,
  scale: number,
  quaternion: THREE.Vector3
}

export interface TagData {
  position: THREE.Vector3,
  scale: number,
  targetNormal: THREE.Vector3,
  meshUUID: string,
}


export interface SerializedTagData {
  position: string;
  scale: number;
  targetNormal: string;
  meshUUID: string;
}

export interface ProjectData {
  created_at: string,
  id: string,
  is_public: boolean,
  name: string,
  url: string,
  user_id: string
  thumbnail_url: string;
}

export interface ViewProjectData {
  name: string;
  id: string;
  created_at: string;
  is_public: boolean;
  url: string;
  is_owner: boolean;
  whitelist: { email: string, id: string }[];
  thumbnail_url: string;
}

export interface UserSettingsData {
  id: string;
  user_id: string;
  shared_projects: string[];
}
