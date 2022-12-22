import CanvasUtil from './CanvasUtil.js';
import Flower from './Flower.js';
import KeyListener from './KeyListener.js';
import Kudzu from './Kudzu.js';
import Player from './Player.js';
import Scene from './Scene.js';
import SceneLose from './SceneLose.js';
import SceneWin from './SceneWin.js';
import ScoreItem from './ScoreItem.js';

export default class Level extends Scene {
  private player: Player;

  private scoreItems: ScoreItem[] = [];

  private timeToNextItem: number;

  private currentScore: number = 0;

  private flowersLost: number = 0;

  private spaceIsPressed: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.timeToNextItem = 500;
    this.player = new Player(maxX, maxY);
    for (let i = 0; i < 50; i++) {
      this.scoreItems.push(new Flower(maxX, maxY));
    }
  }

  /**
   * Processes the input.
   *
   * @param keyListener The keylistener.
   */
  public processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.spaceIsPressed = true;
    } else {
      this.spaceIsPressed = false;
    }
    if (this.player.getPosY() > 0) {
      if (keyListener.isKeyDown(KeyListener.KEY_UP)) this.player.move(0);
    }
    if (this.player.getPosX() + this.player.getWidth() < this.maxX) {
      if (keyListener.isKeyDown(KeyListener.KEY_RIGHT)) this.player.move(1);
    }
    if (this.player.getPosY() + this.player.getHeight() < this.maxY) {
      if (keyListener.isKeyDown(KeyListener.KEY_DOWN)) this.player.move(2);
    }
    if (this.player.getPosX() > 0) {
      if (keyListener.isKeyDown(KeyListener.KEY_LEFT)) this.player.move(3);
    }
  }

  /**
   * Updates the level.
   *
   * @param elapsed The elapsed time.
   * @returns The correct scene.
   */
  public update(elapsed: number): Scene {
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem <= 0) {
      this.timeToNextItem = 500;
      if (Math.random() >= 0.6) {
        this.scoreItems.push(new Kudzu(this.maxX, this.maxY));
      } else {
        this.scoreItems.push(new Flower(this.maxX, this.maxY));
      }
    }
    this.scoreItems.forEach((item: ScoreItem) => item.update(elapsed));
    if (this.spaceIsPressed) {
      this.scoreItems = this.scoreItems.filter((item: ScoreItem) => {
        if (this.player.collidesWithItem(item)) {
          if (item instanceof Flower) {
            this.flowersLost += 1;
          }
          this.currentScore += item.getScoreModifier();
          return false;
        }
        return true;
      });
    }
    this.scoreItems = this.scoreItems.filter((item: ScoreItem) => {
      if (item.getPosY() + item.getHeight() < 0
      || item.getPosX() > this.maxX
      || item.getPosY() > this.maxY
      || item.getPosX() + item.getWidth() < 0) return false;
      return true;
    });
    if (this.currentScore >= 100) return new SceneWin(this.maxX, this.maxY);
    if (this.currentScore < 0 || this.flowersLost >= 10) return new SceneLose(this.maxX, this.maxY);
    return null;
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
  }
}
