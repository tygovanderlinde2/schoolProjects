import { Game } from './GameLoop.js';
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Scenes from './Scenes.js';
import SceneStart from './SceneStart.js';

export default class Yume extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private currentScene: Scenes;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.currentScene = new SceneStart(canvas);
  }

  /**
   * Processes all input. Called from the gameLoop.
   */
  public processInput(): void {
    this.currentScene.processInput(this.keyListener);
  }

  /**
   * Update game state. Called from the gameLoop.
   *
   * @param elapsed Time between frames.
   * @returns True if the game should continue, false if it should end.
   */
  public update(elapsed: number): boolean {
    const nextScene: Scenes = this.currentScene.update(elapsed);
    if (nextScene !== null) this.currentScene = nextScene;
    return true;
  }

  /**
   * Renders all the elements in the game. Called from the gameLoop.
   */
  public render(): void {
    CanvasUtil.clearCanvas(this.canvas);
    this.currentScene.render(this.canvas);
  }
}
