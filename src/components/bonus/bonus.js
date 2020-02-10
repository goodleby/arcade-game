export const Bonus = (function() {
  return class Bonus {
    constructor(x, y, duration, imgTag) {
      this.x = x;
      this.y = y;
      this.duration = duration;
      this.imgTag = imgTag;
      this.available = true;
      setTimeout(() => {
        this.unavailable();
      }, this.duration);
    }
    unavailable() {
      this.available = false;
    }
    render(img, ctx) {
      ctx.drawImage(img, this.x * 101, this.y * 80 - 20);
    }
  };
})();
