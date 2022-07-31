import * as THREE from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Scene } from './scene';

export default class Scene1 implements Scene {
  scene: THREE.Scene;
  mesh: THREE.Mesh;
  private strobeLight: THREE.PointLight;
  private colorLight: THREE.PointLight;
  private directionUp = true;

  constructor(font: Font, text: string) {
    this.scene = new THREE.Scene();
    this.strobeLight = new THREE.PointLight(0xffffff, 0);
    this.strobeLight.position.set(80, 40, 100);
    this.scene.add(this.strobeLight);

    const light1 = new THREE.PointLight(0x0000ff, 0.5);
    light1.position.set(100, 40, 0);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0x0000ff, 0.5);
    light2.position.set(80, 80, 0);
    this.scene.add(light2);

    this.colorLight = new THREE.PointLight(0xff0000, 0.5);
    this.colorLight.position.set(60, 40, 250);
    this.scene.add(this.colorLight);

    const geometry = new TextGeometry(text, {
      font: font,
      size: 20,
      height: 5,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 5
    });

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
    this.mesh.position.x = 100;
    this.scene.add(this.mesh);
  }

  animate() {
    if (this.mesh.rotation.x >= 1 || this.mesh.rotation.x <= -1) {
      this.directionUp = !this.directionUp;
    }
    
    if (this.directionUp) {
      this.mesh.rotation.x += 0.02;
    } else {
      this.mesh.rotation.x -= 0.02;
    }

    this.mesh.position.x -= 0.5;

    this.strobeLight.intensity = Math.round(Math.random() / 1.7);
  }

  setColor(color: THREE.ColorRepresentation) {
    this.colorLight.color = new THREE.Color(color);
  }
}
