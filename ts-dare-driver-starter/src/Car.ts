import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class Car extends ScoreItem {
  public constructor(startX: number) {
    super();
    if (this.randomNumber < 60) {
      this.image = CanvasUtil.loadNewImage('./assets/Car_10.png');
      this.score = -10;
    } else if (this.randomNumber >= 60 && this.randomNumber < 80) {
      this.image = CanvasUtil.loadNewImage('./assets/Car_25.png');
      this.score = -25;
    } else if (this.randomNumber >= 80 && this.randomNumber < 95) {
      this.image = CanvasUtil.loadNewImage('./assets/Car_50.png');
      this.score = -50;
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/Car_100.png');
      this.score = -100;
    }
    this.posX = startX;
    this.posY = 0 - this.image.height;
    this.speed = 0.3;
  }
}
