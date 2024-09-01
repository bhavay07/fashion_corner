import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#080712',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './4.png',
  fullDecal: './4.png',
});

export default state;