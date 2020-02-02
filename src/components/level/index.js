import {water, stone, grass} from 'images';
import {loadImages} from 'components/promises';

export const Level = (function() {
  const fieldImgs = {water, stone, grass};
  const loadAssets = loadImages(Object.values(fieldImgs));
  return class Level {
    constructor(ctx, map, width) {
      this.ctx = ctx;
      this.map = map;
      this.width = width;
      this.height = this.map.length;
      this.fieldImgs = fieldImgs;
      loadAssets
        .then(images => {
          Object.keys(fieldImgs).forEach((item, i) => (this.fieldImgs[item] = images[i]));
        })
        .catch(console.error);
      this.ready = Promise.all([loadAssets]);
    }
    renderLine(img, y) {
      for (let x = 0; x < this.width; x++) {
        this.ctx.drawImage(img, x * 101, y * 80);
      }
    }
    render() {
      this.map.forEach((item, y) => this.renderLine(this.fieldImgs[item], y));
    }
  };
})();
