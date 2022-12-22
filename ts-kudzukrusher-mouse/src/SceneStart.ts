import CanvasUtil from './CanvasUtil.js';
import Level from './Level.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';

export default class SceneStart extends Scene {
  private starting: boolean;

  private logo: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.starting = false;
    this.logo = CanvasUtil.loadNewImage('./assets/logo.png');
  }

  /**
   * Processes the input.
   *
   * @param keyListener The keylistener.
   */
  public processInput(keyListener: MouseListener): void {
    if (keyListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.starting = true;
    }
  }

  /**
   * Updates the level.
   *
   * @returns The correct scene.
   */
  public update(): Scene {
    if (this.starting) return new Level(this.maxX, this.maxY);
    return null;
  }

  /**
   * Renders the starting screen.
   *
   * @param canvas The canvas being drawn to.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);
    CanvasUtil.fillCanvas(canvas, '#E7CEA2');
    CanvasUtil.drawImage(
      canvas,
      this.logo,
      canvas.width / 2 - this.logo.width / 2,
      canvas.height / 2 - this.logo.height / 2,
    );
    CanvasUtil.writeTextToCanvas(
      canvas,
      'Click to start!',
      canvas.width / 2,
      canvas.height / 2 + this.logo.height / 2 + 50,
      'center',
      'none',
      70,
      'black',
    );
  }
}
