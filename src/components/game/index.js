import * as images from 'images';
import {getRandBool} from 'components/math';
import {loadImagesFromObj} from 'components/promises';
import {Level} from 'components/level';
import {Player} from 'components/player';
import {Enemy} from 'components/enemy';
import {Goal} from 'components/goal';

export const Game = (function() {
  const levelOptions = {
    playerPos: {x: 3, y: 5},
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
    width: 7,
    enemiesOptions: {
      maxAmount: 10,
      maxSpeed: 0.045,
      minSpeed: 0.015,
      spawnRate: 0.045
    }
  };
  const loadAssets = loadImagesFromObj(images);
  return class Game {
    constructor(canvas, player) {
      this.canvas = canvas;
      const {map, width} = levelOptions;
      this.canvas.width = width * 101;
      this.canvas.height = map.length * 101;
      this.ctx = canvas.getContext('2d');
      this.enemies = [];
      const goals = [
        new Goal(
          [
            [
              {x: 0, y: 0},
              {x: 1, y: 0},
              {x: 2, y: 0},
              {x: 3, y: 0},
              {x: 4, y: 0},
              {x: 5, y: 0},
              {x: 6, y: 0}
            ]
          ],
          () => {
            this.level.evolve();
            this.currentGoal = goals[1];
            this.level.setSpawnPos({x: 3, y: 0});
          }
        ),
        new Goal(
          [
            [
              {x: 0, y: 5},
              {x: 1, y: 5},
              {x: 2, y: 5},
              {x: 3, y: 5},
              {x: 4, y: 5},
              {x: 5, y: 5},
              {x: 6, y: 5}
            ]
          ],
          () => {
            this.level.evolve();
            this.currentGoal = goals[0];
            this.level.setSpawnPos({x: 3, y: 5});
          }
        )
      ];
      this.currentGoal = goals[0];
      loadAssets
        .then(assets => {
          this.assets = assets;
          this.level = new Level(assets, levelOptions);
          const {x, y} = levelOptions.playerPos;
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
      if (this.level.needEnemy(this.enemies.length)) {
        this.enemies.push(
          new Enemy(this.assets.enemy, this.level.getSpawnY(), this.level.getEnemySpeed())
        );
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
        this.player.collapse(this.level.playerPos);
        this.currentGoal.reset();
      }
    }
    loop() {
      this.clearField();
      this.level.render(this.ctx);
      this.player.render(this.ctx);
      this.renderEnemies(this.ctx);
      this.checkCollisions();
      this.currentGoal.checkRequirements(this.player);
      requestAnimationFrame(() => this.loop());
    }
  };
})();
