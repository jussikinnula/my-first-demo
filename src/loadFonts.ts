import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import hyperspaceFontURL from 'url:./hyperspace.json.raw';

const fontLoader = new FontLoader();

const loadFont = (fontURL: string): Promise<Font> => {
  return new Promise((resolve) => {
    fontLoader.load(fontURL, (font) => {
      resolve(font);
    });
  });
};
const loadFonts = (): Promise<Font[]> => Promise.all([
  loadFont(hyperspaceFontURL)
]);

export default loadFonts;
