/* eslint-disable jsdoc/require-jsdoc */
import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Shield extends GameItem {
  public constructor(maxX: number, maxY: number) {
    super();
    if (this.randomNumber > 0.5) {
      this.image = CanvasUtil.loadNewImage('./assets/bolt_gold.png');
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/things_gold.png');
    }
    this.posX = maxX;
    this.posY = Math.random() * maxY;
    this.speed = 0.2;
    this.acceleration = 1;
    this.shieldModifier = 3;
  }
}
