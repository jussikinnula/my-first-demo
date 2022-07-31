import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import songFileURL from 'url:./song.mp3';
import hyperspaceFontURL from 'url:./hyperspace.json.raw';

import { Scene } from './scene';
import Scene1 from './scene1';
import Scene2 from './scene2';
import Scene3 from './scene3';
import Scene4 from './scene4';

class EmptyScene implements Scene {
  scene = new THREE.Scene();
}

let scene: Scene = new EmptyScene();
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let started = false;
let aspect = 1;

const SONG_BLOCK = 4528; // Length of one song block in song.mp3

function init(): Promise<{ font: Font }> {
  return new Promise((resolve) => {
    camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 250, 10000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);

    document.body.appendChild(renderer.domElement);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.addEventListener('click', () => {
      (window as any).electronAPI?.toggleFullscreen?.();
    });

    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(songFileURL, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.5);

      const fontLoader = new FontLoader();
      fontLoader.load(hyperspaceFontURL, (font) => {
        document.body.addEventListener('mousemove', () => {
          if (!started) {
            started = true;
            animate();
            sound.play();
            resolve({ font });
          }
        });
      });
    });
  });
}

function animate() {
  const currentAspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
  if (aspect !== currentAspect) {
    aspect = currentAspect;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene.scene, camera);
  scene.animate?.();
  requestAnimationFrame(animate);
}

function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

(async function() {
  const { font } = await init(); 
  scene = new Scene1(font, 'My first demo by Spot');
  await delay(0.5 * SONG_BLOCK);
  scene.setColor?.(0x00ff00);
  await delay(0.5 * SONG_BLOCK);
  scene.setColor?.(0xff00ff);
  await delay(0.5 * SONG_BLOCK);
  scene.setColor?.(0xff0000);
  await delay(0.5 * SONG_BLOCK);

  scene = new Scene2();
  await delay(SONG_BLOCK);

  scene = new Scene3();
  await delay(SONG_BLOCK);

  scene = new Scene4();
  await delay(SONG_BLOCK);

  scene = new Scene2();
  scene.setColor?.(0x0099ff);
  await delay(SONG_BLOCK);

  scene = new Scene3();
  scene.setColor?.(0x99ff00);
  await delay(SONG_BLOCK);

  scene = new Scene4();
  scene.setColor?.(0x6699ff);
  await delay(SONG_BLOCK);

  scene = new EmptyScene();
})();
