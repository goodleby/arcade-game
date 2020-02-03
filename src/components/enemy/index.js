export const Enemy = (function() {
  return class Enemy {
    constructor(img, y, speed) {
      this.img = img;
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
  };
})();
