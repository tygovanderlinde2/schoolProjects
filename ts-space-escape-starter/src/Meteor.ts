import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Meteor extends GameItem {
  private meteorImages: string[] = ['./assets/meteor_brown_big.png', './assets/meteor_brown_small.png', './assets/meteor_grey_big.png', './assets/meteor_grey_small.png'];

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage(
      this.meteorImages[
        Math.round(Math.random() * (this.meteorImages.length - 1))
      ],
    );
    this.posX = maxX;
    this.posY = Math.random() * maxY;
    this.acceleration = 1.001;
    if (this.image.height < 50) {
      this.speed = 0.2;
      this.shieldModifier = -1;
    } else {
      this.speed = 0.1;
      this.shieldModifier = -4;
    }
  }
}
