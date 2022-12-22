import Flower from './Flower.js';
import Kudzu from './Kudzu.js';
import Level2 from './Level2.js';
import Levels from './Levels.js';
import Player from './Player.js';
import Scene from './Scene.js';
import SceneLose from './SceneLose.js';
import ScoreItem from './ScoreItem.js';

export default class Level1 extends Levels {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY, 500, new Player());
    this.currentLevel = 1;
    this.currentScore = 0;
    for (let i = 0; i < 50; i++) {
      this.scoreItems.push(new Flower(maxX, maxY));
    }
  }

  /**
   * Updates the level.
   *
   * @param elapsed The elapsed time.
   * @returns The correct scene.
   */
  public update(elapsed: number): Scene {
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem <= 0) {
      this.timeToNextItem = 500;
      if (Math.random() >= 0.6) {
        this.scoreItems.push(new Kudzu(this.maxX, this.maxY));
      } else {
        this.scoreItems.push(new Flower(this.maxX, this.maxY));
      }
    }
    this.scoreItems.forEach((item: ScoreItem) => item.update(elapsed));
    if (this.spaceIsPressed) {
      this.scoreItems = this.scoreItems.filter((item: ScoreItem) => {
        if (this.player.collidesWithItem(item)) {
          if (item instanceof Flower) {
            this.flowersLost += 1;
          }
          this.currentScore += item.getScoreModifier();
          return false;
        }
        return true;
      });
    }
    this.scoreItems = this.scoreItems.filter((item: ScoreItem) => {
      if (item.getPosY() + item.getHeight() < 0
        || item.getPosX() > this.maxX
        || item.getPosY() > this.maxY
        || item.getPosX() + item.getWidth() < 0) return false;
      return true;
    });
    if (this.currentScore >= 100) return new Level2(this.maxX, this.maxY);
    if (this.currentScore < 0 || this.flowersLost >= 10) return new SceneLose(this.maxX, this.maxY);
    return null;
  }
}
