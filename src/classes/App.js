import { ignoredKeys } from '../const.js';
import { typingTexts } from '../data/typing-texts.js';
import { Text } from '../classes/Text.js';
import { Timer } from '../classes/Timer.js';
import { Statistics } from '../classes/Statistics.js';
import { Keyboard } from '../classes/Keyboard.js';

export class App {
  constructor() {
    this.textArea = document.querySelector('.text');
    this.previousTextElement = document.querySelector('.text-slider__previous');
    this.currentTextElement = document.querySelector('.text-slider__current');
    this.nextTextElement = document.querySelector('.text-slider__next');
    this.stats = document.querySelector('.stats');
    this.minutesElement = this.stats.querySelector('.minutes');
    this.secondsElement = this.stats.querySelector('.seconds');
    this.errorsElement = this.stats.querySelector('.errors');
    this.accuracyElement = this.stats.querySelector('.accuracy');
    this.wpmElement = this.stats.querySelector('.wpm');

    this.previousText = null;
    this.currentText = this.getRandomText();
    this.nextText = this.getRandomText(this.currentText);

    this.text = new Text(this.currentText);
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
    this.previousTextElement.textContent = this.previousText ?? '';

    this.currentTextElement.replaceChildren(...this.text.getElements());

    this.nextTextElement.textContent = this.nextText;
  }
  getRandomText(excludedText) {
    const availableTexts = typingTexts.filter((text) => text !== excludedText);
    const randomIndex = Math.floor(Math.random() * availableTexts.length);

    return availableTexts[randomIndex];
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
        this.goToNextText();
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

  goToNextText() {
    this.previousText = this.currentText;
    this.currentText = this.nextText;
    this.nextText = this.getRandomText(this.currentText);

    this.text = new Text(this.currentText);

    this.renderText();
    this.highlightCurrentLetter();
  }

  finish() {
    this.finished = true;
    this.timer.stop();
    this.updateFinalStatistics();
  }
}
