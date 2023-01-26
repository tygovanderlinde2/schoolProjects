import { Game } from './GameLoop.js';
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import GameItem from './GameItem.js';
import Dynamite from './Dynamite.js';
import ScoreItem from './ScoreItem.js';

export default class WizardsChest extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private laneLeft: number;

  private laneMiddle: number;

  private laneRight: number;

  private gameItems: GameItem[] = [];

  private timeToNextItem: number;

  private timeLeft: number;

  private score: number;

  private gamePaused: boolean = false;

  private chestOpen: boolean = false;

  /**
   * Create a new instance of the game.
   *
   * @param canvas HTML canvas where the game should be rendered
   */
  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = 600;
    this.keyListener = new KeyListener();
    this.player = new Player(canvas.width, canvas.height);
    this.laneLeft = 160;
    this.laneMiddle = 285;
    this.laneRight = 410;
    this.score = 0;
    this.timeLeft = 60000;
    this.timeToNextItem = this.randomIntBetween(0, 600);
    this.gameItems.push(new ScoreItem(this.laneMiddle, this.canvas.height, 6));
  }

  /**
   * Method that returns a random integer number between and
   * including the lower and upper limits
   *
   * @param lower the lower limit of the possible result
   * @param upper the upper limit of the possible result
   * @returns a random integer number between and including the lower and upper
   *   limits
   */
  // eslint-disable-next-line class-methods-use-this
  public randomIntBetween(lower: number, upper: number): number {
    return Math.round(lower + (upper - lower) * Math.random());
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.keyPressed(KeyListener.KEY_ESC)) this.gamePaused = !this.gamePaused;
    if (this.gamePaused) return;
    if (this.player.getPosX() === this.laneLeft) {
      if (this.keyListener.keyPressed(KeyListener.KEY_RIGHT)) this.player.move(this.laneMiddle);
    }
    if (this.player.getPosX() === this.laneMiddle) {
      if (this.keyListener.keyPressed(KeyListener.KEY_LEFT)) this.player.move(this.laneLeft);
      if (this.keyListener.keyPressed(KeyListener.KEY_RIGHT)) this.player.move(this.laneRight);
    }
    if (this.player.getPosX() === this.laneRight) {
      if (this.keyListener.keyPressed(KeyListener.KEY_LEFT)) this.player.move(this.laneMiddle);
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    if (this.gamePaused) return true;
    if (this.timeLeft <= 0 || this.score < 0) return false;
    this.timeLeft -= elapsed;
    if (this.chestOpen) {
      this.player.setImg('./assets/chestOpen.png');
    } else {
      this.player.setImg('./assets/chestClosed.png');
    }
    this.gameItems = this.gameItems.filter((gameItem: GameItem) => {
      if (gameItem.getPosY() + gameItem.getHeight() <= 0) return false;
      if (this.player.collidesWithItem(gameItem)) {
        if (gameItem instanceof Dynamite) {
          this.score = 0;
          return false;
        }
        if (gameItem.getImg().src === CanvasUtil.loadNewImage('./assets/key.png').src) {
          this.chestOpen = !this.chestOpen;
          return false;
        }
        if (this.chestOpen) {
          if (gameItem instanceof Dynamite) {
            this.score = 0;
          } else {
            this.score += gameItem.getScore();
          }
          return false;
        }
      }
      return true;
    });
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem <= 0) {
      this.timeToNextItem = this.randomIntBetween(300, 600);
      if (Math.random() >= 0.2) {
        if (Math.random() >= 0.2) {
          this.gameItems.push(new ScoreItem(-1, this.canvas.height, -1));
        }
      } else {
        this.gameItems.push(new Dynamite(this.canvas.height));
      }
    }
    this.gameItems.forEach((gameItem: GameItem) => gameItem.update(elapsed));
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasUtil.clearCanvas(this.canvas);
    CanvasUtil.writeText(this.canvas, `Score: ${this.score}`, 20, 40, 'left', 'none', 35, 'aqua');
    CanvasUtil.writeText(this.canvas, `${Math.round(this.timeLeft / 1000)}s`, this.canvas.width - 40, 40, 'right', 'none', 35, 'aqua');
    this.player.render(this.canvas);
    this.gameItems.forEach((gameItem: GameItem) => gameItem.render(this.canvas));
    if (this.timeLeft <= 0 || this.score < 0) CanvasUtil.writeText(this.canvas, 'Game over', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 50, 'aqua');
    if (this.gamePaused) CanvasUtil.writeText(this.canvas, 'Game paused', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 50, 'aqua');
  }
}
