import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';
import GameItem from './GameItem.js';

export default class Player extends Drawable {
  private maxY: number;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/chestClosed.png');
    this.maxY = maxY;
    this.posY = 100;
    this.posX = 285;
  }

  /**
   * Moves the player to the given posX.
   * 
   * @param newX the new posX that the player should move to.
   */
  public move(newX: number): void {
    this.posX = newX;
  }

  public setImg(newImg: string): void {
    this.image = CanvasUtil.loadNewImage(newImg);
  }

  /**
   * Checks if the player is colliding with an item.
   *
   * @param item the current item that is being checked for collision.
   * @returns a boolean value indicating whether or not the player is colliding with
   * the current item.
   */
  public collidesWithItem(item: GameItem): boolean {
    return (
      (item.getPosX() + item.getWidth() > this.posX
        && item.getPosX() < this.posX + this.image.width)
      && (item.getPosY() + item.getHeight() > this.posY
        && item.getPosY() < this.posY + this.image.height)
    );
  }
}
