import CanvasUtil from './CanvasUtil.js';
import Fruit from './fruit.js';
import Spider from './Spider.js';

export default class Player {
  private image: HTMLImageElement;

  private speed: number;

  private posX: number;

  private posY: number;

  private startPosY: number;

  public constructor(maxX: number, maxY: number) {
    this.posX = maxX / 2;
    this.posY = maxY - 70;
    this.startPosY = maxY - 70;
    this.image = CanvasUtil.loadNewImage('./assets/basket.png');
    this.speed = 8;
  }

  /**
   *Moves the character to the left.
   */
  public moveLeft(): void {
    this.posX -= this.speed;
  }

  /**
   *Moves the character to the right.
   */
  public moveRight(): void {
    this.posX += this.speed;
  }

  /**
   *Makes the player jump.
   */
  public jump(): void {
    if (this.posY >= this.startPosY - 100) {
      this.posY -= this.speed;
      this.goUp();
    } else if (this.posY !== this.startPosY) {
      this.goDown();
    }
  }

  /**
   *Handles the player going up.
   */
  public goUp(): void {
    setTimeout(() => this.jump());
  }

  /**
   *Handles the player going down.
   */
  public goDown(): void {
    if (this.posY !== this.startPosY) {
      this.posY += this.speed;
      setTimeout(() => this.goDown());
    }
  }

  /**
   *Checks if the player is colliding with a fruit.
   *
   * @param fruit the selected fruit.
   * @returns a boolean value that tells the code if a collision is true.
   */
  public isCollidingFruit(fruit: Fruit): boolean {
    return (
      (fruit.getPosX() + fruit.getWidth() > this.posX
        && fruit.getPosX() < this.posX + this.image.width)
      && (fruit.getPosY() + fruit.getHeight() > this.posY
        && fruit.getPosY() < this.posY + this.image.height)
    );
  }

  /**
   *Checks if the player is colliding with a spider.
   *
   * @param spider the selected spider.
   * @returns a boolean value that tells the code if a collision is true.
   */
  public isCollidingSpider(spider: Spider): boolean {
    return (
      (spider.getPosX() + spider.getWidth() > this.posX
        && spider.getPosX() < this.posX + this.image.width)
      && (spider.getPosY() + spider.getHeight() > this.posY
        && spider.getPosY() < this.posY + this.image.height)
    );
  }

  /**
   *Draws the player image to the canvas.
   *
   * @param canvas the selected canvas.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }
}
