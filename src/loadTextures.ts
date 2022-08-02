import * as THREE from 'three';

import backgroundURL from 'url:./backgrounds/001.png';
import endpictureURL from 'url:./backgrounds/002.png';

const textureLoader = new THREE.TextureLoader();

const loadTexture = (textureURL: string): Promise<THREE.Texture> => {
  return new Promise((resolve) => {
    textureLoader.load(textureURL, (texture) => {
      resolve(texture);
    });
  });
};

const loadTextures = (): Promise<THREE.Texture[]> => Promise.all([
  loadTexture(backgroundURL),
  loadTexture(endpictureURL)
]);

export default loadTextures;
