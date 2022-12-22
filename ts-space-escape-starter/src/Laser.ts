import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Laser extends GameItem {
  private playerPosX: number;

  private playerPosY: number;

  private playerWidth: number;

  private playerHeight: number;

  public constructor(
    newPlayerPosX: number,
    newPlayerPosY: number,
    newPlayerWidth: number,
    newPlayerHeight: number,
  ) {
    super();
    this.playerPosX = newPlayerPosX;
    this.playerPosY = newPlayerPosY;
    this.playerWidth = newPlayerWidth;
    this.playerHeight = newPlayerHeight;
    this.image = CanvasUtil.loadNewImage('./assets/laser.png');
    this.posX = this.playerPosX + this.playerWidth - 5;
    this.posY = this.playerPosY + (this.playerHeight / 2) - 6;
    this.speed = 1;
    this.acceleration = 1;
    this.shieldModifier = 0;
  }

  /**
   * Updates the game.
   *
   * @param elapsed the elapsed time between frames.
   */
  public override update(elapsed: number): void {
    this.posX += elapsed * this.speed;
  }

  /**
   * Checks if the laser collides with a meteor.
   *
   * @param item The current item.
   * @returns A boolean value indicating whether or not the current
   * laser is colliding with the current item.
   */
  public collideWithItem(item: GameItem): boolean {
    return (
      (this.posX + this.image.width > item.getPosX()
        && this.posX < item.getPosX() + item.getWidth())
      && (this.posY + this.image.height > item.getPosY()
        && this.posY < item.getPosY() + item.getHeight())
    );
  }
}
