import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class Zombie extends ScoreItem {
  private maxX: number;

  private maxY: number;

  private speedX: number;

  private speedY: number;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/zombie.png');
    this.maxX = maxX;
    this.maxY = maxY;
    if (Math.round(Math.random()) === 0) {
      this.speedX = Math.random();
    } else {
      this.speedX = -Math.random();
    }
    if (Math.round(Math.random()) === 0) {
      this.speedY = Math.random();
    } else {
      this.speedY = -Math.random();
    }
    this.posX = Math.random() * this.maxX;
    this.posY = Math.random() * this.maxY;
    this.scoreModifier = 5;
  }

  /**
   * Updates the kudzu.
   */
  public override update(): void {
    this.posX += this.speedX;
    this.posY += this.speedY;
  }
}
