export const Player = (function() {
  return class Player {
    constructor(img, x, y, lifes) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.lifes = lifes;
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
  };
})();
