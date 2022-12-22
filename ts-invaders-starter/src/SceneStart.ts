import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Level1 from './Level1.js';
import Scene from './Scene.js';

export default class SceneStart extends Scene {
  private logo: HTMLImageElement;

  private starting: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.logo = CanvasUtil.loadNewImage('./assets/logo.png');
    this.starting = false;
  }

  /**
   * Processes the input.
   *
   * @param keyListener The keylistener.
   */
  public processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_S)) {
      this.starting = true;
    }
  }

  /**
   * Updates the level.
   *
   * @returns The correct scene.
   */
  public update(): Scene {
    if (this.starting) return new Level1(this.maxX, this.maxY);
    return null;
  }

  /**
   * Renders the level scene.
   *
   * @param canvas The canvas being drawn to.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.fillCanvas(canvas, '#000');
    CanvasUtil.drawImage(
      canvas,
      this.logo,
      (canvas.width / 2) - (this.logo.width / 2),
      (canvas.height / 2) - (this.logo.height / 2),
    );
    CanvasUtil.writeTextToCanvas(canvas, '[S] TO START', canvas.width / 2, canvas.height / 2 + 300, 'center', 'ScoreFont', 50, 'white');
  }
}
