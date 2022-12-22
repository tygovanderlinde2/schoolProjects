import CanvasUtil from './CanvasUtil.js';

export default class GuessLetter {
  private letter: string;

  private color: string;

  public constructor(letter: string) {
    this.letter = letter;
    this.color = 'black';
  }

  public setColor(newColor: string) {
    this.color = newColor;
  }

  /**
   * writes text to the canvas.
   *
   * @param canvas the canvas that is being written to.
   * @param posX the x-position of the letters.
   * @param posY the y-position of the letters.
   */
  public writeLetter(canvas: HTMLCanvasElement, posX: number, posY: number) {
    CanvasUtil.writeTextToCanvas(canvas, this.letter.toUpperCase(), posX, posY, 'center', 'Raleway', 40, this.color);
  }
}
