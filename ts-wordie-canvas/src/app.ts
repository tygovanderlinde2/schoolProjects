import Wordie from './Wordie.js';

const guessInput: HTMLInputElement = document.getElementById('inputGuess') as HTMLInputElement;

const guessButton: HTMLButtonElement = document.getElementById('makeguess') as HTMLButtonElement;

const resetButton: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;

const includedWordsButton: HTMLButtonElement = document.getElementById('includedWords') as HTMLButtonElement;

const wordieCanvas: HTMLCanvasElement = document.getElementById('guesses') as HTMLCanvasElement;

let wordie: Wordie;

let wordsOnly: boolean = false;

function makeGuess() {
  wordie.makeGuess(guessInput.value);
  guessInput.value = '';
}

function makeGuessWordsOnly() {
  wordie.makeGuessWordsOnly(guessInput.value);
  guessInput.value = '';
}

guessButton.addEventListener('click', () => {
  if (wordsOnly === false) {
    makeGuess();
  } else {
    makeGuessWordsOnly();
  }
});

resetButton.addEventListener('click', () => {
  wordie = new Wordie(wordieCanvas);
});

includedWordsButton.addEventListener('click', () => {
  if (wordsOnly === false) {
    includedWordsButton.className = 'greenBackground';
    wordsOnly = true;
  } else if (wordsOnly === true) {
    includedWordsButton.className = 'redBackground';
    wordsOnly = false;
  }
});

window.addEventListener('keypress', (ev: KeyboardEvent) => {
  if (ev.key === 'Enter') {
    if (wordsOnly === false) {
      makeGuess();
    } else {
      makeGuessWordsOnly();
    }
  }
});

window.addEventListener('load', () => {
  wordie = new Wordie(wordieCanvas);
});
