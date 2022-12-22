import CanvasUtil from './CanvasUtil.js';
import MouseListener from './MouseListener.js';
import Player from './Player.js';
import Scene from './Scene.js';
import ScoreItem from './ScoreItem.js';

export default abstract class Levels extends Scene {
  protected player: Player;

  protected scoreItems: ScoreItem[] = [];

  protected timeToNextItem: number;

  protected currentScore: number;

  protected flowersLost: number;

  protected spaceIsPressed: boolean;

  protected currentLevel: number;

  public constructor(
    maxX: number,
    maxY: number,
    timeToNextItem: number,
    player: Player,
  ) {
    super(maxX, maxY);
    this.scoreItems = this.scoreItems.filter(() => {
      if (this.scoreItems.length > 0) {
        return false;
      }
      return true;
    });
    this.currentScore = 0;
    this.flowersLost = 0;
    this.timeToNextItem = timeToNextItem;
    this.player = player;
  }

  /**
   * Processes the input.
   *
   * @param keyListener The keylistener.
   */
  public processInput(keyListener: MouseListener): void {
    if (keyListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.spaceIsPressed = true;
    } else {
      this.spaceIsPressed = false;
    }
    this.player.move(keyListener.getMousePosition().x, keyListener.getMousePosition().y);
  }

  /**
   * Renders the level scene.
   *
   * @param canvas The canvas being drawn to.
   */
  public render(canvas: HTMLCanvasElement): void {
    this.player.render(canvas);
    this.scoreItems.forEach((item: ScoreItem) => {
      item.render(canvas);
    });
    CanvasUtil.writeTextToCanvas(canvas, `Score: ${this.currentScore}`, 20, 30, 'left', 'none', 30, 'black');
    CanvasUtil.writeTextToCanvas(canvas, `Flowers lost: ${this.flowersLost}`, 20, 60, 'left', 'none', 30, 'black');
    CanvasUtil.writeTextToCanvas(canvas, `Current level: ${this.currentLevel}`, this.maxX / 2, 30, 'center', 'none', 30, 'black');
  }
}
