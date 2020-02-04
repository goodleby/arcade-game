export const Player = (function() {
  return class Player {
    constructor(img, lifes, x, y) {
      this.img = img;
      this.lifes = lifes;
      this.x = x || 0;
      this.y = y || 0;
    }
    setPos(x, y) {
      this.x = x;
      this.y = y;
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
    collapse() {
      this.x = 0;
      this.y = 0;
      this.hp--;
    }
  };
})();
