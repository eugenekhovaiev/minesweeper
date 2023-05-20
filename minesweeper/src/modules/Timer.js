import { createTimer } from './edit-HTML';

export default class Timer {
  constructor(where) {
    this.node = createTimer(where);
    this.timerId = null;
    this.startTime = null;
  }

  start() {
    this.timerId = setInterval(() => {
      this.node.innerHTML = +this.node.innerHTML + 1;
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  load(newStart) {
    this.node.innerHTML = newStart;
  }
}
