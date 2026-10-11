export class Text {
  constructor(text) {
    this.text = text;
    this.currentIndex = 0;
    this.chars = text.split('').map((char) => ({ char, wrongKeys: [] }));
    this.elements = this.createElements();
  }

  createElements() {
    return this.chars.map(({ char }) => {
      const span = document.createElement('span');

      span.classList.add('char');
      span.textContent = char;

      return span;
    });
  }

  getElements() {
    return this.elements;
  }

  getCurrentElement() {
    if (this.currentIndex >= this.elements.length) {
      return null;
    }
    return this.elements[this.currentIndex];
  }

  getCurrentLetter() {
    return this.text[this.currentIndex];
  }

  getTypedChars() {
    return this.chars.slice(0, this.currentIndex);
  }

  markCurrentCorrect() {
    this.getCurrentElement()?.classList.add('char--typed');
  }

  markCurrentError(key) {
    this.chars[this.currentIndex]?.wrongKeys.push(key);
    this.getCurrentElement()?.classList.add('char--error');
  }

  next() {
    this.currentIndex++;
  }
}
