import { GameLoop } from './GameLoop.js';
import SpaceInvaders from './SpaceInvaders.js';

const game = new SpaceInvaders(document.getElementById('game') as HTMLCanvasElement);

const gameLoop = new GameLoop(game);
window.addEventListener('load', () => gameLoop.start());
