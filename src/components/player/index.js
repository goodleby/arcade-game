export const Player = (function() {
  return class Player {
    constructor(options) {
      const {
        position: {x, y},
        hp
      } = options;
      this.x = x;
      this.y = y;
      this.hp = hp;
    }
    render(img, ctx) {
      ctx.drawImage(img, this.x * 101, this.y * 80 - 20);
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
    setPos({x, y}) {
      this.x = x;
      this.y = y;
    }
    collapse(position) {
      this.setPos(position);
      this.hp--;
    }
    heal(amount = 1) {
      this.hp += amount;
    }
  };
})();
