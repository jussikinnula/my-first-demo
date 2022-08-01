import * as THREE from 'three';
import { Scene } from './scene';

export default class Scene4 implements Scene {
  scene: THREE.Scene;
  mesh1: THREE.Mesh;
  mesh2: THREE.Mesh;
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

    const geometry1 = new THREE.OctahedronGeometry(25, 0);
    const material1 = new THREE.MeshPhongMaterial({
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
    this.mesh1 = new THREE.Mesh(geometry1, material1);
    this.mesh1.position.x = -50;
    this.scene.add(this.mesh1);

    const geometry2 = new THREE.TorusGeometry(25, 7.5, 8, 50);
    const material2 = new THREE.MeshPhongMaterial({
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
    this.mesh2 = new THREE.Mesh(geometry2, material2);
    this.mesh2.position.x = 50;
    this.scene.add(this.mesh2);
  }

  tick() {
    this.mesh1.rotation.x += 0.01;
    this.mesh1.rotation.y += 0.02;
    this.mesh2.rotation.x -= 0.01;
    this.mesh2.rotation.y -= 0.02;
  }

  setColor(color: THREE.ColorRepresentation) {
    this.colorLight.color = new THREE.Color(color);
  }
}
