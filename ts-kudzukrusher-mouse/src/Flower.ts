/* eslint-disable class-methods-use-this */
import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class Flower extends ScoreItem {
  private timeToNextChange: number;

  private flowerImages: string[] = ['./assets/flower_0.png', './assets/flower_1.png', './assets/flower_2.png', './assets/flower_3.png'];

  private counter: number = 0;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage(this.flowerImages[0]);
    this.posX = Math.random() * maxX;
    this.posY = Math.random() * maxY;
    this.timeToNextChange = this.randomIntBetween(10000, 15000);
    this.scoreModifier = -1;
  }

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

  /**
   * Updates the flower.
   *
   * @param elapsed The elapsed time.
   */
  public override update(elapsed: number): void {
    this.timeToNextChange -= elapsed;
    if (this.timeToNextChange <= 0) {
      if (this.counter < 3) {
        this.counter += 1;
      }
      this.scoreModifier = (this.counter * -2) - 1;
      this.timeToNextChange = this.randomIntBetween(10000, 15000);
      this.image = CanvasUtil.loadNewImage(this.flowerImages[this.counter]);
    }
  }
}
