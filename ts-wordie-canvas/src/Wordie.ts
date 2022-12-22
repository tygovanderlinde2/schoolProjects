/* eslint-disable no-plusplus */
import CanvasUtil from './CanvasUtil.js';
import WordieGuess from './WordieGuess.js';

export default class Wordie {
  private canvas: HTMLCanvasElement;

  private answer: string;

  private words: string[] = ['ABOUT', 'ABOVE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEGUN', 'BEING', 'BELOW', 'BENCH', 'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLOCK', 'CLOSE', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRAWN', 'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HEART', 'HEAVY', 'HENCE', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'IRONY', 'ISSUE', 'JOINT', 'JUDGE', 'JUICE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LIGHT', 'LIMIT', 'LOCAL', 'LOGIC', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MATCH', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PHASE', 'PHONE', 'PHOTO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REFER', 'RIGHT', 'RIVAL', 'RIVER', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEETH', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT', 'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH', 'FALSE', 'HELLO'];

  private guesses: WordieGuess[] = [];

  private guessesLeft: number = 5;

  private correctGuess: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    this.correctGuess = false;
    this.answer = this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
    // console.log(this.answer);
    this.canvas = canvas;
    this.updateDisplay();
  }

  /**
   * The player makes a guess. A new guess object is created.
   *
   * @param guess The word that the player guessed
   */
  public makeGuess(guess: string): void {
    if (this.guessesLeft > 0) {
      if (this.correctGuess === false) {
        const newGuess: WordieGuess = new WordieGuess(this.answer, guess);
        if (this.answer === `${newGuess.getGuess().toUpperCase()}`) {
          this.correctGuess = true;
        }
        this.guessesLeft--;
        this.guesses.push(newGuess);
        this.updateDisplay();
      }
    } else {
      this.updateDisplay();
      CanvasUtil.writeTextToCanvas(this.canvas, 'out of tries.', 200, 380, 'center', 'Raleway', 20, 'red');
      setTimeout(() => this.updateDisplay(), 1000);
    }
  }

  /**
   * The player makes a guess. If the guess is in the list of possible words, a
   * new guess object is created. Otherwise, nothing happens.
   *
   * @param guess The word that the player guessed
   */
  public makeGuessWordsOnly(guess: string): void {
    if (this.guessesLeft > 0) {
      if (this.correctGuess === false) {
        const newGuess: WordieGuess = new WordieGuess(this.answer, guess);
        if (this.answer === `${newGuess.getGuess().toUpperCase()}`) {
          this.correctGuess = true;
        }
        if (this.words.includes(newGuess.getGuess().toUpperCase())) {
          this.guessesLeft--;
          this.guesses.push(newGuess);
          this.updateDisplay();
        } else {
          this.updateDisplay();
          CanvasUtil.writeTextToCanvas(this.canvas, 'Guess invalid.', 200, 380, 'center', 'Raleway', 20, 'red');
          setTimeout(() => this.updateDisplay(), 1000);
        }
      }
    } else {
      this.updateDisplay();
      CanvasUtil.writeTextToCanvas(this.canvas, 'Out of tries.', 200, 380, 'center', 'Raleway', 20, 'red');
      setTimeout(() => this.updateDisplay(), 1000);
    }
  }

  /**
   * Update the canvas with the number of guesses left, and each of the guesses that were made
   */
  private updateDisplay(): void {
    CanvasUtil.clearCanvas(this.canvas);
    CanvasUtil.fillCanvas(this.canvas, 'cyan');

    CanvasUtil.writeTextToCanvas(this.canvas, `Guesses left: ${this.guessesLeft}`, 70, 20, 'center', 'Raleway', 20, 'red');

    let posY: number = 70;
    this.guesses.forEach((guess: WordieGuess) => {
      guess.writeGuess(this.canvas, posY);
      posY += 50;
    });

    if (this.correctGuess === true) {
      CanvasUtil.writeTextToCanvas(this.canvas, 'You guessed correcty.', 200, 350, 'center', 'Raleway', 20, 'green');
    }
    if (this.correctGuess === false) {
      if (this.guessesLeft < 1) {
        CanvasUtil.writeTextToCanvas(this.canvas, `Correct word: ${this.answer}`, 200, 350, 'center', 'Raleway', 20, 'green');
      }
    }
  }
}
