import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';
import ScoreItem from './ScoreItem.js';

export default class Player extends Drawable {
  private maxY: number;

  private speed: number;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/player.png');
    this.posX = maxX - this.image.width - 30;
    this.posY = maxY / 2;
    this.speed = 5;
  }

  /**
   * Moves the player up and down. 1 = down, 2 = up.
   *
   * @param direction the direction that is passed through.
   */
  public move(direction: number): void {
    if (direction === 1) this.posY += this.speed;
    if (direction === 2) this.posY -= this.speed;
  }

  /**
   * Checks if the player collides with an item.
   *
   * @param item the current item.
   * @returns a boolean value indicating if the player is colliding with the current item or not.
   */
  public collidesWithItem(item: ScoreItem): boolean {
    return (
      (item.getPosX() + item.getWidth() > this.posX
        && item.getPosX() < this.posX + this.image.width)
      && (item.getPosY() + item.getHeight() > this.posY
        && item.getPosY() < this.posY + this.image.height)
    );
  }
}
