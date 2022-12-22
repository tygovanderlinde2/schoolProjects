import Flower from './Flower.js';
import Levels from './Levels.js';
import Plants from './plants.js';
import Player from './Player.js';
import Scene from './Scene.js';
import SceneLose from './SceneLose.js';
import SceneWin from './SceneWin.js';
import ScoreItem from './ScoreItem.js';
import Zombie from './zombie.js';

export default class Level2 extends Levels {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY, 300, new Player());
    this.currentLevel = 2;
    for (let i = 0; i < 25; i++) {
      this.scoreItems.push(new Plants(maxX, maxY));
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
      this.timeToNextItem = 300;
      if (Math.random() >= 0.4) {
        this.scoreItems.push(new Zombie(this.maxX, this.maxY));
      } else {
        this.scoreItems.push(new Plants(this.maxX, this.maxY));
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
    if (this.currentScore >= 50) return new SceneWin(this.maxX, this.maxY);
    if (this.currentScore < 0 || this.flowersLost >= 50) return new SceneLose(this.maxX, this.maxY);
    return null;
  }
}
