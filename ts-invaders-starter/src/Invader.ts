/* eslint-disable class-methods-use-this */
import Drawable from './Drawable.js';
import InvaderBullet from './InvaderBullet.js';
import ShooterBullet from './ShooterBullet.js';

export default abstract class Invader extends Drawable {
  protected invaderImages: HTMLImageElement[] = [];

  protected timeToNextMove: number;

  protected timeBetweenMoves: number;

  protected timesMoved: number;

  protected nextFire: number;

  protected score: number;

  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
    this.timeBetweenMoves = 500;
    this.timeToNextMove = 500;
    this.timesMoved = 0;
    this.nextFire = this.randomIntBetween(0, 13000);
  }

  public abstract changePic(): void;

  /**
   * Method that returns a random integer number between and
   * including the lower and upper limits
   *
   * @param lower the lower limit of the possible result
   * @param upper the upper limit of the possible result
   * @returns a random integer number between and including the lower and upper
   *   limits
   */
  public randomIntBetween(lower: number, upper: number): number {
    return Math.round(lower + (upper - lower) * Math.random());
  }

  public getScore(): number {
    return this.score;
  }

  /**
   * Checks if an invader is colliding with a bullet.
   *
   * @param bullet The current bullet
   * @returns A boolean value indication whether or not the player is colliding with a bullet.
   */
  public collidesWithBullet(bullet: ShooterBullet): boolean {
    return (
      (bullet.getPosX() + 5 > this.posX
        && bullet.getPosX() < this.posX + this.image.width)
      && (bullet.getPosY() + 14 > this.posY
        && bullet.getPosY() < this.posY + this.image.height)
    );
  }

  /**
   * Determines if an invader will or will not fire a bullet.
   *
   * @returns A boolean value indication whether or not a bullet can be fired
   * from the current invader.
   */
  public willFire(): boolean {
    if (this.nextFire <= 0) {
      this.nextFire = this.randomIntBetween(7000, 10000);
      return true;
    }
    return false;
  }

  /**
   * Commands an invader to fire a bullet.
   *
   * @returns A new bullet.
   */
  public fire(): InvaderBullet {
    return new InvaderBullet(
      this.posX + this.image.width / 2,
      this.posY + this.image.height / 2 + 20,
    );
  }

  /**
   * Updates the invaders.
   *
   * @param elapsed The elapsed time.
   */
  public update(elapsed: number): void {
    this.changePic();
    this.nextFire -= elapsed;
    this.timeToNextMove -= elapsed;
    if (this.timeToNextMove <= 0) {
      if (this.timeBetweenMoves > 200) this.timeBetweenMoves -= 1;
      this.timeToNextMove = this.timeBetweenMoves;
      this.timesMoved += 1;
      if (this.timesMoved < 12
        && !(this.timesMoved === 12
          || this.timesMoved === 24)) this.posX += 4;
      if (this.timesMoved > 12
        && !(this.timesMoved === 12
          || this.timesMoved === 24)) this.posX -= 4;
      if (this.timesMoved === 12) this.posY += 10;
      if (this.timesMoved === 24) {
        this.timesMoved = 0;
        this.posY += 10;
      }
    }
  }
}
