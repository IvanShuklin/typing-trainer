export class History {
  constructor(element) {
    this.element = element;
    this.texts = [];
  }

  add(chars) {
    if (chars.length === 0) {
      return;
    }

    this.texts.push(chars);
  }

  clear() {
    this.texts = [];
    this.element.replaceChildren();
  }

  render() {
    const paragraphs = this.texts.map((chars) => {
      const paragraph = document.createElement('p');

      paragraph.classList.add('history__text');
      paragraph.append(...chars.map(createCharElement));

      return paragraph;
    });

    this.element.replaceChildren(...paragraphs);
    this.element.scrollTop = 0;
  }
}

function createCharElement({ char, wrongKeys }) {
  const span = document.createElement('span');

  span.classList.add('char');
  span.textContent = char;

  if (wrongKeys.length === 0) {
    span.classList.add('char--typed');
    return span;
  }

  const typedKeys = wrongKeys.map((key) => (key === ' ' ? 'Space' : key));

  span.classList.add('char--error');
  span.title = `Typed: ${typedKeys.join(', ')}`;

  return span;
}
