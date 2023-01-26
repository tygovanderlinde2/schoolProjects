import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class ScoreItem extends GameItem {
  private images: string[] = ['./assets/gemBlue.png', './assets/gemGreen.png', './assets/gemRed.png', './assets/skullBlue.png', './assets/skullGreen.png', './assets/skullRed.png', './assets/key.png'];

  private randomNumber: number = Math.round(Math.random() * (this.images.length - 1));

  public constructor(setX: number, maxY: number, newImgIndex: number) {
    super();
    this.image = CanvasUtil.loadNewImage(
      this.images[this.randomNumber],
    );
    if (
      newImgIndex === 0
      || newImgIndex === 1
      || newImgIndex === 2
      || newImgIndex === 3
      || newImgIndex === 4
      || newImgIndex === 5
      || newImgIndex === 6
      || newImgIndex === 7
    ) this.image = CanvasUtil.loadNewImage(this.images[newImgIndex]);
    this.posX = this.possiblePosX[Math.round(Math.random() * (this.possiblePosX.length - 1))];
    if (setX === 160 || setX === 285 || setX === 410) this.posX = setX;
    this.posY = maxY;
    this.speed = 0.2;
    if (this.randomNumber === 0) this.score = 5;
    if (this.randomNumber === 1) this.score = 50;
    if (this.randomNumber === 2) this.score = 100;
    if (this.randomNumber === 3) this.score = -5;
    if (this.randomNumber === 4) this.score = -50;
    if (this.randomNumber === 5) this.score = -100;
    if (this.randomNumber === 6) {
      this.score = 0;
      this.speed = 0.3;
    }
  }
}
