import CanvasUtil from './CanvasUtil.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import SceneStart from './SceneStart.js';

export default class SceneWin extends Scene {
  private continue: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.continue = false;
  }

  /**
   * Processes the input.
   *
   * @param keyListener The keylistener.
   */
  public processInput(keyListener: MouseListener): void {
    if (keyListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
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
   * Renders the win scene.
   *
   * @param canvas The canvas being drawn to.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);
    CanvasUtil.fillCanvas(canvas, '#E7CEA2');
    CanvasUtil.writeTextToCanvas(canvas, 'You cleared all levels!', this.maxX / 2, this.maxY / 2, 'center', 'none', 50, 'green');
    CanvasUtil.writeTextToCanvas(canvas, 'Press [LEFT_CLICK] to continue', this.maxX / 2, this.maxY / 2 + 50, 'center', 'none', 30, 'green');
  }
}
