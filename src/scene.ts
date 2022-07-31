import * as THREE from 'three';

export interface Scene {
    scene: THREE.Scene;
    mesh?: THREE.Mesh;
    animate?: () => void;
    setColor?: (color: THREE.ColorRepresentation) => void;
}