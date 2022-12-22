import CanvasUtil from './CanvasUtil.js';

export default class Spider {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  private randomNumber: number = Math.floor(Math.random() * 4);

  public constructor(maxX: number) {
    if (this.randomNumber === 0) {
      this.image = CanvasUtil.loadNewImage('./assets/spider01.png');
    } else if (this.randomNumber === 1) {
      this.image = CanvasUtil.loadNewImage('./assets/spider02.png');
    } else if (this.randomNumber === 2) {
      this.image = CanvasUtil.loadNewImage('./assets/spider03.png');
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/spider04.png');
    }
    this.posX = ((Math.random() * maxX) + this.getWidth()) - this.getWidth();
    this.posY = -15;
  }

  /**
   *makes the spider go down.
   *
   * @param elapsed the elapsed times between frames.
   */
  public update(elapsed: number): void {
    this.posY += elapsed * 0.1;
  }

  /**
   *draws the selected image.
   *
   * @param canvas the canvas it need to draw to.
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
