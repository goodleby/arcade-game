import {getRandNum, getRandBool} from 'components/math';

export const Level = (function() {
  return class Level {
    constructor(assets, map, width, spawnArea, enemiesOptions) {
      this.assets = assets;
      this.map = map;
      this.height = map.length;
      this.width = width;
      this.spawnArea = spawnArea;
      this.enemiesOptions = enemiesOptions;
    }
    renderLine(ctx, img, y) {
      for (let x = 0; x < this.width; x++) {
        ctx.drawImage(img, x * 101, y * 80);
      }
    }
    render(ctx) {
      this.map.forEach((item, y) => this.renderLine(ctx, this.assets[item], y));
    }
    getSpawnY() {
      const {from, to} = this.spawnArea;
      return getRandNum(from, to);
    }
    getEnemySpeed() {
      const {minEnemySpeed, maxEnemySpeed} = this.enemiesOptions;
      return (
        getRandNum(Math.round(minEnemySpeed * 1000), Math.round(maxEnemySpeed * 1000)) / 1000
      );
    }
    needEnemy(amountOfEnemies) {
      const {maxEnemies, enemySpawnRate} = this.enemiesOptions;
      return amountOfEnemies < maxEnemies && getRandBool(1, Math.round(1 / enemySpawnRate));
    }
  };
})();
