import * as THREE from 'three';
import { Scene } from './scene';

export default class Scene3 implements Scene {
  scene: THREE.Scene;
  mesh: THREE.Mesh;
  private colorLight: THREE.PointLight;

  constructor() {
    this.scene = new THREE.Scene();
    const light1 = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 0.5);
    light2.position.set(100, 40, 0);
    this.scene.add(light2);

    this.colorLight = new THREE.PointLight(0xff0000, 0.5);
    this.colorLight.position.set(60, 40, 250);
    this.scene.add(this.colorLight);

    const geometry = new THREE.TorusGeometry(50, 15, 16, 100);
    const material = new THREE.MeshPhongMaterial({
      color: 0xF3FFE2,
      specular: 0xffffff,
      shininess: 250,
      lightMap: null,
      lightMapIntensity: 1,
      bumpMap: null,
      bumpScale: 0.1,
      normalMap: null,
      displacementMap: null,
      displacementScale: 0.1,
      displacementBias: 0,
      specularMap: null
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  animate() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
  }

  setColor(color: THREE.ColorRepresentation) {
    this.colorLight.color = new THREE.Color(color);
  }
}
