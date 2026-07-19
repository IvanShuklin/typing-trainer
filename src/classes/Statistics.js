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
}
