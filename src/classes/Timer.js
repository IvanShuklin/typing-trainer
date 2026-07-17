export class Timer {
  constructor(onTick) {
    this.onTick = onTick;

    this.timerId = null;
    this.seconds = 0;
  }

  start() {
    if (this.timerId) {
      return;
    }

    this.timerId = setInterval(() => {
      this.seconds++;
      this.onTick(this.seconds);
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

  getSeconds() {
    return this.seconds;
  }
}
