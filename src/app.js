import { typingText } from './const.js';
import { Text } from './text.js';

const textArea = document.querySelector('.text');

const text = new Text(typingText);

textArea.append(...text.getElements());
