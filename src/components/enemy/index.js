export const Enemy = (function() {
  return class Enemy {
    constructor(y, speed) {
      this.x = -1;
      this.y = y;
      this.speed = speed;
    }
    move() {
      this.x += this.speed;
    }
    render(img, ctx) {
      this.move();
      ctx.drawImage(img, this.x * 101, this.y * 80 - 20);
    }
  };
})();
