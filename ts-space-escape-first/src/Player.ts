/* eslint-disable jsdoc/require-jsdoc */
import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';
import Meteor from './Meteor.js';
import Shield from './Shield.js';

export default class Player extends GameItem {
  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/ship.png');
    this.posX = 10;
    this.posY = maxY / 2;
    this.acceleration = 1.002;
  }

  public meteorCollided(meteor: Meteor): boolean {
    return (
      (meteor.getPosX() + meteor.getWidth() > this.posX
        && meteor.getPosX() < this.posX + this.image.width)
      && (meteor.getPosY() + meteor.getHeight() > this.posY
        && meteor.getPosY() < this.posY + this.image.height)
    );
  }

  public shieldCollided(shield: Shield): boolean {
    return (
      (shield.getPosX() + shield.getWidth() > this.posX
        && shield.getPosX() < this.posX + this.image.width)
      && (shield.getPosY() + shield.getHeight() > this.posY
        && shield.getPosY() < this.posY + this.image.height)
    );
  }

  public moveUp(): void {
    this.speed *= this.acceleration;
    this.posY -= this.speed;
  }

  public moveDown(): void {
    this.speed *= this.acceleration;
    this.posY += this.speed;
  }

  public setPosY(newPosY: number): void {
    this.posY = newPosY;
  }

  public setSpeed(newSpeed: number): void {
    this.speed = newSpeed;
  }
}
