import {keysBasic,keysEngineer,keysProgrammer} from './config.mjs';
import {render} from './render.mjs' 


let keys = keysBasic;

const state = {
    currentValue: 0,
    lastOperation: '',
    visibleNumber: '',
    memory:0
};

function setValue(value) {
    state.currentValue = value;
}

function setOperation(operation) {
    state.lastOperation = operation;
}

function setVisibleNumber(value) {
    state.visibleNumber = value;
}

render(keys);
const keyboard = document.querySelector('.keyboard');
const viewField = document.querySelector('.view-field');
const menu = document.querySelector('.menu');

setResult(0);
addListenersToButtons();

menu.addEventListener('click', (e) => {
    const id = e.target.id;
    switch (id) {
        case 'basic':
            keys = keysBasic;
            break;
        case 'prog':
            keys = keysProgrammer;
            break;
        case 'eng':
            keys = keysEngineer;
            break;
        default:
            break;
    };
    removeKeyboard();
    render(keys);

    setResult(0);
    setValue(0);
    setVisibleNumber('');
    setOperation('');

    addListenersToButtons();
});

function addListenersToButtons() {
    const keyboard = document.querySelector('.keyboard');
    keyboard.addEventListener('click', (e) => {
        const id = e.target.id;
        const keyConfig = keys[id];
        processClick(keyConfig, id);
        console.log(state);
        if (state.lastOperation === '') {
            setResult(state.visibleNumber);
        }else {
            setResult(state.currentValue.toString()+keys[state.lastOperation].value+ state.visibleNumber);
        }
    });
}

function removeKeyboard() {
    const keyboard = document.querySelector('.basic');
    keyboard.removeChild(keyboard.firstChild);
}

function setResult(value) {
    viewField.innerHTML = value;
}

function processClick(keyConfig, id) {
    if(keyConfig.type === 'number' ) {
        
        return processNumberClick(keyConfig.value);
    }
    if (keyConfig.type === 'operator'){
        
        if(id === 'equal' || state.lastOperation !== '')
        {
            return calculateResult();
        }

        if(id ==='clear')
        {
            return clearLastValue();
        }
        return processOperationClick(id);
    }
}


function processNumberClick(value) {
    changeVisibleValue(value)
}

function calculateResult() {
    switch (state.lastOperation) {
        case 'plus':
            setValue(state.currentValue + state.visibleNumber);
            break;
        case 'minus':
            setValue(state.currentValue - state.visibleNumber);
            break;
        case 'multiply':
            setValue(state.currentValue * state.visibleNumber);
            break;
        case 'division':
            setValue(state.currentValue / state.visibleNumber);
            break;
        default:
            break;
    };
    setOperation('');
    setVisibleNumber(state.currentValue);
}

function processOperationClick(value) {
    setOperation(value);
    setValue(state.visibleNumber);
    setVisibleNumber('');

}

function changeVisibleValue(value) {
    const visibleNumber = state.visibleNumber.toString() + value.toString();
    setVisibleNumber(parseFloat(visibleNumber, 10));
}

function clearLastValue(){
    if (Math.abs(state.visibleNumber) > 9) {
        const visibleNumber = state.visibleNumber.toString().slice(0,-1);
        setValue(parseFloat(visibleNumber,10))
        setVisibleNumber(parseFloat(visibleNumber,10));
    }
    else {
            setValue(0);
            setVisibleNumber(0);
    }
    
}



