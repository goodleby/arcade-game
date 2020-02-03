import * as images from 'images';
import {loadImagesFromObj} from 'components/promises';
import {Level} from 'components/level';
import {Player} from 'components/player';

export const Game = (function() {
  const levels = [
    {
      map: ['water', 'stone', 'stone', 'stone', 'stone', 'grass'],
      width: 7,
      options: {
        maxEnemies: 10,
        minEnemySpeed: 0.02, //0.02
        maxEnemySpeed: 0.05,
        enemySpawnRate: 0.04
      }
    }
  ];
  const loadAssets = loadImagesFromObj(images);
  return class Game {
    constructor(canvas, levelIndex, player) {
      this.canvas = canvas;
      this.levelIndex = levelIndex;
      const {map, width, options} = levels[levelIndex];
      this.canvas.width = width * 101;
      this.canvas.height = map.length * 101;
      const ctx = (this.ctx = this.canvas.getContext('2d'));
      loadAssets
        .then(assets => {
          this.assets = assets;
          this.level = new Level(assets, map, width, options);
          this.player =
            player ||
            new Player(
              assets.character,
              Math.floor(this.level.width / 2),
              this.level.height - 1,
              3
            );
          this.loop();
          this.initEventListeners();
        })
        .catch(console.error);
    }
    initEventListeners() {
      document.addEventListener('keydown', e => {
        const {
          player,
          level: {width, height}
        } = this;
        switch (e.keyCode) {
          case 37:
          case 65:
            player.x > 0 && player.moveLeft();
            break;
          case 38:
          case 87:
            player.y > 0 && player.moveUp();
            break;
          case 39:
          case 68:
            player.x < width - 1 && player.moveRight();
            break;
          case 40:
            player.y < height - 1 && player.moveDown();
          case 83:
            break;
        }
      });
    }
    clearField() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    loop() {
      this.clearField();
      this.level.render(this.ctx);
      this.player.render(this.ctx);
      requestAnimationFrame(() => this.loop());
    }
  };
})();
