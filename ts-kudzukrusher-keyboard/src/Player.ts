/* eslint-disable jsdoc/require-jsdoc */
import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';
import ScoreItem from './ScoreItem.js';

export default class Player extends Drawable {
  private speed: number;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/hoe_wood.png');
    this.posX = maxX / 2;
    this.posY = maxY / 2;
    this.speed = 5;
  }

  public collidesWithItem(item: ScoreItem): boolean {
    return (
      (item.getPosX() + item.getWidth() > this.posX
        && item.getPosX() < this.posX + this.image.width)
      && (item.getPosY() + item.getHeight() > this.posY
        && item.getPosY() < this.posY + this.image.height)
    );
  }

  public move(direction: number): void {
    if (direction === 0) this.posY -= this.speed;
    if (direction === 1) this.posX += this.speed;
    if (direction === 2) this.posY += this.speed;
    if (direction === 3) this.posX -= this.speed;
  }
}
