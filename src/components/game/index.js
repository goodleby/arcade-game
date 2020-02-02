import {Level} from 'components/level';
import {Player} from 'components/player';

export const Game = (function() {
  const levels = [
    {
      map: ['water', 'stone', 'stone', 'stone', 'stone', 'grass'],
      width: 7
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
      this.level = new Level(ctx, map, width);
      this.player = player || new Player(Math.floor(this.level.width / 2), this.level.height - 1, 3);
      this.start = Promise.all([this.level.ready, this.player.ready]);
      this.start
        .then(() => this.loop())
        .then(() => {
          document.addEventListener('keydown', e => {
            switch (e.keyCode) {
              case 37:
              case 65:
                this.player.x > 0 && this.player.moveLeft();
                break;
              case 38:
              case 87:
                this.player.y > 0 && this.player.moveUp();
                break;
              case 39:
              case 68:
                console.log(this.level.width);
                this.player.x < this.level.width - 1 && this.player.moveRight();
                break;
              case 40:
                console.log(this.level.height);
                this.player.y < this.level.height - 1 && this.player.moveDown();
              case 83:
                break;
            }
          });
        })
        .catch(console.error);
    }
    clearField() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    loop() {
      this.clearField();
      this.level.render();
      this.player.render(this.ctx);
      requestAnimationFrame(() => this.loop());
    }
  };
})();
