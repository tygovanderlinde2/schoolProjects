import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';
import ScoreItem from './ScoreItem.js';

export default class Player extends Drawable {
  public constructor(startX: number, startY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/player.png');
    this.posX = startX;
    this.posY = startY;
  }

  /**
   * Moves the player.
   *
   * @param newX The next x-position.
   */
  public move(newX: number): void {
    this.posX = newX;
  }

  /**
   * Checks if the player is colliding with the current item.
   *
   * @param item The current item.
   * @returns A boolean value indicting whether or not the player is colliding with an item.
   */
  public collideWithItem(item: ScoreItem): boolean {
    return (
      (item.getPosX() + item.getWidth() > this.posX
        && item.getPosX() < this.posX + this.image.width)
      && (item.getPosY() + item.getHeight() > this.posY
        && item.getPosY() < this.posY + this.image.height)
    );
  }
}
