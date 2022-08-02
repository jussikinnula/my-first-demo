import * as THREE from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

import loadMusic from './loadMusic';
import loadFonts from './loadFonts';
import loadTextures from './loadTextures';
import waitForMouseMove from './waitForMouseMove';

import { Scene } from './scene';
import Scene1 from './scene1';
import Scene2 from './scene2';
import Scene3 from './scene3';
import Scene4 from './scene4';
import Scene5 from './scene5';

const PX_WIDTH = 320;
const ASPECT_X = 16;
const ASPECT_Y = 9;

class EmptyScene implements Scene {
  scene = new THREE.Scene();
}

let scene: Scene = new EmptyScene();
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

const BEAT_LENGTH = 566; // one beat length in milliseconds in song.mp3

async function init(): Promise<{ fonts: Font[], textures: THREE.Texture[] }> {
  camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 250, 10000);
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(PX_WIDTH, PX_WIDTH / ASPECT_X * ASPECT_Y);

  document.body.appendChild(renderer.domElement);

  renderer.domElement.addEventListener('click', () => {
    (window as any).electronAPI?.toggleFullscreen?.();
    resize();
  });

  resize();

  const { listener, sound } = await loadMusic();
  camera.add(listener);
  const fonts = await loadFonts();
  const textures = await loadTextures();

  await waitForMouseMove();

  resize();
  render();
  sound.play();
  window.addEventListener('resize', resize);
  setInterval(tick, 10);

  return { fonts, textures };
}

function render() {
  renderer.render(scene.scene, camera);
  requestAnimationFrame(render);
}

function resize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (width / height >= ASPECT_X / ASPECT_Y) {
    width = window.innerHeight / ASPECT_Y * ASPECT_X;
    const margin = (window.innerWidth - width) / 2;
    renderer.domElement.style.marginLeft = `${margin}px`;
    renderer.domElement.style.marginRight = `${margin}px`;
  } else {
    height = window.innerWidth / ASPECT_X * ASPECT_Y;
    const margin = (window.innerHeight - height) / 2;
    renderer.domElement.style.marginTop = `${margin}px`;
    renderer.domElement.style.marginBottom = `${margin}px`;
  }
  renderer.domElement.style.width = `${width}px`;
  renderer.domElement.style.height = `${height}px`;
  camera.updateProjectionMatrix();
}

function tick() {
  scene?.tick?.();
}

function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function setCameraPositionZ(position: number) {
  camera.position.z = position;
}

(async function() {
  const { fonts, textures } = await init();

  // Song 1-4
  scene = new Scene1(fonts[0], 'My first demo by Spot');
  scene.scene.background = textures[0];
  await delay(4 * BEAT_LENGTH);
  scene.setColor?.(0x00ff00);
  await delay(4 * BEAT_LENGTH);
  scene.setColor?.(0xff00ff);
  await delay(4 * BEAT_LENGTH);
  scene.setColor?.(0xff0000);
  await delay(4 * BEAT_LENGTH);

  // Song 5-6
  scene = new Scene2();
  scene.scene.background = textures[0];
  await delay(8 * BEAT_LENGTH);

  // Song 7-8
  scene = new Scene3();
  scene.scene.background = textures[0];
  await delay(8 * BEAT_LENGTH);

  // Song 9-10
  scene = new Scene4();
  scene.scene.background = textures[0];
  await delay(8 * BEAT_LENGTH);

  // Setup reusable scenes for faster evaluation
  const octahedronScene = new Scene2();
  octahedronScene.scene.background = textures[0];
  octahedronScene.setColor?.(0x0099ff);
  const torusScene = new Scene3();
  torusScene.scene.background = textures[0];
  torusScene.setColor?.(0x99ff00);
  const octahedronAndTorusScene = new Scene4();
  octahedronAndTorusScene.scene.background = textures[0];
  octahedronAndTorusScene.setColor?.(0x6699ff);

  // Song 11-14
  for (let i = 0; i < 2; i += 1) {
    scene = octahedronScene;
    await delay(2 * BEAT_LENGTH);
    scene = torusScene;
    await delay(2 * BEAT_LENGTH);
    scene = octahedronScene;
    await delay(BEAT_LENGTH);
    scene = torusScene;
    await delay(BEAT_LENGTH);
    scene = octahedronAndTorusScene;
    await delay(2 * BEAT_LENGTH);
  }

  // Song 15-22 (32 beats)
  for (let i = 0; i < 4; i += 1) {
    setCameraPositionZ(1000 + i * 500);
    scene = octahedronScene;
    await delay(2 * BEAT_LENGTH);
    setCameraPositionZ(500 + i * 100);
    scene = torusScene;
    await delay(2 * BEAT_LENGTH);
    setCameraPositionZ(2500 + i * 500);
    scene = octahedronScene;
    await delay(BEAT_LENGTH);
    setCameraPositionZ(750 + i * 100);
    scene = torusScene;
    await delay(BEAT_LENGTH);
    setCameraPositionZ(3000 + i * 500);
    scene = octahedronAndTorusScene;
    await delay(2 * BEAT_LENGTH);
  }

  // Song 23-30 (32 beats)
  scene = new EmptyScene();
  scene.scene.background = textures[0];
  await delay(2 * BEAT_LENGTH);
  setCameraPositionZ(2000);
  scene = new Scene5(fonts[0], 'Greetings for Monolith Resistor\n   and Puoluehallitus dudes!');
  scene.scene.background = textures[0];
  await delay(6 * BEAT_LENGTH);
  scene = new EmptyScene();
  scene.scene.background = textures[0];
  await delay(2 * BEAT_LENGTH);
  scene = new Scene5(fonts[0], 'Cheers also for Accession and\n    Byterapers, and other\n       oldskool legends! :-)');
  scene.scene.background = textures[0];
  await delay(6 * BEAT_LENGTH);
  scene = new EmptyScene();
  scene.scene.background = textures[0];
  await delay(2 * BEAT_LENGTH);
  scene = new Scene5(fonts[0], 'Thanks Assembly 2022 party-goers for\n     watching this demo!');
  scene.scene.background = textures[0];
  await delay(6 * BEAT_LENGTH);
  scene = new EmptyScene();
  scene.scene.background = textures[0];
  await delay(2 * BEAT_LENGTH);
  scene = new Scene5(fonts[0], '- - Spot');
  scene.scene.background = textures[0];
  await delay(6 * BEAT_LENGTH);

  // Song 31-34
  setCameraPositionZ(1000);
  for (let i = 0; i < 2; i += 1) {
    scene = octahedronScene;
    await delay(2 * BEAT_LENGTH);
    scene = torusScene;
    await delay(2 * BEAT_LENGTH);
    scene = octahedronScene;
    await delay(BEAT_LENGTH);
    scene = torusScene;
    await delay(BEAT_LENGTH);
    scene = octahedronAndTorusScene;
    await delay(2 * BEAT_LENGTH);
  }

  scene = new EmptyScene();
  scene.scene.background = textures[1];
  await delay(8 * BEAT_LENGTH);
  scene = new EmptyScene();
})();
