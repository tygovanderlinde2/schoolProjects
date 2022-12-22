import GuessLetter from './GuessLetter.js';

export default class WordieGuess {
  private letters: GuessLetter[] = [];

  private guess: string;

  public constructor(answer: string, newGuess: string) {
    this.guess = newGuess;
    for (let i = 0; i < 5; i++) {
      const letter = new GuessLetter(newGuess[i]);
      if (answer.toUpperCase().includes(newGuess[i].toUpperCase())) {
        if (newGuess[i].toUpperCase() === answer[i].toUpperCase()) {
          letter.setColor('green');
        } else {
          letter.setColor('blue');
        }
      }
      this.letters.push(letter);
    }
  }

  public getGuess(): string {
    return this.guess;
  }

  /**
   * writes the guess the the canvas
   *
   * @param canvas the selected canvas
   * @param posY the y-postition of the word.
   */
  public writeGuess(canvas: HTMLCanvasElement, posY: number): void {
    let posX = 100;
    this.letters.forEach((letter: GuessLetter) => {
      letter.writeLetter(canvas, posX, posY);
      posX += 50;
    });
  }
}
