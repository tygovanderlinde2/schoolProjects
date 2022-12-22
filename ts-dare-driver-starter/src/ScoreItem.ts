import Drawable from './Drawable.js';

export default abstract class ScoreItem extends Drawable {
  protected score: number;

  protected speed: number;

  protected randomNumber: number = Math.round(Math.random() * 100);

  /**
   * Updates the scoreitems.
   *
   * @param elapsed the time between frames.
   */
  public update(elapsed: number): void {
    this.posY += elapsed * this.speed;
  }

  public getScore(): number {
    return this.score;
  }
}
