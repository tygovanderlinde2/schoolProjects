import Drawable from './Drawable.js';

export default abstract class ScoreItem extends Drawable {
  protected score: number;

  protected speed: number;

  protected randomNumber: number;

  /**
   * Updates the ScoreItems.
   *
   * @param elapsed the time between frames.
   */
  public update(elapsed: number): void {
    this.posX += this.speed * elapsed;
  }

  public getScore(): number {
    return this.score;
  }
}
