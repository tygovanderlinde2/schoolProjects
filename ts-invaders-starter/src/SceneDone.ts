import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
import SceneStart from './SceneStart.js';

export default class SceneDone extends Scene {
  private continue: boolean;

  private message: string;

  private score: number;

  public constructor(maxX: number, maxY: number, message: string, finalScore: number) {
    super(maxX, maxY);
    this.continue = false;
    this.message = message;
    this.score = finalScore;
  }

  /**
   * Processes the input.
   *
   * @param keyListener The keylistener.
   */
  public processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_R)) {
      this.continue = true;
    }
  }

  /**
   * Updates the level.
   *
   * @returns The correct scene.
   */
  public update(): Scene {
    if (this.continue) return new SceneStart(this.maxX, this.maxY);
    return null;
  }

  /**
   * Renders the level scene.
   *
   * @param canvas The canvas being drawn to.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);
    CanvasUtil.fillCanvas(canvas, '#000');
    CanvasUtil.writeTextToCanvas(canvas, `${this.message.toUpperCase()}`, canvas.width / 2, canvas.height / 2, 'center', 'ScoreFont', 50, 'red');
    CanvasUtil.writeTextToCanvas(canvas, '[R] to continue'.toUpperCase(), canvas.width / 2, canvas.height / 2 + 65, 'center', 'ScoreFont', 30, 'white');
    CanvasUtil.writeTextToCanvas(canvas, `Your score was: ${this.score}`.toUpperCase(), canvas.width / 2, canvas.height / 2 + 130, 'center', 'ScoreFont', 30, 'white');
  }
}
