import * as THREE from 'three';
import { TagData, SerializedTagData, CommentData } from '../../types'; // Ensure this path matches your actual structure

export function deserializeTagDataInComments(comments: CommentData[]): CommentData[] {
  return comments.map(comment => {
    if (!comment.tags) {
      return { ...comment, tags: [] }; // Safeguard for comments without tags
    }
    const deserializedTags = comment.tags.map(tag => deserializeTagData(tag)); // Deserialize each tag
    return { ...comment, tags: deserializedTags }; // Update the comment with deserialized tags
  });
}

export function serializeTagData(tag: TagData): SerializedTagData {
  return {
    position: JSON.stringify({ x: tag.position.x, y: tag.position.y, z: tag.position.z }),
    scale: tag.scale,
    targetNormal: JSON.stringify({ x: tag.targetNormal.x, y: tag.targetNormal.y, z: tag.targetNormal.z }),
    meshUUID: tag.meshUUID
  };
}

export function deserializeTagData(tagData: SerializedTagData): TagData {
  return {
    position: new THREE.Vector3(
      JSON.parse(tagData.position).x,
      JSON.parse(tagData.position).y,
      JSON.parse(tagData.position).z
    ),
    scale: tagData.scale,
    targetNormal: new THREE.Vector3(
      JSON.parse(tagData.targetNormal).x,
      JSON.parse(tagData.targetNormal).y,
      JSON.parse(tagData.targetNormal).z
    ),
    meshUUID: tagData.meshUUID
  };
}

