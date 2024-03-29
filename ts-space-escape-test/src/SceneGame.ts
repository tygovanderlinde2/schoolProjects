import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import GameItem from './GameItem.js';
import Player from './Player.js';
import Meteor from './Meteor.js';
import Shield from './Shield.js';
import Laser from './Laser.js';
import Scenes from './Scenes.js';
import SceneStart from './SceneStart.js';

// TODO add collision/functionality to the laser
export default class SceneGame extends Scenes {
  private keyListener: KeyListener;

  private player: Player;

  private items: GameItem[] = [];

  private timePassed: number = 0;

  private timeToNextItem: number = 500;

  private shieldsLeft: number = 20;

  private gamePaused: boolean = false;

  private reduceShield: number = 1500;

  private lasers: Laser[] = [];

  private shieldCap: boolean; // 50 shield

  private timeLimit: boolean; // 15 min

  private shieldDecay: boolean;

  public constructor(
    canvas: HTMLCanvasElement,
    shieldCap: boolean,
    timeLimit: boolean,
    shieldDecay: boolean,
  ) {
    super(window.innerWidth, window.innerHeight);
    this.canvas = canvas;
    this.background = CanvasUtil.loadNewImage('./assets/bg.jpg');
    this.keyListener = new KeyListener();
    this.player = new Player(this.canvas.height);
    this.items.push(new Meteor(this.canvas.width, this.canvas.height));
    this.items.push(new Shield(this.canvas.width, this.canvas.height));
    this.shieldCap = shieldCap;
    this.timeLimit = timeLimit;
    this.shieldDecay = shieldDecay;
  }

  /**
   * Converts time from seconds to HH:MM:SS.
   *
   * @returns a string containing the correct time.
   */
  private timeconverter(): string {
    let seconds = Math.round(this.timePassed / 1000);
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
   * Process all input. Called from the GameLoop.p
   */
  public processInput(): void {
    if (this.keyListener.keyPressed(KeyListener.KEY_ESC)) {
      this.gamePaused = !this.gamePaused;
    }
    if (this.gamePaused === false) {
      if (this.keyListener.keyPressed(KeyListener.KEY_CTRL_RIGHT)) {
        this.lasers.push(new Laser(
          this.player.getPosX(),
          this.player.getPosY(),
          this.player.getWidth(),
          this.player.getHeight(),
        ));
      }
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
      this.player.move();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): Scenes {
    if (this.gamePaused) return null;
    this.reduceShield -= elapsed;
    if (this.reduceShield <= 0 && this.shieldDecay) {
      this.reduceShield = 1500;
      this.shieldsLeft -= 1;
    }
    this.timePassed += elapsed;
    this.items.forEach((item: GameItem) => item.update(elapsed));
    this.lasers.forEach((laser: Laser) => laser.update(elapsed));

    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem <= 0) {
      if (Math.random() >= 0.8) {
        this.items.push(new Shield(this.canvas.width, this.canvas.height));
      } else {
        this.items.push(new Meteor(this.canvas.width, this.canvas.height));
      }
      this.timeToNextItem = 500 - Math.round(this.timePassed / 2000);
    }

    this.items.forEach((item: GameItem) => {
      if (this.player.itemCollided(item)) {
        this.shieldsLeft += item.getShieldModifier();
      }
    });
    if (this.shieldCap && this.shieldsLeft > 50) {
      this.shieldsLeft = 50;
    }
    this.items = this.items.filter((item: GameItem) => !this.player.itemCollided(item));
    this.items = this.items.filter((item: GameItem) => item.getPosX() + item.getWidth() > 0);
    // this.lasers = this.lasers.filter((item: GameItem) => (!this.lasers.collideWithItem(item)));
    this.lasers = this.lasers.filter((laser: Laser) => laser.getPosX() < this.canvas.width);
    if (this.shieldsLeft <= 0) return new SceneStart(this.canvas);
    if (this.timeLimit && Math.round(this.timePassed / 1000) === 900) return null;
    return null;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasUtil.clearCanvas(this.canvas);
    CanvasUtil.drawImage(
      this.canvas,
      this.background,
      this.canvas.width / 2 - this.background.width / 2,
      this.canvas.height / 2 - this.background.height / 2,
    );
    if (this.shieldsLeft > 0) {
      this.items.forEach((item: GameItem) => item.render(this.canvas));
      this.lasers.forEach((laser: Laser) => laser.render(this.canvas));
      this.player.render(this.canvas);
      let text = `Time passed: ${this.timeconverter()}`;
      if (this.timeLimit) {
        text = `Time passed: ${this.timeconverter()} / 15:00`;
      }
      if (this.timeToNextItem > 0) {
        CanvasUtil.writeTextToCanvas(this.canvas, text, 7, 70, 'left', 'none', 30, 'white');
      } else {
        CanvasUtil.writeTextToCanvas(this.canvas, text, 7, 70, 'left', 'none', 30, 'red');
      }
      if (this.shieldsLeft <= 5) {
        CanvasUtil.writeTextToCanvas(this.canvas, `Shields: ${this.shieldsLeft}`, 7, 40, 'left', 'none', 30, 'red');
      } else {
        CanvasUtil.writeTextToCanvas(this.canvas, `Shields: ${this.shieldsLeft}`, 7, 40, 'left', 'none', 30, 'white');
      }
      if (this.shieldCap) CanvasUtil.writeTextToCanvas(this.canvas, '/ 50', 150, 40, 'left', 'none', 30, 'white');
    } else {
      CanvasUtil.writeTextToCanvas(this.canvas, 'Game over', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 50, 'red');
      if (this.timeToNextItem > 0) {
        CanvasUtil.writeTextToCanvas(this.canvas, `Time survived: ${this.timeconverter()}`, this.canvas.width / 2, this.canvas.height / 2 + 40, 'center', 'none', 30, 'white');
      }
    }
    if (this.gamePaused) {
      CanvasUtil.writeTextToCanvas(this.canvas, 'Game paused', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 50, 'white');
    }
    if (this.timeToNextItem <= 0 && this.timeToNextItem > -2) {
      CanvasUtil.writeTextToCanvas(this.canvas, 'Total mayhem!', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 120, 'red');
    }
  }
}
