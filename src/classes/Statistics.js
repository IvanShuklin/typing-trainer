export class Statistics {
  constructor() {
    this.errors = 0;
    this.correct = 0;
  }

  addCorrect() {
    this.correct++;
  }

  addError() {
    this.errors++;
  }

  getErrors() {
    return this.errors;
  }

  getAccuracy() {
    const total = this.correct + this.errors;

    if (total === 0) {
      return 100;
    }

    return Math.floor((this.correct / total) * 100);
  }

  getWPM(seconds) {
    if (seconds === 0) {
      return 0;
    }

    return Math.floor(this.correct / 5 / (seconds / 60));
  }
}
