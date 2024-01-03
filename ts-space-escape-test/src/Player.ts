import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Player extends GameItem {
  public constructor(maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/ship.png');
    this.posX = 10;
    this.posY = maxY / 2;
    this.speed = 0;
  }

  /**
   * Makes the player go up.
   */
  public moveUp(): void {
    this.speed -= 0.1;
  }

  /**
   * Makes the player go down.
   */
  public moveDown(): void {
    this.speed += 0.1;
  }

  /**
   * Moves the player
   */
  public move(): void {
    this.posY += this.speed;
  }

  /**
   * Checks if the player is colliding with an item.
   *
   * @param item The current item.
   * @returns A boolean value indicating whether or not the player is
   * colliding with the current item.
   */
  public itemCollided(item: GameItem): boolean {
    return (
      (item.getPosX() + item.getWidth() > this.posX
        && item.getPosX() < this.posX + this.image.width)
      && (item.getPosY() + item.getHeight() > this.posY
        && item.getPosY() < this.posY + this.image.height)
    );
  }
}
