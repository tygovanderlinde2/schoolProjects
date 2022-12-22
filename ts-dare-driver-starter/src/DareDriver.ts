import CanvasUtil from './CanvasUtil.js';
import Coin from './Car.js';
import Car from './Coin.js';
import { Game } from './GameLoop.js';
import Ice from './Ice.js';

import KeyListener from './KeyListener.js';
import Player from './Player.js';
import ScoreItem from './ScoreItem.js';

export default class DareDriver extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private scoreItems: ScoreItem[] = [];

  private laneLeft: number;

  private laneCentre: number;

  private laneRight: number;

  private timeToNextItem: number;

  private timeToNextIce: number;

  private timeLeft: number;

  private score: number;

  private randomNumber: number = Math.random();

  private gamePaused: boolean = false;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = 600;
    this.keyListener = new KeyListener();
    this.laneLeft = 165;
    this.laneCentre = 285;
    this.laneRight = 410;
    this.player = new Player(this.laneCentre, canvas.height - 100);
    this.timeToNextItem = this.randomIntBetween(0, 1000);
    this.timeToNextIce = this.randomIntBetween(0, 10000);
    this.timeLeft = 60000;
    this.score = 0;
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
      if (this.keyListener.keyPressed(KeyListener.KEY_RIGHT)) this.player.move(this.laneCentre);
    }
    if (this.player.getPosX() === this.laneCentre) {
      if (this.keyListener.keyPressed(KeyListener.KEY_LEFT)) this.player.move(this.laneLeft);
      if (this.keyListener.keyPressed(KeyListener.KEY_RIGHT)) this.player.move(this.laneRight);
    }
    if (this.player.getPosX() === this.laneRight) {
      if (this.keyListener.keyPressed(KeyListener.KEY_LEFT)) this.player.move(this.laneCentre);
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
    this.timeToNextItem -= elapsed;
    this.timeToNextIce -= elapsed;
    this.timeLeft -= elapsed;
    if (this.timeToNextIce <= 0) {
      this.timeToNextIce = this.randomIntBetween(5000, 12000);
      if (this.randomNumber < 0.33) {
        this.scoreItems.push(new Ice(this.laneLeft));
      } else if (this.randomNumber >= 0.33 && this.randomNumber < 0.66) {
        this.scoreItems.push(new Ice(this.laneCentre));
      } else {
        this.scoreItems.push(new Ice(this.laneRight));
      }
    }
    if (this.timeToNextItem <= 0) {
      this.timeToNextItem = this.randomIntBetween(500, 700);
      if (Math.random() < 0.65) {
        if (this.randomNumber < 0.33) {
          this.scoreItems.push(new Coin(this.laneLeft));
        } else if (this.randomNumber >= 0.33 && this.randomNumber < 0.66) {
          this.scoreItems.push(new Coin(this.laneCentre));
        } else {
          this.scoreItems.push(new Coin(this.laneRight));
        }
      } else if (this.randomNumber < 0.33) {
        this.scoreItems.push(new Car(this.laneLeft));
      } else if (this.randomNumber >= 0.33 && this.randomNumber < 0.66) {
        this.scoreItems.push(new Car(this.laneCentre));
      } else {
        this.scoreItems.push(new Car(this.laneRight));
      }
      this.randomNumber = Math.random();
    }
    this.scoreItems = this.scoreItems.filter((item: ScoreItem) => {
      if (item instanceof Ice && this.player.collideWithItem(item)) {
        if (this.player.getPosX() === this.laneLeft) {
          if (Math.round(Math.random()) === 1) {
            this.player.move(this.laneCentre);
          } else {
            this.player.move(this.laneRight);
          }
        } else if (this.player.getPosX() === this.laneCentre) {
          if (Math.round(Math.random()) === 1) {
            this.player.move(this.laneLeft);
          } else {
            this.player.move(this.laneRight);
          }
        } else if (Math.round(Math.random()) === 1) {
          this.player.move(this.laneCentre);
        } else {
          this.player.move(this.laneLeft);
        }
        return false;
      }
      if (this.player.collideWithItem(item)) {
        this.score += item.getScore();
        return false;
      }
      if (item.getPosY() > this.canvas.height) return false;
      return true;
    });
    this.scoreItems.forEach((item: ScoreItem) => item.update(elapsed));
    if (this.timeLeft <= 0) return false;
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    if (this.gamePaused) {
      CanvasUtil.writeTextToCanvas(this.canvas, 'Paused', this.canvas.width / 2, this.canvas.height / 2 + 30, 'center', 'none', 50, 'white');
      return;
    }
    CanvasUtil.clearCanvas(this.canvas);
    if (this.timeLeft <= 0) {
      CanvasUtil.writeTextToCanvas(this.canvas, 'game over'.toUpperCase(), this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 60, 'white');
      CanvasUtil.writeTextToCanvas(this.canvas, `score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 30, 'center', 'none', 40, 'white');
      return;
    }
    this.player.render(this.canvas);
    this.scoreItems.forEach((item: ScoreItem) => item.render(this.canvas));
    CanvasUtil.writeTextToCanvas(this.canvas, `Score: ${this.score}`, 10, 30, 'left', 'none', 30, 'aqua');
    CanvasUtil.writeTextToCanvas(this.canvas, `Time left: ${Math.round(this.timeLeft / 1000)}`, 10, 60, 'left', 'none', 30, 'aqua');
  }
}
