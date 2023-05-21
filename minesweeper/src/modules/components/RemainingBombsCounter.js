import { createBombsCounter } from '../edit-HTML';

export default class RemainingBombsCounter {
  constructor(amount, where) {
    this.amount = amount;
    this.node = createBombsCounter(where);
  }

  increase() {
    this.amount += 1;
    this.node.innerHTML = this.amount;
  }

  decrease() {
    this.amount -= 1;
    this.node.innerHTML = this.amount;
  }

  load(newAmount) {
    this.amount = newAmount;
    this.node.innerHTML = this.amount;
  }
}
