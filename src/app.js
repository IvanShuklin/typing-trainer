import { typingText } from './const.js';
import { Text } from './classes/Text.js';
import { Timer } from './classes/Timer.js';

const textArea = document.querySelector('.text');
const text = new Text(typingText);
const timer = new Timer();

textArea.append(...text.getElements());

if (text.getCurrentElement()) {
  text.getCurrentElement().classList.add('char--current');
}

document.addEventListener('keydown', (event) => {
  const currentElement = text.getCurrentElement();

  if (!currentElement) return;

  if (event.key === text.getCurrentLetter()) {
    timer.start();

    currentElement.classList.remove('char--current');

    text.next();

    const nextElement = text.getCurrentElement();

    if (nextElement) {
      nextElement.classList.add('char--current');
    } else {
      timer.stop();
      console.log('Finish!');
    }
  }
});
