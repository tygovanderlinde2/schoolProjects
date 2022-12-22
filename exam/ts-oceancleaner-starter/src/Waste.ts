import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class Waste extends ScoreItem {
  private willSludge: boolean;

  private wasteImages: string[] = ['./assets/waste1.png', './assets/waste2.png', './assets/waste3.png'];

  public constructor(maxY: number) {
    super();
    this.randomNumber = Math.round(0 + (this.wasteImages.length - 1 - 0) * Math.random());
    this.image = CanvasUtil.loadNewImage(this.wasteImages[this.randomNumber]);
    this.posX = -this.image.width;
    this.posY = Math.random() * (maxY - this.image.height);
    this.score = (this.randomNumber + 1) * 10;
    this.speed = 0.3;
    this.willSludge = true;
  }

  /**
   * Updates the waste.
   *
   * @param elapsed the time between frames.
   */
  public override update(elapsed: number): void {
    this.posX += this.speed * elapsed;
    if (this.posX >= 400 && this.posX <= 450) {
      if (this.willSludge && Math.random() <= 0.1) {
        this.image = CanvasUtil.loadNewImage('./assets/toxic.png');
        this.speed = 0.35;
        this.score = 100;
      } else {
        this.willSludge = false;
      }
    }
  }
}
