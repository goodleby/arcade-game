import {bug} from 'images';
import {loadImage} from 'components/promises';

export const Enemy = (function() {
  const loadAssets = loadImage(bug);
  class Enemy {
    constructor(y, speed) {
      loadAssets.then(img => (this.img = img, console.log('hi')));
      console.log(loadAssets);
      this.y = y;
      this.x = -1;
      this.speed = speed;
    }
    move() {
      this.x += this.speed;
    }
    render(ctx) {
      this.move();
      ctx.drawImage(this.img, this.x * 101, this.y * 80 - 20);
    }
  }
  Enemy.ready = loadAssets;
  return Enemy;
})();
