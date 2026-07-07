export class Text {
  constructor(text) {
    this.text = text;
    this.currentIndex = 0;
    this.elements = this.createElements();
  }

  createElements() {
    return this.text.split('').map((letter) => {
      const span = document.createElement('span');

      span.classList.add('char');
      span.textContent = letter;

      return span;
    });
  }

  getElements() {
    return this.elements;
  }
}
