import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class Fish extends ScoreItem {
  private fishImages: string[] = ['./assets/fish1.png', './assets/fish2.png', './assets/fish3.png'];

  public constructor(maxY: number) {
    super();
    this.randomNumber = Math.round(0 + (this.fishImages.length - 1 - 0) * Math.random());
    this.image = CanvasUtil.loadNewImage(this.fishImages[this.randomNumber]);
    this.posX = -this.image.width;
    this.posY = Math.random() * (maxY - this.image.height);
    this.score = -((this.randomNumber + 1) * 5);
    this.speed = 0.2;
  }
}
