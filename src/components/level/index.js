import {getRandNum, getRandBool} from 'components/math';

export const Level = (function() {
  return class Level {
    constructor(assets, levelOptions) {
      this.assets = assets;
      const {map, width, playerPos, enemiesOptions} = levelOptions;
      this.map = map.map((item, i) => ({y: i, ...item}));
      this.height = map.length;
      this.width = width;
      this.playerPos = playerPos;
      this.enemiesOptions = enemiesOptions;
    }
    evolve() {
      const {maxAmount, maxSpeed, minSpeed, spawnRate} = this.enemiesOptions;
      this.enemiesOptions.maxAmount += 0.25;
      this.enemiesOptions.maxSpeed += 0.005;
      this.enemiesOptions.minSpeed += 0.005;
      this.enemiesOptions.spawnRate += 0.005;
    }
    renderLine(ctx, img, y) {
      for (let x = 0; x < this.width; x++) {
        ctx.drawImage(img, x * 101, y * 80);
      }
    }
    render(ctx) {
      this.map.forEach((item, y) => this.renderLine(ctx, this.assets[item.type], y));
    }
    getSpawnY() {
      const spawnArea = this.map.filter(item => item.spawn);
      return spawnArea[getRandNum(spawnArea.length)].y;
    }
    getEnemySpeed() {
      const {minSpeed, maxSpeed} = this.enemiesOptions;
      return getRandNum(Math.round(minSpeed * 1000), Math.round(maxSpeed * 1000)) / 1000;
    }
    needEnemy(amountOfEnemies) {
      const {maxAmount, spawnRate} = this.enemiesOptions;
      return amountOfEnemies < maxAmount && getRandBool(1, Math.round(1 / spawnRate));
    }
    setSpawnPos(position) {
      this.playerPos = position;
    }
  };
})();
