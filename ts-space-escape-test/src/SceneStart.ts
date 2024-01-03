/* eslint-disable jsdoc/require-jsdoc */
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Scenes from './Scenes.js';
import SceneGame from './sceneGame.js';

export default class SceneStart extends Scenes {
  private starting: boolean = false;

  private shieldCap: boolean = false; // 50 shield

  private timeLimit: boolean = false; // 15 min

  private shieldDecay: boolean = true;

  public constructor(canvas: HTMLCanvasElement) {
    super(window.innerWidth, window.innerHeight);
    this.canvas = canvas;
    this.background = CanvasUtil.loadNewImage('./assets/bg.jpg');
  }

  public processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) this.starting = true;
    if (keyListener.keyPressed(KeyListener.KEY_C)) this.shieldCap = !this.shieldCap;
    if (keyListener.keyPressed(KeyListener.KEY_T)) this.timeLimit = !this.timeLimit;
    if (keyListener.keyPressed(KeyListener.KEY_D)) this.shieldDecay = !this.shieldDecay;
  }

  public update(): Scenes {
    if (this.starting) {
      return new SceneGame(this.canvas, this.shieldCap, this.timeLimit, this.shieldDecay);
    }
    return null;
  }

  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);
    CanvasUtil.drawImage(
      canvas,
      this.background,
      canvas.width / 2 - this.background.width / 2,
      canvas.height / 2 - this.background.height / 2,
    );
    CanvasUtil.writeTextToCanvas(canvas, 'Press [SPACE] to start.', canvas.width / 2, canvas.height / 1.1, 'center', 'none', 50, 'white');
    CanvasUtil.writeTextToCanvas(canvas, '[C]ShieldCap', canvas.width / 2, canvas.height / 2.1, 'right', 'none', 50, 'white');
    if (this.shieldCap) {
      CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('./assets/apple_icon_on.png'), canvas.width / 1.95, canvas.height / 2.25);
    } else {
      CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('./assets/apple_icon_off.png'), canvas.width / 1.95, canvas.height / 2.3);
    }
    CanvasUtil.writeTextToCanvas(canvas, '[T]TimeLimit', canvas.width / 2, canvas.height / 1.87, 'right', 'none', 50, 'white');
    if (this.timeLimit) {
      CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('./assets/apple_icon_on.png'), canvas.width / 1.95, canvas.height / 2.01);
    } else {
      CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('./assets/apple_icon_off.png'), canvas.width / 1.95, canvas.height / 2.05);
    }
    CanvasUtil.writeTextToCanvas(canvas, '[D]ShieldDecay', canvas.width / 2, canvas.height / 1.7, 'right', 'none', 50, 'white');
    if (this.shieldDecay) {
      CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('./assets/apple_icon_on.png'), canvas.width / 1.95, canvas.height / 1.82);
    } else {
      CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('./assets/apple_icon_off.png'), canvas.width / 1.95, canvas.height / 1.85);
    }
  }
}
