import CanvasUtil from './CanvasUtil.js';
import Invader from './Invader.js';

export default class InvaderB extends Invader {
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    if (this.timesMoved % 2 === 1) {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_B_1.png');
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_B_2.png');
    }
    this.score = 20;
  }

  /**
   * Changes the current picture to the other state.
   */
  public changePic(): void {
    if (this.timesMoved % 2 === 0) {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_B_1.png');
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_B_2.png');
    }
  }
}
