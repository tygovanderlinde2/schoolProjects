import CanvasUtil from './CanvasUtil.js';
import Invader from './Invader.js';
import InvaderA from './InvaderA.js';
import InvaderB from './InvaderB.js';
import InvaderBullet from './InvaderBullet.js';
import InvaderC from './InvaderC.js';
import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
import SceneDone from './SceneDone.js';
import Shooter from './Shooter.js';
import ShooterBullet from './ShooterBullet.js';

export default class Level1 extends Scene {
  private shooter: Shooter;

  private invaders: Invader[] = [];

  private playerBullet: ShooterBullet;

  private invaderBullets: InvaderBullet[] = [];

  private lives: number;

  private score: number;

  private firstHit: boolean;

  private gamePaused: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.shooter = new Shooter(maxX, maxY);
    for (let i = 0; i < 11; i++) {
      this.invaders.push(new InvaderC(50 * i + 15, 50));
      this.invaders.push(new InvaderB(50 * i + 10, 90));
      this.invaders.push(new InvaderB(50 * i + 10, 130));
      this.invaders.push(new InvaderA(50 * i + 10, 175));
      this.invaders.push(new InvaderA(50 * i + 10, 225));
    }
    this.lives = 3;
    this.score = 0;
    this.firstHit = true;
    this.gamePaused = false;
  }

  /**
   * Processes the input.
   *
   * @param keyListener The keylistener.
   */
  public processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_ESC)) this.gamePaused = !this.gamePaused;
    if (!this.gamePaused) {
      if (keyListener.isKeyDown(KeyListener.KEY_LEFT)
        || keyListener.isKeyDown(KeyListener.KEY_A)) this.shooter.move(1);
      if (keyListener.isKeyDown(KeyListener.KEY_RIGHT)
        || keyListener.isKeyDown(KeyListener.KEY_D)) this.shooter.move(0);
      if (!this.playerBullet && (keyListener.isKeyDown(KeyListener.KEY_SPACE)
        || keyListener.isKeyDown(KeyListener.KEY_F))) {
        this.playerBullet = this.shooter.fire();
        if (!this.firstHit) this.score -= 1;
      }
    }
  }

  /**
   * Processes bullets and collision.
   */
  public processBulletCollision(): void {
    this.invaders = this.invaders.filter((invader: Invader) => {
      if (invader.getPosY() > this.maxY) {
        this.lives -= 1;
        return false;
      }
      if (this.playerBullet && invader.collidesWithBullet(this.playerBullet)) {
        this.firstHit = false;
        this.score += invader.getScore();
        this.playerBullet = null;
        return false;
      }
      return true;
    });
    this.invaderBullets = this.invaderBullets.filter((bullet: InvaderBullet) => {
      if (bullet.getPosY() > this.maxY) return false;
      if (this.shooter.collidesWithBullet(bullet)) {
        this.lives -= 1;
        return false;
      }
      return true;
    });
    if (this.playerBullet && this.playerBullet.getPosY() <= 0) this.playerBullet = null;
  }

  /**
   * Updates the level.
   *
   * @param elapsed The elapsed time.
   * @returns The correct scene.
   */
  public update(elapsed: number): Scene {
    if (this.gamePaused) return null;
    this.processBulletCollision();
    if (this.playerBullet) this.playerBullet.update();
    this.invaders.forEach((invader: Invader) => {
      invader.update(elapsed);
      if (invader.willFire()) this.invaderBullets.push(invader.fire());
    });
    if (this.invaderBullets.length > 0) {
      this.invaderBullets.forEach((bullet: InvaderBullet) => bullet.update());
    }
    if (this.lives <= 0 || this.score < 0) return new SceneDone(this.maxX, this.maxY, 'you Lost', this.score + this.lives * 20);
    if (this.invaders.length <= 0) return new SceneDone(this.maxX, this.maxY, 'you won', this.score + this.lives * 20);
    return null;
  }

  /**
   * Renders the level scene.
   *
   * @param canvas The canvas being drawn to.
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);
    CanvasUtil.fillCanvas(canvas, '#000');
    this.shooter.render(canvas);
    this.invaders.forEach((invader: Invader) => invader.render(canvas));
    if (this.playerBullet) this.playerBullet.render(canvas);
    if (this.invaderBullets.length > 0) {
      this.invaderBullets.forEach((bullet: InvaderBullet) => bullet.render(canvas));
    }
    CanvasUtil.writeTextToCanvas(canvas, `score ${this.score}`.toUpperCase(), 5, 30, 'left', 'ScoreFont', 20, 'white');
    for (let i = 0; i < this.lives; i++) {
      CanvasUtil.drawImage(
        canvas,
        this.shooter.getImg(),
        (this.shooter.getWidth() + 10) * i + 15,
        canvas.height - 30,
      );
    }
    if (this.gamePaused) {
      CanvasUtil.writeTextToCanvas(
        canvas,
        'pauzed',
        canvas.width / 2,
        canvas.height / 2,
        'center',
        'ScoreFont',
        50,
        'white',
      );
    }
  }
}
