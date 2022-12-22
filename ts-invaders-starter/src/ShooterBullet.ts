import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';

export default class ShooterBullet extends Drawable {
  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
  }

  /**
   * Updates the player bullet.
   */
  public update(): void {
    this.posY -= 15;
  }

  /**
   * Renders the level scene.
   *
   * @param canvas The canvas being drawn to.
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasUtil.fillRectangle(canvas, this.posX, this.posY, 5, 14, 'yellow');
  }
}
