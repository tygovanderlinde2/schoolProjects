import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class Ice extends ScoreItem {
  public constructor(startX: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/ice.png');
    this.posX = startX;
    this.posY = 0 - this.image.height;
    this.speed = 0.35;
    this.score = 0;
  }
}
