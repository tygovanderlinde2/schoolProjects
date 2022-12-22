import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Shield extends GameItem {
  private shieldImages: string[] = ['./assets/bolt_gold.png', './assets/things_gold.png'];

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage(this.shieldImages[Math.round(Math.random())]);
    this.posX = maxX;
    this.posY = Math.random() * maxY;
    this.speed = 0.2;
    this.acceleration = 1;
    this.shieldModifier = 3;
  }
}
