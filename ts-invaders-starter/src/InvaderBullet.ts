import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';

export default class InvaderBullet extends Drawable {
  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
  }

  /**
   * Updates the invader bullets.
   */
  public update(): void {
    this.posY += 3;
  }

  /**
   * Renders the level scene.
   *
   * @param canvas The canvas being drawn to.
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasUtil.fillRectangle(canvas, this.posX, this.posY, 5, 9, 'white');
  }
}
