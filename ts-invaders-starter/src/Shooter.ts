import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';
import InvaderBullet from './InvaderBullet.js';
import ShooterBullet from './ShooterBullet.js';

export default class Shooter extends Drawable {
  private maxX: number;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/Shooter.png');
    this.posX = maxX / 2 - this.image.width / 2;
    this.posY = maxY - 80;
    this.maxX = maxX;
  }

  public getImg(): HTMLImageElement {
    return this.image;
  }

  /**
   * Moves the player left(1) or right(0).
   *
   * @param direction The direction the player moves to displayed as a number.
   */
  public move(direction: number): void {
    if (direction === 0 && this.posX + this.image.width <= this.maxX) this.posX += 3;
    if (direction === 1 && this.posX >= 0) this.posX -= 3;
  }

  /**
   * Checks if the player is colliding with a bullet.
   *
   * @param bullet The current bullet
   * @returns A boolean value indication whether or not the player is colliding with a bullet.
   */
  public collidesWithBullet(bullet: InvaderBullet): boolean {
    return (
      (bullet.getPosX() + 5 > this.posX
        && bullet.getPosX() < this.posX + this.image.width)
      && (bullet.getPosY() + 9 > this.posY
        && bullet.getPosY() < this.posY + this.image.height)
    );
  }

  /**
   * Commands the player to fire a bullet.
   *
   * @returns A new bullet.
   */
  public fire(): ShooterBullet {
    return new ShooterBullet(
      this.posX + this.image.width / 2 - 2,
      this.posY + this.image.height / 2 - 10,
    );
  }
}
