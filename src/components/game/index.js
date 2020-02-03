import {Level} from 'components/level';
import {Player} from 'components/player';

export const Game = (function() {
  const levels = [
    {
      map: ['water', 'stone', 'stone', 'stone', 'stone', 'grass'],
      width: 7,
      options: {
        maxEnemies: 10,
        minEnemySpeed: 0.05,
        maxEnemySpeed: 0.2,
        enemySpawnRate: 0.04
      }
    }
  ];
  return class Game {
    constructor(canvas, levelIndex, player) {
      this.canvas = canvas;
      this.levelIndex = levelIndex;
      const {map, width} = levels[levelIndex];
      this.canvas.width = width * 101;
      this.canvas.height = map.length * 101;
      const ctx = (this.ctx = this.canvas.getContext('2d'));
      this.level = new Level(map, width);
      this.player =
        player || new Player(Math.floor(this.level.width / 2), this.level.height - 1, 3);
      this.start = Promise.all([Level.ready, Player.ready]);
      this.start.then(() => {
        console.log('Game is starting');
        console.log(this.player.img);
        console.log(this.level.assets);
      });
      this.start
        .then(() => this.loop())
        .then(() => {
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
          document.addEventListener('keydown', e => {
            e.keyCode === 32 && this.loop();
          });
        })
        .catch(console.error);
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
