import { createMovesCounter } from './edit-HTML';

export default class MovesCounter {
  constructor(amount, where) {
    this.amount = amount;
    this.node = createMovesCounter(where);
  }

  increase() {
    this.amount += 1;
    this.node.innerHTML = this.amount;
  }

  load(newAmount) {
    this.amount = newAmount;
    this.node.innerHTML = this.amount;
  }
}
