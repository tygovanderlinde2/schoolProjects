import KeyListener from './KeyListener.js';

export default abstract class Scenes {
  protected maxX: number;

  protected maxY: number;

  protected background: HTMLImageElement;

  protected canvas: HTMLCanvasElement;

  public constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  protected setBackground(newBackground: HTMLImageElement): void {
    this.background = newBackground;
  }

  public abstract processInput(keyListener: KeyListener): void;
  public abstract update(elapsed: number): Scenes;
  public abstract render(canvas: HTMLCanvasElement): void;
}
