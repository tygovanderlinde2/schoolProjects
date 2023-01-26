import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Dynamite extends GameItem {
  public constructor(maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/dynamite.png');
    this.posX = this.possiblePosX[Math.round(Math.random() * (this.possiblePosX.length - 1))];
    this.posY = maxY;
    this.speed = 0.1;
  }

  /**
   * Updates the dynamites.
   * 
   * @param elapsed the time between frames.
   */
  public override update(elapsed: number): void {
    this.speed *= 1.005;
    this.posY -= this.speed * elapsed;
  }
}
