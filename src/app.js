import { typingText } from './const.js';
import { Text } from './classes/Text.js';
import { Timer } from './classes/Timer.js';
import { Statistics } from './classes/Statistics.js';

const textArea = document.querySelector('.text');
const stats = document.querySelector('.stats');
const secondsElement = stats.querySelector('.seconds');
const errorsElement = stats.querySelector('.errors');

const text = new Text(typingText);
const timer = new Timer((seconds) => {
  secondsElement.textContent = String(seconds).padStart(2, '0');
});
const statistics = new Statistics();

textArea.append(...text.getElements());

function renderErrors() {
  errorsElement.textContent = statistics.getErrors();
}

if (text.getCurrentElement()) {
  text.getCurrentElement().classList.add('char--current');
}

document.addEventListener('keydown', (event) => {
  const currentElement = text.getCurrentElement();

  if (!currentElement) return;

  if (event.key === text.getCurrentLetter()) {
    timer.start();
    statistics.addCorrect();

    currentElement.classList.remove('char--current');

    text.next();

    const nextElement = text.getCurrentElement();

    if (nextElement) {
      nextElement.classList.add('char--current');
    } else {
      timer.stop();
      console.log('Finish!');
    }
  } else {
    statistics.addError();
    renderErrors();
  }
});
