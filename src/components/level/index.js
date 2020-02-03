import {water, stone, grass} from 'images';
import {getRandBool, getRandNum} from 'components/math';
import {loadImages} from 'components/promises';
// import {Enemy} from 'components/enemy';

export const Level = (function() {
  const assets = {water, stone, grass};
  const loadAssets = loadImages(Object.values(assets));
  const defOptions = {
    maxEnemies: 10,
    minEnemySpeed: 0.05,
    maxEnemySpeed: 0.2,
    enemySpawnRate: 0.04,
    spawnYFrom: 1,
    spawnYTo: 4
  };
  class Level {
    constructor(map, width, options = {}) {
      this.map = map;
      this.width = width;
      this.height = this.map.length;
      this.options = {...defOptions, ...options};
      // this.enemies = [];
      this.assets = assets;
      loadAssets
        .then(images => {
          Object.keys(assets).forEach((item, i) => (this.assets[item] = images[i]));
          console.log('Player assets are loaded');
        })
        .catch(console.error);
    }
    // renderEnemies(ctx) {
    //   const {
    //     minEnemySpeed,
    //     maxEnemySpeed,
    //     enemySpawnRate,
    //     spawnYFrom,
    //     spawnYTo
    //   } = this.options;
    //   if (
    //     this.enemies.length < this.options.maxEnemies &&
    //     getRandBool(1, Math.round(enemySpawnRate * 100))
    //   ) {
    //     this.enemies.push(
    //       new Enemy(
    //         getRandNum(spawnYFrom, spawnYTo),
    //         getRandNum(Math.round(minEnemySpeed * 100), Math.round(maxEnemySpeed * 100)) / 100
    //       )
    //     );
    //   }
    //   this.enemies.forEach(item => item.render(ctx));
    //   if (this.enemies.length < 20) {
    //     this.enemies.push(1);
    //     console.log(new Enemy(2, 0.1).img);
    //   }
    // }
    renderLine(ctx, img, y) {
      for (let x = 0; x < this.width; x++) {
        ctx.drawImage(img, x * 101, y * 80);
      }
    }
    render(ctx) {
      this.map.forEach((item, y) => this.renderLine(ctx, this.assets[item], y));
      // this.renderEnemies(ctx);
    }
  }
  Level.ready = loadAssets;
  return Level;
})();
