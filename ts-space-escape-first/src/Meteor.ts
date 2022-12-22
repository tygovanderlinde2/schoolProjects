/* eslint-disable jsdoc/require-jsdoc */
import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Meteor extends GameItem {
  public constructor(maxX: number, maxY: number) {
    super();
    if (this.randomNumber >= 0.9) {
      if (this.randomNumber >= 0.95) {
        this.image = CanvasUtil.loadNewImage('./assets/meteor_brown_big.png');
      } else {
        this.image = CanvasUtil.loadNewImage('./assets/meteor_grey_big.png');
      }
      this.speed = 0.15;
      this.acceleration = 1.005;
      this.shieldModifier = 5;
    }
    if (this.randomNumber < 0.9) {
      if (this.randomNumber > 0.45) {
        this.image = CanvasUtil.loadNewImage('./assets/meteor_brown_small.png');
      } else {
        this.image = CanvasUtil.loadNewImage('./assets/meteor_grey_small.png');
      }
      this.speed = 0.2;
      this.acceleration = 1.005;
      this.shieldModifier = 1;
    }
    this.posX = maxX;
    this.posY = Math.random() * maxY;
  }
}
