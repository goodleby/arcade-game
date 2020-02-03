import {character} from 'images';
import {loadImage} from 'components/promises';

export const Player = (function() {
  const loadAssets = loadImage(character);
  class Player {
    constructor(x, y, lifes) {
      this.x = x;
      this.y = y;
      this.lifes = lifes;
      loadAssets.then(img => ((this.img = img), console.log('Player img is loaded')));
    }
    render(ctx) {
      ctx.drawImage(this.img, this.x * 101, this.y * 80 - 20);
    }
    move(direction) {
      switch (direction) {
        case 'left':
          this.x--;
          break;
        case 'up':
          this.y--;
          break;
        case 'right':
          this.x++;
          break;
        case 'down':
          this.y++;
          break;
      }
    }
    moveLeft() {
      this.move('left');
    }
    moveUp() {
      this.move('up');
    }
    moveRight() {
      this.move('right');
    }
    moveDown() {
      this.move('down');
    }
  }
  Player.ready = loadAssets;
  return Player;
})();
