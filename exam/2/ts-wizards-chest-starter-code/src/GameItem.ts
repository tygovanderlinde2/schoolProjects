import Drawable from './Drawable.js';

export default abstract class GameItem extends Drawable {
  protected speed: number;

  protected score: number;

  protected possiblePosX: number[] = [160, 285, 410];

  public getScore(): number {
    return this.score;
  }

  /**
   * Updates all gameItems.
   *
   * @param elapsed the time between frames.
   */
  public update(elapsed: number): void {
    this.posY -= this.speed * elapsed;
  }
}
