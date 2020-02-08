import * as images from 'images';
import {loadImagesFromObj} from 'components/promises';
import {getRandNum, getRandBool} from 'components/math';
import {Level} from 'components/level';
import {Player} from 'components/player';
import {Enemy} from 'components/enemy';

export const Game = (function() {
  const loadAssets = loadImagesFromObj(images);
  const defOptions = {
    player: {
      position: {x: 3, y: 5},
      hp: 3
    },
    level: {
      map: [
        {
          type: 'water',
          spawn: false
        },
        {
          type: 'stone',
          spawn: true
        },
        {
          type: 'stone',
          spawn: true
        },
        {
          type: 'stone',
          spawn: true
        },
        {
          type: 'stone',
          spawn: true
        },
        {
          type: 'grass',
          spawn: false
        }
      ],
      width: 7
    },
    enemies: {
      maxAmount: 10,
      maxSpeed: 0.045,
      minSpeed: 0.015,
      spawnRate: 0.045
    }
  };
  return class Game {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.options = {...defOptions, ...options};
      this.level = new Level(this.options.level);
      this.player = new Player(this.options.player);
      this.enemies = [];

      this.canvas.width = this.level.width * 101;
      this.canvas.height = this.level.height * 101;
      this.ctx = canvas.getContext('2d');
      this.paused = false;
      this.score = 0;
      loadAssets
        .then(assets => {
          this.assets = assets;
          this.loop();
          this.initEventListeners();
        })
        .catch(console.error);
    }
    pause() {
      this.paused = true;
    }
    play() {
      this.paused = false;
    }
    clearField() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    readyForNewEnemy() {
      const {maxAmount, spawnRate} = this.options.enemies;
      return maxAmount > this.enemies.length && getRandBool(spawnRate);
    }
    getEnemySpeed() {
      const {minSpeed, maxSpeed} = this.options.enemies;
      return getRandNum(minSpeed * 1000, maxSpeed * 1000) / 1000;
    }
    renderEnemies(img, ctx) {
      if (this.readyForNewEnemy()) {
        this.enemies.push(new Enemy(this.level.getSpawnY(), this.getEnemySpeed()));
      }
      this.enemies = this.enemies.filter(item => item.x < this.level.width);
      this.enemies.forEach(item => item.render(img, ctx));
    }
    collapsePlayer() {
      this.player.collapse(this.options.player.position);
      if (this.player.hp < 1) {
        this.paused = true;
        console.log('You scored ' + this.score);
      }
    }
    checkCollisions() {
      if (
        this.enemies.some(
          item => Math.round(item.x) === this.player.x && item.y === this.player.y
        )
      ) {
        this.collapsePlayer();
      }
    }
    renderHpBar() {
      const startPoint = (this.canvas.width - 30 * this.player.hp) / 2;
      for (let i = 0; i < this.player.hp; i++) {
        this.ctx.drawImage(this.assets.heart, startPoint + 30 * i, 0, 30, 51);
      }
    }
    loop() {
      this.clearField();
      this.level.render(this.assets, this.ctx);
      this.player.render(this.assets.player, this.ctx);
      this.renderEnemies(this.assets.enemy, this.ctx);
      this.checkCollisions();
      this.renderHpBar();
      if (!this.paused) requestAnimationFrame(() => this.loop());
    }
    initEventListeners() {
      document.addEventListener('keydown', e => {
        if (this.paused) return;
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
  };
})();
