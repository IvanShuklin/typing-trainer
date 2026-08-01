import { ignoredKeys, typingText } from './const.js';
import { Text } from './classes/Text.js';
import { Timer } from './classes/Timer.js';
import { Statistics } from './classes/Statistics.js';

const textArea = document.querySelector('.text');
const stats = document.querySelector('.stats');
const minutesElement = stats.querySelector('.minutes');
const secondsElement = stats.querySelector('.seconds');
const errorsElement = stats.querySelector('.errors');
const accuracyElement = stats.querySelector('.accuracy');
const wpmElement = stats.querySelector('.wpm');

const text = new Text(typingText);
const timer = new Timer(() => {
  const time = timer.getTime();

  minutesElement.textContent = String(time.minutes).padStart(2, '0');
  secondsElement.textContent = String(time.seconds).padStart(2, '0');
});
const statistics = new Statistics();

textArea.append(...text.getElements());

function renderErrors() {
  errorsElement.textContent = statistics.getErrors();
}

function renderAccuracy() {
  accuracyElement.textContent = statistics.getAccuracy();
}

function renderWPM() {
  wpmElement.textContent = statistics.getWPM(timer.getSeconds());
}

function renderStatistics() {
  renderErrors();
  renderAccuracy();
  renderWPM();
}

if (text.getCurrentElement()) {
  text.getCurrentElement().classList.add('char--current');
}

document.addEventListener('keydown', (event) => {
  const currentElement = text.getCurrentElement();

  if (!currentElement) return;

  if (ignoredKeys.includes(event.key)) {
    return;
  }

  if (event.key === text.getCurrentLetter()) {
    timer.start();
    statistics.addCorrect();
    renderStatistics();

    currentElement.classList.remove('char--current');

    text.next();

    const nextElement = text.getCurrentElement();

    if (nextElement) {
      nextElement.classList.add('char--current');
    } else {
      timer.stop();
    }
  } else {
    statistics.addError();
    renderStatistics();
  }
});
