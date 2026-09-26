import { TIMER_TICK_INTERVAL } from '../const.js';

export class Timer {
  constructor(onTick, onFinish) {
    this.onTick = onTick;
    this.onFinish = onFinish;

    this.timerId = null;
    this.startTime = null;
    this.stopTime = null;
    this.remainingSeconds = 0;
    this.duration = 0;
  }

  start(duration) {
    if (this.timerId || duration <= 0) {
      return;
    }

    this.duration = duration;
    this.remainingSeconds = duration;
    this.startTime = Date.now();
    this.stopTime = null;

    this.onTick(this.remainingSeconds);

    this.timerId = setInterval(() => {
      this.tick();
    }, TIMER_TICK_INTERVAL);
  }

  tick() {
    const remainingSeconds = Math.max(
      this.duration - Math.floor(this.getSeconds()),
      0,
    );

    if (remainingSeconds === this.remainingSeconds) {
      return;
    }

    this.remainingSeconds = remainingSeconds;
    this.onTick(this.remainingSeconds);

    if (this.remainingSeconds <= 0) {
      this.stop();
      this.onFinish();
    }
  }

  stop() {
    if (!this.timerId) {
      return;
    }

    clearInterval(this.timerId);
    this.timerId = null;
    this.stopTime = Date.now();
  }

  reset() {
    this.stop();
    this.startTime = null;
    this.stopTime = null;
    this.remainingSeconds = 0;
    this.duration = 0;
  }

  getSeconds() {
    if (this.startTime === null) {
      return 0;
    }

    const endTime = this.stopTime ?? Date.now();
    const elapsedSeconds = (endTime - this.startTime) / 1000;

    return Math.min(elapsedSeconds, this.duration);
  }

  getRemainingSeconds() {
    return this.remainingSeconds;
  }
}
