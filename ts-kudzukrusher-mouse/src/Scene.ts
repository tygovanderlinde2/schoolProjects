import MouseListener from './MouseListener.js';

export default abstract class Scene {
  protected maxX: number;

  protected maxY: number;

  public constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  public abstract processInput(keyListener: MouseListener): void;
  public abstract update(elapsed: number): Scene;
  public abstract render(canvas: HTMLCanvasElement): void;
}
