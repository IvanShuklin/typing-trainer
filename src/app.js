import { typingText } from './const.js';
import { Text } from './text.js';

const textArea = document.querySelector('.text');
const text = new Text(typingText);

textArea.append(...text.getElements());

if (text.getCurrentElement()) {
  text.getCurrentElement().classList.add('char--current');
}

document.addEventListener('keydown', (event) => {
  const currentElement = text.getCurrentElement();

  if (!currentElement) return;

  if (event.key === text.getCurrentLetter()) {
    currentElement.classList.remove('char--current');

    text.next();

    const nextElement = text.getCurrentElement();

    if (nextElement) {
      nextElement.classList.add('char--current');
    } else {
      console.log('Finish!');
    }
  }
});
