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

const PX_WIDTH = 320;
const ASPECT_X = 16;
const ASPECT_Y = 9;

class EmptyScene implements Scene {
  scene = new THREE.Scene();
}

let scene: Scene = new EmptyScene();
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

const SONG_BLOCK = 4528; // Length of one song block in song.mp3

async function init(): Promise<{ fonts: Font[], textures: THREE.Texture[] }> {
  camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 250, 10000);
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(PX_WIDTH, PX_WIDTH / ASPECT_X * ASPECT_Y);

  document.body.appendChild(renderer.domElement);

  renderer.domElement.addEventListener('click', () => {
    (window as any).electronAPI?.toggleFullscreen?.();
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

(async function() {
  const { fonts, textures } = await init(); 
  scene = new Scene1(fonts[0], 'My first demo by Spot');
  scene.scene.background = textures[0];
  await delay(0.5 * SONG_BLOCK);
  scene.setColor?.(0x00ff00);
  await delay(0.5 * SONG_BLOCK);
  scene.setColor?.(0xff00ff);
  await delay(0.5 * SONG_BLOCK);
  scene.setColor?.(0xff0000);
  await delay(0.5 * SONG_BLOCK);

  scene = new Scene2();
  scene.scene.background = textures[0];
  await delay(SONG_BLOCK);

  scene = new Scene3();
  scene.scene.background = textures[0];
  await delay(SONG_BLOCK);

  scene = new Scene4();
  scene.scene.background = textures[0];
  await delay(SONG_BLOCK);

  scene = new Scene2();
  scene.scene.background = textures[0];
  scene.setColor?.(0x0099ff);
  await delay(SONG_BLOCK);

  scene = new Scene3();
  scene.scene.background = textures[0];
  scene.setColor?.(0x99ff00);
  await delay(SONG_BLOCK);

  scene = new Scene4();
  scene.scene.background = textures[0];
  scene.setColor?.(0x6699ff);
  await delay(SONG_BLOCK);

  scene = new EmptyScene();
  scene.scene.background = textures[0];
})();
