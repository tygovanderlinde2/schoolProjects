import CanvasUtil from './CanvasUtil.js';

export default abstract class GameItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  protected speed: number;

  protected acceleration: number;

  protected shieldModifier: number;

  /**
   * Updates the game.
   *
   * @param elapsed the elapsed time between frames.
   */
  public update(elapsed: number): void {
    this.speed *= this.acceleration;
    this.posX -= elapsed * this.speed;
  }

  /**
   * Renders the current game state.
   *
   * @param canvas the selected canvas.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public getShieldModifier(): number {
    return this.shieldModifier;
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

  public setPosY(newPosY: number): void {
    this.posY = newPosY;
  }
}
