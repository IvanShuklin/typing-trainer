export class Timer {
  constructor(onTick, onFinish) {
    this.onTick = onTick;
    this.onFinish = onFinish;

    this.timerId = null;
    this.elapsedSeconds = 0;
    this.remainingSeconds = 0;
    this.duration = 0;
  }

  start(duration) {
    if (this.timerId || duration <= 0) {
      return;
    }

    this.duration = duration;
    this.remainingSeconds = duration;
    this.elapsedSeconds = 0;

    this.onTick(this.remainingSeconds);

    this.timerId = setInterval(() => {
      this.remainingSeconds--;
      this.elapsedSeconds++;

      this.onTick(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        this.stop();
        this.onFinish();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  reset() {
    this.stop();
    this.elapsedSeconds = 0;
    this.remainingSeconds = 0;
    this.duration = 0;
  }

  getSeconds() {
    return this.elapsedSeconds;
  }

  getRemainingSeconds() {
    return this.remainingSeconds;
  }
}
