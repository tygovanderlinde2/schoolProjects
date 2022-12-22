/* eslint-disable jsdoc/require-jsdoc */
import CanvasUtil from './CanvasUtil.js';

export default abstract class GameItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  protected speed: number;

  protected shieldModifier: number;

  protected acceleration: number;

  protected randomNumber: number = Math.random();

  protected elapsedTime: number;

  public update(elapsed: number): void {
    this.elapsedTime = elapsed;
    this.speed *= this.acceleration;
    this.posX -= elapsed * this.speed;
  }

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

  public getShieldModifier(): number {
    return this.shieldModifier;
  }
}
