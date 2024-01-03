import CanvasUtil from './CanvasUtil.js';
import Cattribute from './Cattribute.js';

export default class Catagotchi {
  private catAlive: boolean;

  private catStatus: string;

  private catMood: Cattribute;

  private catEnergy: Cattribute;

  private catHunger: Cattribute;

  private catStatusImgHappy: HTMLImageElement = CanvasUtil.loadNewImage('./assets/cat-happy.png');

  private catStatusImgOkay: HTMLImageElement = CanvasUtil.loadNewImage('./assets/cat-okay.png');

  private catStatusImgUnhappy: HTMLImageElement = CanvasUtil.loadNewImage('./assets/cat-unhappy.png');

  private catStatusImgDed: HTMLImageElement = CanvasUtil.loadNewImage('./assets/cat-ded.png');

  private catEnergyImg: HTMLImageElement = CanvasUtil.loadNewImage('./assets/icon-energy.png');

  private catHungerImg: HTMLImageElement = CanvasUtil.loadNewImage('./assets/icon-hunger.png');

  private catMoodImg: HTMLImageElement = CanvasUtil.loadNewImage('./assets/icon-mood.png');

  public constructor() {
    this.catAlive = true;
    this.catMood = new Cattribute(10);
    this.catEnergy = new Cattribute(10);
    this.catHunger = new Cattribute(0);

    this.catStatus = 'Happy';
  }

  /**
   * Feed my Catagotchi and reduce its hunger.
   */
  public feed(): void {
    this.catHunger.decrease(1);
  }

  /**
   * Play with my Catagotchi and improve its mood, but it gets tired
   */
  public play(): void {
    this.catEnergy.decrease(1);
    this.catMood.increase(1);
  }

  /**
   * Pet my Catagotchi so that it will fall asleep.
   */
  public pet(): void {
    this.catEnergy.increase(1);
    this.catHunger.increase(1);
  }

  /**
   * Check if my Catagotchi has died. Hopefully not :(
   */
  private catDied(): void {
    if (this.catEnergy.getValue() === 0 || this.catHunger.getValue() === 10) this.catAlive = false;
  }

  /**
   * Update the state of Catagotchi according to rules
   */
  public updateCat(): void {
    if (this.catEnergy.getValue() < 2
      || this.catMood.getValue() < 2
      || this.catHunger.getValue() > 8) {
      this.catStatus = 'Unhappy';
    } else if (this.catEnergy.getValue() < 4
      || this.catMood.getValue() < 4
      || this.catHunger.getValue() > 6) {
      this.catStatus = 'Okay';
    } else {
      this.catStatus = 'Happy';
    }

    if (Math.random() > 0.7) this.catEnergy.decrease(1);
    if (Math.random() > 0.8) this.catMood.decrease(1);
    if (Math.random() > 0.9) this.catHunger.increase(1);
    this.catDied();
  }

  /**
   * Update the screen of the Catagotchi
   *
   * @param canvas Canvas to draw on
   */
  public updateScreen(canvas: HTMLCanvasElement): void {
    CanvasUtil.clearCanvas(canvas);

    CanvasUtil.drawImage(canvas, this.catEnergyImg, 5, 130);
    CanvasUtil.writeTextToCanvas(canvas, this.catEnergy.getValue().toString(), 20, 190);
    CanvasUtil.drawImage(canvas, this.catMoodImg, 130, 130);
    CanvasUtil.writeTextToCanvas(canvas, this.catMood.getValue().toString(), 145, 190);
    CanvasUtil.drawImage(canvas, this.catHungerImg, 255, 130);
    CanvasUtil.writeTextToCanvas(canvas, this.catHunger.getValue().toString(), 270, 190);

    if (this.catAlive) {
      if (this.catStatus === 'Happy') {
        CanvasUtil.drawImage(canvas, this.catStatusImgHappy, 0, 10);
      }
      if (this.catStatus === 'Okay') {
        CanvasUtil.drawImage(canvas, this.catStatusImgOkay, 0, 0);
      }
      if (this.catStatus === 'Unhappy') {
        CanvasUtil.drawImage(canvas, this.catStatusImgUnhappy, 0, 20);
      }
    } else {
      CanvasUtil.clearCanvas(canvas);
      CanvasUtil.drawImage(canvas, this.catStatusImgDed, 0, 20);
      let deathReason: string = 'Skillissue';
      if (this.catEnergy.getValue() <= 0 && this.catHunger.getValue() < 10) {
        deathReason = 'Too tired';
      }
      if (this.catHunger.getValue() >= 10 && this.catEnergy.getValue() > 0) {
        deathReason = 'Starvation';
      }
      CanvasUtil.writeTextToCanvas(canvas, deathReason, 145, 190, 'center', 'Sans Serif', 20, 'white');
    }
  }
}
