import {Bonus} from './bonus';
export const Heart = (function() {
  return class Heart extends Bonus {
    constructor(x, y, duration) {
      super(x, y, duration, 'heart');
    }
    pickUp(game) {
      game.player.heal(1);
      this.unavailable();
    }
  };
})();
