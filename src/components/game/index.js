import {Level} from 'components/level';
export const Game = (function() {
  const levels = [
    {
      map: ['water', 'stone', 'stone', 'stone', 'stone', 'grass'],
      width: 7
    }
  ];
  return class Game {
    constructor(canvas, levelIndex) {
      this.canvas = canvas;
      this.levelIndex = levelIndex;
      const {map, width} = levels[levelIndex];
      this.canvas.width = width * 101;
      this.canvas.height = map.length * 101;
      const ctx = (this.ctx = this.canvas.getContext('2d'));
      this.level = new Level(ctx, map, width);
      this.level.init();
    }
  };
})();
