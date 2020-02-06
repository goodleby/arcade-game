export const Goal = (function() {
  return class Goal {
    constructor(requirements, success) {
      this.requirements = requirements;
      this.success = success;
      this.status = 0;
    }
    checkRequirements(player) {
      if (
        this.requirements[this.status].some(item => item.x === player.x && item.y === player.y)
      ) {
        if (this.requirements.length === this.status + 1) {
          this.success();
        } else {
          this.status++;
        }
      }
    }
    reset() {
      this.status = 0;
    }
  };
})();
