import {Bonus} from './bonus';
export class Heart extends Bonus {
  constructor(x, y, duration) {
    super(x, y, duration, 'heart');
  }
  pickUp(game) {
    game.player.heal(1);
    this.unavailable();
  }
}
