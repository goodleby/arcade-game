export const Player = (function() {
  return class Player {
    constructor(img, hp, x, y) {
      this.img = img;
      this.hp = hp;
      this.x = x;
      this.y = y;
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
    collapse(position) {
      const {x, y} = position;
      this.x = x;
      this.y = y;
      this.hp--;
    }
    heal(amount = 1) {
      this.hp++;
    }
  };
})();
