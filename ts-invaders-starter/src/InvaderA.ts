import CanvasUtil from './CanvasUtil.js';
import Invader from './Invader.js';

export default class InvaderA extends Invader {
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/Invader_A_1.png');
    this.score = 10;
  }

  /**
   * Changes the current picture to the other state.
   */
  public changePic(): void {
    if (this.timesMoved % 2 === 0) {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_A_1.png');
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/Invader_A_2.png');
    }
  }
}
