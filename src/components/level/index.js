import {getRandBool, getRandNum} from 'components/math';
import {Enemy} from '../enemy';
// import {Enemy} from 'components/enemy';

export const Level = (function() {
  const defOptions = {
    maxEnemies: 10,
    minEnemySpeed: 0.05,
    maxEnemySpeed: 0.1,
    enemySpawnRate: 0.04,
    spawnYFrom: 1,
    spawnYTo: 4
  };
  return class Level {
    constructor(assets, map, width, options = {}) {
      this.assets = assets;
      this.map = map;
      this.width = width;
      this.height = this.map.length;
      this.options = {...defOptions, ...options};
      this.enemies = [];
    }
    renderEnemies(ctx) {
      const {maxEnemies, enemySpawnRate} = this.options;
      if (this.enemies.length < maxEnemies) {
        if (getRandBool(1, Math.round(enemySpawnRate * 100))) {
          this.enemies.push(new Enemy(this.assets.enemy, this.getSpawnY(), this.getSpeed()));
        }
      }
      this.enemies.forEach((item, i) => {
        item.render(ctx);
        if (item.x > this.width) this.enemies.splice(i, 1);
      });
      for (let i = 0; i < this.enemies.length; i++) {
        const item = this.enemies[i];
        item.render(ctx);
        if (item.x > this.width) this.enemies.splice(i--, 1);
      }
    }
    renderLine(ctx, img, y) {
      for (let x = 0; x < this.width; x++) {
        ctx.drawImage(img, x * 101, y * 80);
      }
    }
    render(ctx) {
      this.map.forEach((item, y) => this.renderLine(ctx, this.assets[item], y));
      this.renderEnemies(ctx);
    }
    getSpawnY() {
      const {spawnYFrom, spawnYTo} = this.options;
      return getRandNum(spawnYFrom, spawnYTo);
    }
    getSpeed() {
      const {minEnemySpeed, maxEnemySpeed} = this.options;
      return (
        getRandNum(Math.round(minEnemySpeed * 100), Math.round(maxEnemySpeed * 100)) / 100
      );
    }
  };
})();
