/* eslint-disable jsdoc/require-jsdoc */
import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';
import ScoreItem from './ScoreItem.js';

export default class Player extends Drawable {
  private speed: number;

  public constructor() {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/hoe_wood.png');
  }

  public collidesWithItem(item: ScoreItem): boolean {
    return (
      (item.getPosX() + item.getWidth() > this.posX
        && item.getPosX() < this.posX + this.image.width)
      && (item.getPosY() + item.getHeight() > this.posY
        && item.getPosY() < this.posY + this.image.height)
    );
  }

  public move(mousePosX: number, mousePosY: number): void {
    this.posX = mousePosX;
    this.posY = mousePosY;
  }
}
