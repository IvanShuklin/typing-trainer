export class Timer {
  constructor() {
    this.timerId = null;
    this.seconds = 0;
  }

  start() {
    if (this.timerId) {
      return;
    }

    this.timerId = setInterval(() => {
      this.seconds++;
      console.log(`${this.seconds} sec`);
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  reset() {
    this.stop();
    this.seconds = 0;
  }
}
