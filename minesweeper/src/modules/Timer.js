import { createTimer } from './edit-HTML';

export default class Timer {
  constructor(where) {
    this.node = createTimer(where);
    this.timerId = null;
    this.startTime = null;
  }

  start() {
    // this.startTime = new Date();
    this.timerId = setInterval(() => {
      // const currentTime = new Date();
      // const secondsPassed = Math.floor((currentTime - this.startTime) / 1000);
      // this.node.innerHTML = secondsPassed;
      // console.log(secondsPassed);
      this.node.innerHTML = +this.node.innerHTML + 1;
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    console.log('stop');
  }

  load(newStart) {
    this.node.innerHTML = newStart;
  }
}
