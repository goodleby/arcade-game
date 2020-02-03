import {getRandNum} from 'components/math';

export const Level = (function() {
  return class Level {
    constructor(assets, map, width, playerPos, spawnArea, enemiesOptions) {
      this.assets = assets;
      this.map = map;
      this.height = map.length;
      this.width = width;
      this.playerPos = playerPos;
      this.spawnArea = spawnArea;
      this.enemiesOptions = enemiesOptions;
      this.enemies = [];
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
    getSpeed() {
      const {minEnemySpeed, maxEnemySpeed} = this.enemiesOptions;
      return (
        getRandNum(Math.round(minEnemySpeed * 100), Math.round(maxEnemySpeed * 100)) / 100
      );
    }
  };
})();
