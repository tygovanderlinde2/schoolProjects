/* eslint-disable max-len */
import { Game } from './GameLoop.js';
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Player from './player.js';
import Fruit from './Fruit.js';
import Spider from './Spider.js';

export default class FruitDrop extends Game {
  private canvas: HTMLCanvasElement;

  private player: Player;

  private fruits: Fruit[] = [];

  private spiders: Spider[] = [];

  private keyListener: KeyListener;

  private score: number = 0;

  private timeToNextItem: number = 200;

  private timeLeft: number = 60000;

  private gameStop: boolean = false;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.fruits.push(new Fruit(this.canvas.width));
    this.spiders.push(new Spider(this.canvas.width));
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.player.getPosX() > 0) {
      if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
        this.player.moveLeft();
      }
    }
    if (this.player.getPosX() + this.player.getWidth() + 5 < this.canvas.width) {
      if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
        this.player.moveRight();
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
    this.timeLeft -= elapsed;
    if (this.gameStop === false) {
      this.spiders.forEach((spider: Spider) => spider.update(elapsed));
      this.fruits.forEach((fruit: Fruit) => fruit.update(elapsed));
      this.timeToNextItem -= elapsed;
      if (this.timeToNextItem < 0) {
        if (Math.random() >= 0.9) {
          this.spiders.push(new Spider(this.canvas.width));
        } else {
          this.fruits.push(new Fruit(this.canvas.width));
        }
        this.timeToNextItem = 200;
      }
      // Adding/subtracting points on collision.
      this.fruits.forEach((fruit: Fruit) => {
        if (this.player.isCollidingFruit(fruit)) {
          this.score += 1;
        }
      });
      this.spiders.forEach((spider: Spider) => {
        if (this.player.isCollidingSpider(spider)) {
          this.score -= 5;
        }
      });
      // Logic for removing the items once they either go out of the screen or are caught by the basket.
      this.fruits = this.fruits.filter((fruit: Fruit) => (fruit.getPosY() < this.canvas.height));
      this.fruits = this.fruits.filter((fruit: Fruit) => (!this.player.isCollidingFruit(fruit)));
      this.spiders = this.spiders.filter((spider: Spider) => (spider.getPosY() < this.canvas.height));
      this.spiders = this.spiders.filter((spider: Spider) => (!this.player.isCollidingSpider(spider)));
    }
    if (this.gameStop === true) {
      return false;
    }
    return true;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    CanvasUtil.clearCanvas(this.canvas);
    if (this.timeLeft <= 0) {
      this.gameStop = true;
      CanvasUtil.writeTextToCanvas(this.canvas, 'Game over', this.canvas.width / 2, this.canvas.height / 2, 'center', 'none', 200, 'red');
      CanvasUtil.writeTextToCanvas(this.canvas, `Your score was: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 100, 'center', 'none', 100, 'red');
    } else {
      CanvasUtil.writeTextToCanvas(this.canvas, `Score: ${this.score}`, 100, 50, 'center', 'none', 40, 'red');
      CanvasUtil.writeTextToCanvas(this.canvas, `Time left: ${Math.ceil(this.timeLeft / 1000)}`, 107, 80, 'center', 'none', 40, 'red');
      this.player.render(this.canvas);
      this.fruits.forEach((fruit: Fruit) => fruit.render(this.canvas));
      this.spiders.forEach((spider: Spider) => spider.render(this.canvas));
    }
  }
}
