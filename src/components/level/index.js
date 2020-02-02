import {water, stone, grass} from 'images';
import {loadImages} from 'components/dom';
import {logErr} from 'components/promises';

export const Level = (function() {
  return class Level {
    constructor(ctx, map, width) {
      this.ctx = ctx;
      this.map = map;
      this.width = width;
    }
    init() {
      this.fieldImgs = {water, stone, grass};
      const loadFieldImgs = loadImages(Object.values(this.fieldImgs));
      loadFieldImgs
        .then(images => {
          Object.keys(this.fieldImgs).forEach((item, i) => (this.fieldImgs[item] = images[i]));
          this.drawField();
        })
        .catch(logErr);
    }
    drawField() {
      this.map.forEach((item, y) => {
        this.drawFieldLine(this.fieldImgs[item], y);
      });
    }
    drawFieldLine(img, y) {
      for (let x = 0; x < this.width; x++) {
        this.ctx.drawImage(img, x * 101, y * 80);
      }
    }
  };
})();
