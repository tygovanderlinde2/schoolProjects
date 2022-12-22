import CanvasUtil from './CanvasUtil.js';
import Invader from './Invader.js';

export default class InvaderC extends Invader {
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/Invader_C_1.png');
    this.score = 30;
  }

  /**
   * Changes the current picture to the other state.
   */
  public changePic(): void {
    if (this.timesMoved % 2 === 0) {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_C_1.png');
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_C_2.png');
    }
  }
}
