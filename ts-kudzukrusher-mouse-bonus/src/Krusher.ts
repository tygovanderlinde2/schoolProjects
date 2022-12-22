import { Game } from './GameLoop.js';
import CanvasUtil from './CanvasUtil.js';
import Scene from './Scene.js';
import SceneStart from './SceneStart.js';
import MouseListener from './MouseListener.js';

export default class Krusher extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: MouseListener;

  private currentScene: Scene;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.style.cursor = 'none';
    this.keyListener = new MouseListener(canvas, false);

    // Set the starting scene
    this.currentScene = new SceneStart(this.canvas.width, this.canvas.height);
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    this.currentScene.processInput(this.keyListener);
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    const nextScene: Scene = this.currentScene.update(elapsed);
    if (nextScene !== null) this.currentScene = nextScene;
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasUtil.clearCanvas(this.canvas);
    this.currentScene.render(this.canvas);
  }
}
