import {keysBasic,keysEngineer,keysProgrammer} from './config.mjs';
import {render} from '../view/render.mjs'
import {processInput} from '../model/model.mjs'


export let keys = keysBasic;

render(keys);
const keyboard = document.querySelector('.keyboard');
const viewField = document.querySelector('.view-field');
const menu = document.querySelector('.menu');
viewField.classList.add('bas');

addListenersToButtons();
addListenersToKeyboard();

menu.addEventListener('click', (e) => {
    if (viewField.classList.length === 2){
        viewField.classList.remove(viewField.classList[viewField.classList.length-1])
    }
    const id = e.target.id;
    switch (id) {
        case 'basic':
            keys = keysBasic;
            viewField.classList.add('bas');
            break;
        case 'prog':
            keys = keysProgrammer;
            viewField.classList.add('prog');
            break;
        case 'eng':
            keys = keysEngineer;
            viewField.classList.add('eng');
            break;
        default:
            break;
    }
    removeKeyboard();
    render(keys);
    setResult('');
    addListenersToButtons();
});

function removeKeyboard() {
    const basic = document.querySelector('.basic');
    basic.removeChild(basic.firstChild);
}

function addListenersToKeyboard() {
    document.addEventListener('keydown', e => {
        processKeyboardPress(e);
    });
}

function processKeyboardPress(e) {
    const keyName = e.key;
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','*','/','+','-','%','(',')','Backspace','Enter'];
    if (allowedKeys.some(key => key === keyName)){
        return setResult(processInput(keyName));
    }
}

function addListenersToButtons() {
    const keyboard = document.querySelector('.keyboard');
    keyboard.addEventListener('click', (e) => {
        const value = e.target.id;
        return setResult(processInput(value));
    });
}

function setResult(value) {
    viewField.innerHTML = value.toString();
}

