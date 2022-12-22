import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class GoldenCaptule extends ScoreItem {
  private speedY: number;

  public constructor(maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/capsule.png');
    this.posX = -this.image.width;
    this.posY = Math.random() * (maxY - this.image.height);
    this.score = 0;
    this.speed = 0.3;
    this.speedY = 0.03;
  }

  /**
   * Updates the Golden Captule.
   *
   * @param elapsed the time between frames.
   */
  public override update(elapsed: number): void {
    this.posX += this.speed * elapsed;
    this.posY -= this.speedY * elapsed;
  }
}
