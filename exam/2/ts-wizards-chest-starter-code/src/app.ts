import WizardsChest from './WizardsChest.js';
import { GameLoop } from './GameLoop.js';

const game = new WizardsChest(document.getElementById('game') as HTMLCanvasElement);

const gameLoop = new GameLoop(game);
window.addEventListener('load', () => {
  gameLoop.start();
});
