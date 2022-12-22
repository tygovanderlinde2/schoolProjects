import { Game } from './GameLoop.js';

import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import ScoreItem from './ScoreItem.js';
import Fish from './Fish.js';
import Waste from './Waste.js';
import GoldenCaptule from './GoldenCaptule.js';

export default class OceanCleanup extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private scoreItems: ScoreItem[] = [];

  private timeToNextItem: number;

  private fishCaught: number;

  private score: number;

  private paused: boolean;

  private timeToSurvive: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(canvas.width, canvas.height);
    this.timeToNextItem = Math.round(300 + (600 - 300) * Math.random());
    this.fishCaught = 0;
    this.score = 0;
    this.scoreItems.push(new Fish(canvas.height));
    this.paused = false;
    this.timeToSurvive = 90000;
  }

  /**
   * Converts time from seconds to HH:MM:SS.
   *
   * @returns a string containing the correct time.
   */
  private convertedTimeLeft(): string {
    let seconds = Math.round(this.timeToSurvive / 1000);
    let convertedTime = '';

    const firstRound = seconds % 3600;
    const hours = (seconds - firstRound) / 3600;
    const secondRound = seconds - (hours * 3600);
    const thirdRound = secondRound % 60;
    const minutes = (secondRound - thirdRound) / 60;
    seconds = secondRound - (minutes * 60);

    if (hours > 0) {
      convertedTime += `${hours}:`;
    }
    if (minutes > 0 && hours <= 0) {
      convertedTime += `${minutes}:`;
    } else if (minutes < 10 && hours > 0) {
      convertedTime += `0${minutes}:`;
    } else if (minutes >= 10 && hours > 0) {
      convertedTime += `${minutes}:`;
    }
    if ((seconds < 10 && minutes > 0)
      || (seconds < 10 && minutes === 0 && hours > 0)) {
      convertedTime += `0${seconds}`;
    } else {
      convertedTime += seconds;
    }
    return convertedTime;
  }

  /**
   * Processes the player input.
   */
  public processInput(): void {
    if (this.keyListener.keyPressed(KeyListener.KEY_ESC)) this.paused = !this.paused;
    if (this.paused) return;
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP)
      && this.player.getPosY() > 0) this.player.move(2);
    if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)
      && this.player.getPosY() + this.player.getHeight() < this.canvas.height) this.player.move(1);
  }

  /**
   * Updates the game and it's items.
   *
   * @param elapsed the time between frames.
   * @returns a boolean value indicating if the games should continue or not.
   */
  public update(elapsed: number): boolean {
    if (this.paused) return true;
    this.timeToSurvive -= elapsed;
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem <= 0) {
      this.timeToNextItem = Math.round(300 + (600 - 300) * Math.random());
      if (Math.random() > 0.3) {
        this.scoreItems.push(new Fish(this.canvas.height));
      } else {
        this.scoreItems.push(new Waste(this.canvas.height));
      }
      if (Math.random() < 0.05) {
        this.scoreItems.push(new GoldenCaptule(this.canvas.height));
      }
    }
    this.scoreItems.forEach((item: ScoreItem) => {
      if (this.player.collidesWithItem(item) && item instanceof GoldenCaptule) {
        this.scoreItems = this.scoreItems.filter((waste: ScoreItem) => {
          if (waste instanceof GoldenCaptule || waste instanceof Waste) {
            this.score += waste.getScore();
            return false;
          }
          return true;
        });
      }
    });
    this.scoreItems = this.scoreItems.filter((item: ScoreItem) => {
      if (item.getPosX() >= this.canvas.width) return false;
      if (this.player.collidesWithItem(item)) {
        if (item instanceof Fish) this.fishCaught += 1;
        this.score += item.getScore();
        return false;
      }
      return true;
    });
    this.scoreItems.forEach((item: ScoreItem) => item.update(elapsed));
    if (this.score < 0
      || this.fishCaught >= 10
      || this.score >= 1000
      || this.timeToSurvive <= 0) return false;
    return true;
  }

  /**
   * Renders all objects and the canvas.
   */
  public render(): void {
    CanvasUtil.clearCanvas(this.canvas);
    if (this.paused) {
      CanvasUtil.writeText(this.canvas, 'Paused', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 60, '#37C6D2');
    }
    if (this.score < 0 || this.fishCaught >= 10) {
      CanvasUtil.writeText(this.canvas, 'Game over', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 60, '#37C6D2');
      return;
    }
    if (this.score >= 1000 || this.timeToSurvive <= 0) {
      CanvasUtil.writeText(this.canvas, 'You won!', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 60, '#37C6D2');
      return;
    }
    this.player.render(this.canvas);
    this.scoreItems.forEach((item: ScoreItem) => item.render(this.canvas));
    CanvasUtil.writeText(this.canvas, `Score: ${this.score}`, 10, 30, 'left', 'none', 40, '#37C6D2');
    CanvasUtil.writeText(this.canvas, `Fish caught: ${this.fishCaught}`, 10, 70, 'left', 'none', 40, '#37C6D2');
    CanvasUtil.writeText(this.canvas, `Time left: ${this.convertedTimeLeft()}`, 10, 110, 'left', 'none', 40, '#37C6D2');
  }
}
// added:
// pause function,
// wincondition,
// time left (the amount of time you need to survive),
// timeconverter.
