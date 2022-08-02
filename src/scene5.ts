import * as THREE from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Scene } from './scene';

export default class Scene5 implements Scene {
  scene: THREE.Scene;
  mesh: THREE.Mesh;
  private colorLight: THREE.PointLight;

  constructor(font: Font, text: string) {
    this.scene = new THREE.Scene();
    const light1 = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0xff9900, 0.5);
    light2.position.set(100, 40, 0);
    this.scene.add(light2);

    const light3 = new THREE.PointLight(0x00ff99, 0.5);
    light3.position.set(80, 80, 0);
    this.scene.add(light3);

    this.colorLight = new THREE.PointLight(0xffffff, 0.5);
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

    geometry.center();

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
    this.mesh.scale.x = 0.5;
    this.mesh.scale.y = 0.5;
    this.scene.add(this.mesh);
  }

  tick() {
    this.mesh.scale.x += 0.005;
    this.mesh.scale.y += 0.005;
  }

  setColor(color: THREE.ColorRepresentation) {
    this.colorLight.color = new THREE.Color(color);
  }
}
