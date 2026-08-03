export class Keyboard {
  constructor(element) {
    this.element = element;

    const keys = Array.from(element.querySelectorAll('.keyboard__key'));
    const entries = keys.map((key) => {
      return [key.dataset.key, key];
    });

    this.keysMap = new Map(entries);
  }
  highlight(key) {
    const keyElement = this.keysMap.get(key);

    if (!keyElement) {
      return;
    }

    keyElement.classList.add('keyboard__key--typed');
  }

  unhighlight(key) {
    const keyElement = this.keysMap.get(key);

    if (!keyElement) {
      return;
    }

    keyElement.classList.remove('keyboard__key--typed');
  }
}
