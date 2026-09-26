# Typing Trainer

A simple typing trainer built with Vanilla JavaScript. The project was created to practice object-oriented programming, DOM manipulation, and application architecture without using frameworks.

## Features

- Selectable session duration (30 / 60 / 120 seconds)
- Random sequence of typing texts
- Highlight the current character, correct characters and mistakes
- On-screen keyboard highlighting (layout-independent, based on `event.code`)
- Live WPM, accuracy and error counter
- Countdown timer
- Result screen with restart

## Technologies

- JavaScript (ES6 Modules)
- HTML5
- CSS3

## Project Structure

```
src/
├── classes/
│   ├── App.js
│   ├── Keyboard.js
│   ├── Statistics.js
│   ├── Text.js
│   └── Timer.js
├── data/
│   └── typing-texts.js
├── styles/
│   └── style.css
├── app.js
└── const.js
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/IvanShuklin/typing-trainer.git
```

2. Open `index.html` in your browser.

## Roadmap

- [x] Display typing text
- [x] Current character highlighting
- [x] Timer
- [x] Error counter
- [x] Accuracy calculation
- [x] Words per minute (WPM)
- [x] Keyboard highlighting
- [x] Random text generation
- [x] Restart training
- [x] Selectable session duration
