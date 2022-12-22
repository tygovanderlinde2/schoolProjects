/* eslint-disable no-else-return */
/* eslint-disable max-len */
import { Game } from './GameLoop.js';

import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Meteor from './Meteor.js';
import Shield from './Shield.js';
import Player from './Player.js';

export default class SpaceEscape extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private meteors: Meteor[] = [];

  private shields: Shield[] = [];

  private player: Player;

  private currentShield: number = 20;

  private timePassed: number = 0;

  private gameState: boolean = true;

  private gamePaused: boolean = false;

  private timeToNextItem: number = 500;

  private newtime: number = 500;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.meteors.push(new Meteor(this.canvas.width, this.canvas.height));
    this.shields.push(new Shield(this.canvas.width, this.canvas.height));
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.keyPressed(KeyListener.KEY_ESC)) {
      CanvasUtil.writeTextToCanvas(this.canvas, 'Game paused', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 50, 'white');
      this.gamePaused = !this.gamePaused;
    }
    if (this.gamePaused === false) {
      if (!(this.player.getPosY() + this.player.getHeight() <= 0)) {
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
          this.player.moveUp();
        }
      } else {
        this.player.setPosY(this.canvas.height);
      }
      if (this.player.getPosY() <= this.canvas.height) {
        if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
          this.player.moveDown();
        }
      } else {
        this.player.setPosY(-110);
      }
      if (!(this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_DOWN))) {
        this.player.setSpeed(8);
      }
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    // this.currentShield -= Math.round((elapsed * (2 / 3)) / 100);
    if (this.currentShield <= 0) {
      this.gameState = false;
    }
    if (this.gamePaused === false) {
      this.timePassed += elapsed;
      this.meteors.forEach((meteor: Meteor) => meteor.update(elapsed));
      this.shields.forEach((shield: Shield) => shield.update(elapsed));

      this.timeToNextItem -= elapsed;
      if (this.timeToNextItem <= 0) {
        if (Math.random() >= 0.8) {
          this.shields.push(new Shield(this.canvas.width, this.canvas.height));
        } else {
          this.meteors.push(new Meteor(this.canvas.width, this.canvas.height));
        }
        this.timeToNextItem = this.newtime - Math.round(this.timePassed / 1000);
      }
    }

    this.shields.forEach((shield: Shield) => {
      if (this.player.shieldCollided(shield)) {
        this.currentShield += shield.getShieldModifier();
      }
    });
    this.meteors.forEach((meteor: Meteor) => {
      if (this.player.meteorCollided(meteor)) {
        this.currentShield -= meteor.getShieldModifier();
      }
    });

    this.meteors = this.meteors.filter((meteor: Meteor) => (meteor.getPosY() < this.canvas.height));
    this.meteors = this.meteors.filter((meteor: Meteor) => (!this.player.meteorCollided(meteor)));
    this.shields = this.shields.filter((shield: Shield) => (shield.getPosY() < this.canvas.height));
    this.shields = this.shields.filter((shield: Shield) => (!this.player.shieldCollided(shield)));
    return this.gameState;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    if (this.gamePaused === false) {
      if (this.gameState === true) {
        CanvasUtil.clearCanvas(this.canvas);
        this.meteors.forEach((meteor: Meteor) => meteor.render(this.canvas));
        this.shields.forEach((shield: Shield) => shield.render(this.canvas));
        this.player.render(this.canvas);
        if (this.currentShield <= 5) {
          CanvasUtil.writeTextToCanvas(this.canvas, `Shields: ${this.currentShield}`, 7, 40, 'left', 'none', 30, 'red');
        } else {
          CanvasUtil.writeTextToCanvas(this.canvas, `Shields: ${this.currentShield}`, 7, 40, 'left', 'none', 30, 'white');
        }
        CanvasUtil.writeTextToCanvas(this.canvas, `Time passed: ${Math.round(this.timePassed / 1000)} S`, 7, 70, 'left', 'none', 30, 'white');
      } else {
        CanvasUtil.clearCanvas(this.canvas);
        CanvasUtil.writeTextToCanvas(this.canvas, 'Game over', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 50, 'red');
        CanvasUtil.writeTextToCanvas(this.canvas, `Time survived: ${Math.round(this.timePassed / 1000)} seconds`, this.canvas.width / 2, this.canvas.height / 2 + 40, 'center', 'none', 30, 'white');
      }
    }
  }
}
