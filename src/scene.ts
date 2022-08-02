import * as THREE from 'three';

export interface Scene {
  scene: THREE.Scene;
  mesh?: THREE.Mesh;
  tick?: () => void;
  setColor?: (color: THREE.ColorRepresentation) => void;
}