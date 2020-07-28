import { keysBasic, keysEngineer, keysProgrammer } from './config';
import Renderer from '../view/render';
import Calculator from '../model/model';


// declaraion : what keys should be used for mode
const modeButtons = {
  basic: keysBasic,
  prog: keysProgrammer,
  eng: keysEngineer,
};
const viewField = document.querySelector('.view-field');

// Controller life cycle
// - init()
// - run()
//   - user input -> change state -> render -> user input -> ...

export const ModeController = {
  keys: null,
  activeMode: null,
  calculator: null,

  init() {
    this.keys = keysBasic;
    this.activeMode = 'basic';
    this.calculator = new Calculator();
  },

  run() {
    addListenersToButtons();
    addListenersToKeyboard();

    const menu = document.querySelector('.menu');
    menu.addEventListener('click', this.onChangeModeClick.bind(this));
  },

  onChangeModeClick(e) {
    removeKeyboard();
    const mode = e.target.id;
    this.changeMode(mode);
    this.render();
  },

  changeMode(id) {
    this.activeMode = id;
    this.keys = modeButtons[id];
  },

  render() {
    const view = new Renderer();
    view.render(this.keys);
  },
};

const calculator = new Calculator();

export const keys = keysBasic;

function removeKeyboard() {
  const basic = document.querySelector('.basic');
  basic.removeChild(basic.firstChild);
}

function addListenersToKeyboard() {
  document.addEventListener('keydown', (e) => {
    processKeyboardPress(e);
  });
}

function processKeyboardPress(e) {
  const keyName = e.key;
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '*', '/', '+', '-', '%', '(', ')', 'Backspace', 'Enter'];
  if (allowedKeys.some((key) => key === keyName)) {
    return setResult(calculator.processInput(keyName));
  }
  return undefined;
}

function addListenersToButtons() {
  const keyboard = document.querySelector('.keyboard');
  keyboard.addEventListener('click', (e) => {
    const value = e.target.id;
    return setResult(calculator.processInput(value));
  });
}

function setResult(value) {
  viewField.innerHTML = value.toString();
}
