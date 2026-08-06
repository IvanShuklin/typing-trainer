import { ignoredKeys, typingText } from '../const.js';
import { Text } from '../classes/Text.js';
import { Timer } from '../classes/Timer.js';
import { Statistics } from '../classes/Statistics.js';
import { Keyboard } from '../classes/Keyboard.js';

export class App {
  constructor() {
    this.textArea = document.querySelector('.text');
    this.stats = document.querySelector('.stats');
    this.minutesElement = this.stats.querySelector('.minutes');
    this.secondsElement = this.stats.querySelector('.seconds');
    this.errorsElement = this.stats.querySelector('.errors');
    this.accuracyElement = this.stats.querySelector('.accuracy');
    this.wpmElement = this.stats.querySelector('.wpm');

    this.text = new Text(typingText);
    this.timer = new Timer((seconds) => {
      const minutes = Math.floor(seconds / 60);

      this.minutesElement.textContent = String(minutes).padStart(2, '0');
      this.secondsElement.textContent = String(seconds % 60).padStart(2, '0');
    });
    this.statistics = new Statistics();
    this.keyboard = new Keyboard(document.querySelector('.keyboard'));

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.started = false;
    this.finished = false;
  }

  init() {
    this.renderText();
    this.highlightCurrentLetter();
    this.addListeners();
  }

  renderText() {
    this.textArea.append(...this.text.getElements());
  }

  updateErrors() {
    this.errorsElement.textContent = this.statistics.getErrors();
  }

  updateAccuracy() {
    this.accuracyElement.textContent = this.statistics.getAccuracy();
  }

  updateWPM() {
    this.wpmElement.textContent = this.statistics.getWPM(
      this.timer.getSeconds(),
    );
  }

  updateFinalStatistics() {
    this.updateAccuracy();
    this.updateWPM();
  }

  start() {
    this.started = true;
    this.timer.start();
  }

  highlightCurrentLetter() {
    const currentElement = this.text.getCurrentElement();

    if (!currentElement) {
      return;
    }

    currentElement.classList.add('char--current');
  }

  unhighlightCurrentLetter() {
    const currentElement = this.text.getCurrentElement();

    if (!currentElement) {
      return;
    }

    currentElement.classList.remove('char--current');
  }

  moveToNextLetter() {
    this.unhighlightCurrentLetter();
    this.text.next();
    this.highlightCurrentLetter();
  }

  addListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(event) {
    this.keyboard.highlight(event.key);

    if (this.finished) {
      return;
    }

    if (ignoredKeys.includes(event.key)) {
      return;
    }

    const currentLetter = this.text.getCurrentLetter();

    if (!currentLetter) {
      return;
    }

    if (event.key === currentLetter) {
      if (!this.started) {
        this.start();
      }
      this.statistics.addCorrect();
      this.moveToNextLetter();
      this.updateErrors();

      if (!this.text.getCurrentLetter()) {
        this.finish();
      }
    } else {
      if (this.started) {
        this.statistics.addError();
        this.updateErrors();
      }
    }
  }

  handleKeyUp(event) {
    this.keyboard.unhighlight(event.key);
  }

  finish() {
    this.finished = true;
    this.timer.stop();

    this.updateFinalStatistics();
  }
}
