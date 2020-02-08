import {getRandNum} from 'components/math';

export const Level = (function() {
  return class Level {
    constructor(options) {
      const {map, width} = options;
      this.map = map.map((item, i) => ({y: i, ...item}));
      this.height = map.length;
      this.width = width;
    }
    renderLine(ctx, img, y) {
      for (let x = 0; x < this.width; x++) {
        ctx.drawImage(img, x * 101, y * 80);
      }
    }
    render(assets, ctx) {
      this.map.forEach((item, y) => this.renderLine(ctx, assets[item.type], y));
    }
    getSpawnY() {
      const spawnArea = this.map.filter(item => item.spawn);
      return spawnArea[getRandNum(spawnArea.length)].y;
    }
    getSpawnX() {
      return getRandNum(0, this.width - 1);
    }
    getSpawnPos() {
      return {x: this.getSpawnX(), y: this.getSpawnY()};
    }
  };
})();
