import * as images from 'images';
import {loadImagesFromObj} from 'components/promises';
import {getRandNum, getRandBool} from 'components/math';
import {Level} from 'components/level';
import {Player} from 'components/player';
import {Enemy} from 'components/enemy';
import {Heart} from 'components/bonus';

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
      minSpeed: 0.015,
      maxSpeed: 0.045,
      spawnPerFrames: 48
    },
    bonuses: {
      maxAmount: 2,
      spawnPerFrames: 900,
      minTimer: 3000,
      maxTimer: 5000,
      types: [Heart]
    }
  };
  return class Game {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.options = {...defOptions, ...options};
      this.level = new Level(this.options.level);
      this.player = new Player(this.options.player);
      this.enemies = [];
      this.bonuses = [];
      this.goals = [
        {
          expectingY: 0,
          playerPos: {x: Math.floor(this.level.width / 2), y: this.level.height - 1}
        },
        {
          expectingY: this.level.height - 1,
          playerPos: {x: Math.floor(this.level.width / 2), y: 0}
        }
      ];

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
      const {maxAmount, spawnPerFrames} = this.options.enemies;
      return maxAmount > this.enemies.length && getRandBool(spawnPerFrames);
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
    checkCollisions() {
      const {x, y} = this.player;
      if (this.enemies.some(item => Math.round(item.x) === x && item.y === y)) {
        this.collapsePlayer();
      }
    }
    collapsePlayer() {
      this.player.collapse(this.options.player.position);
      if (this.player.hp < 1) {
        this.paused = true;
        console.log(`You scored ${this.score}. Way to go!`);
      }
    }
    readyForNewBonus() {
      const {maxAmount, spawnPerFrames} = this.options.bonuses;
      return maxAmount > this.bonuses.length && getRandBool(spawnPerFrames);
    }
    renderBonuses(assets, ctx) {
      if (this.readyForNewBonus()) {
        const {x, y} = this.level.getSpawnPos();
        const {minTimer, maxTimer, types} = this.options.bonuses;
        this.bonuses.push(
          new types[getRandNum(types.length)](x, y, getRandNum(minTimer, maxTimer))
        );
      }
      this.bonuses = this.bonuses.filter(item => item.available);
      this.bonuses.forEach(item => item.render(assets[item.imgTag], ctx));
    }
    checkPickUps() {
      const {x, y} = this.player;
      this.bonuses.forEach(item => {
        if (item.x === x && item.y === y) {
          item.pickUp(this);
        }
      });
    }
    applyGoals() {
      if (this.player.y === this.goals[0].expectingY) {
        this.goals.push(this.goals.shift());
        this.options.player.position = this.goals[0].playerPos;
        this.evolve();
        this.score += 10;
        console.log(
          `Current score is ${this.score}. Now go back to ${
            this.level.map[this.goals[0].expectingY].type
          }`
        );
      }
    }
    evolve() {
      this.options.enemies.maxAmount += 0.25;
      this.options.enemies.minSpeed += 0.002;
      this.options.enemies.maxSpeed += 0.002;
      this.options.enemies.spawnPerFrames -= 2;
      this.options.bonuses.minTimer += 100;
      this.options.bonuses.maxTimer += 100;
    }
    renderHpBar() {
      const startPoint = (this.canvas.width - 30 * this.player.hp) / 2;
      for (let i = 0; i < this.player.hp; i++) {
        this.ctx.drawImage(this.assets.heart, startPoint + 30 * i, -10, 30, 51);
      }
    }
    loop() {
      this.clearField();
      this.level.render(this.assets, this.ctx);
      this.renderEnemies(this.assets.enemy, this.ctx);
      this.renderBonuses(this.assets, this.ctx);
      this.player.render(this.assets.player, this.ctx);
      this.checkCollisions();
      this.checkPickUps();
      this.applyGoals();
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
