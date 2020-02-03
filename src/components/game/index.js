import * as images from 'images';
import {getRandBool} from 'components/math';
import {loadImagesFromObj} from 'components/promises';
import {Level} from 'components/level';
import {Player} from 'components/player';
import {Enemy} from 'components/enemy';

export const Game = (function() {
  const levels = [
    {
      map: ['water', 'stone', 'stone', 'stone', 'stone', 'grass'],
      width: 7,
      playerPos: {
        x: 3,
        y: 5
      },
      spawnArea: {
        from: 1,
        to: 4
      },
      enemiesOptions: {
        maxEnemies: 10,
        minEnemySpeed: 0.02,
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
      const {map, width, playerPos, spawnArea, enemiesOptions} = levels[levelIndex];
      this.canvas.width = width * 101;
      this.canvas.height = map.length * 101;
      const ctx = (this.ctx = canvas.getContext('2d'));
      this.enemies = [];
      loadAssets
        .then(assets => {
          this.assets = assets;
          this.level = new Level(assets, map, width, playerPos, spawnArea, enemiesOptions);
          const {x, y} = playerPos;
          this.player = player || new Player(assets.character, 3, x, y);
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
    renderEnemies(ctx) {
      const {maxEnemies, enemySpawnRate} = this.level.enemiesOptions;
      if (this.enemies.length < maxEnemies) {
        if (getRandBool(1, Math.round(enemySpawnRate * 100))) {
          this.enemies.push(
            new Enemy(this.assets.enemy, this.level.getSpawnY(), this.level.getSpeed())
          );
        }
      }
      for (let i = 0; i < this.enemies.length; i++) {
        const item = this.enemies[i];
        item.render(ctx);
        if (item.x > this.level.width) this.enemies.splice(i--, 1);
      }
    }
    clearField() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    checkCollisions() {
      if (
        this.enemies.some(
          item => Math.round(item.x) === this.player.x && item.y === this.player.y
        )
      ) {
        this.player.collapse(this.level);
      }
    }
    loop() {
      this.clearField();
      this.level.render(this.ctx);
      this.player.render(this.ctx);
      this.renderEnemies(this.ctx);
      this.checkCollisions();
      requestAnimationFrame(() => this.loop());
    }
  };
})();
