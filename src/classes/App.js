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

    this.startModal = document.querySelector('#modal-start');
    this.resultModal = document.querySelector('#modal-result');
    this.resetButton = this.resultModal.querySelector('.modal__reset');
    this.resultWpm = this.resultModal.querySelector('.modal__wpm');
    this.resultAccuracy = this.resultModal.querySelector('.modal__accuracy');
    this.resultErrors = this.resultModal.querySelector('.modal__errors');

    this.previousText = null;
    this.currentText = this.getRandomText();
    this.nextText = this.getRandomText(this.currentText);

    this.text = new Text(this.currentText);

    this.timer = new Timer(
      (remainingSeconds) => {
        this.updateTimer(remainingSeconds);
      },
      () => {
        this.finish();
      },
    );

    this.statistics = new Statistics();
    this.keyboard = new Keyboard(document.querySelector('.keyboard'));

    this.duration = 0;
    this.started = false;
    this.finished = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  init() {
    this.renderText();
    this.highlightCurrentLetter();
    this.addListeners();
    this.showStartModal();
  }

  showStartModal() {
    this.startModal.hidden = false;
  }

  hideStartModal() {
    this.startModal.hidden = true;
  }

  showResultModal() {
    this.resultWpm.textContent = this.statistics.getWPM(
      this.timer.getSeconds(),
    );

    this.resultAccuracy.textContent = this.statistics.getAccuracy();
    this.resultErrors.textContent = this.statistics.getErrors();

    this.resultModal.hidden = false;
  }

  hideResultModal() {
    this.resultModal.hidden = true;
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

  goToNextText() {
    this.previousText = this.currentText;
    this.currentText = this.nextText;
    this.nextText = this.getRandomText(this.currentText);

    this.text = new Text(this.currentText);

    this.renderText();
    this.highlightCurrentLetter();
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

  updateTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    this.minutesElement.textContent = String(minutes).padStart(2, '0');
    this.secondsElement.textContent = String(remainingSeconds).padStart(2, '0');
  }

  start() {
    if (this.duration <= 0) {
      return;
    }

    this.started = true;
    this.timer.start(this.duration);
  }

  finish() {
    this.finished = true;
    this.timer.stop();
    this.updateFinalStatistics();
    this.showResultModal();
  }

  reset() {
    this.timer.reset();
    this.statistics.reset();

    this.started = false;
    this.finished = false;
    this.duration = 0;

    this.previousText = null;
    this.currentText = this.getRandomText();
    this.nextText = this.getRandomText(this.currentText);

    this.text = new Text(this.currentText);

    this.renderText();
    this.highlightCurrentLetter();
    this.updateErrors();

    this.updateTimer(0);

    this.accuracyElement.textContent = '0';
    this.wpmElement.textContent = '0';

    this.hideResultModal();
    this.showStartModal();
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

    this.startModal.addEventListener('click', (event) => {
      const button = event.target.closest('[data-duration]');

      if (!button) {
        return;
      }

      this.duration = Number(button.dataset.duration);
      this.updateTimer(this.duration);
      this.hideStartModal();
    });

    this.resetButton.addEventListener('click', () => {
      this.reset();
    });
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
        if (this.duration <= 0) {
          return;
        }

        this.start();
      }

      this.statistics.addCorrect();
      this.moveToNextLetter();
      this.updateErrors();

      if (!this.text.getCurrentLetter()) {
        this.goToNextText();
      }

      return;
    }

    if (this.started) {
      this.statistics.addError();
      this.updateErrors();
    }
  }

  handleKeyUp(event) {
    this.keyboard.unhighlight(event.key);
  }
}
