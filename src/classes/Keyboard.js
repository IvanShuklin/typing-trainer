export class Keyboard {
  constructor(element) {
    this.element = element;

    const keys = Array.from(element.querySelectorAll('.keyboard__key'));
    const entries = keys.map((key) => {
      return [key.dataset.code, key];
    });

    this.keysMap = new Map(entries);
  }

  highlight(code) {
    const keyElement = this.keysMap.get(code);

    if (!keyElement) {
      return;
    }

    keyElement.classList.add('keyboard__key--typed');
  }

  unhighlight(code) {
    const keyElement = this.keysMap.get(code);

    if (!keyElement) {
      return;
    }

    keyElement.classList.remove('keyboard__key--typed');
  }

  unhighlightAll() {
    this.keysMap.forEach((keyElement) => {
      keyElement.classList.remove('keyboard__key--typed');
    });
  }
}
