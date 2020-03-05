const keys = {
    'zero': { type: 'number', value: 0},
    'one': { type: 'number', value: 1},
    'two': { type: 'number',  value: 2},
    'three': { type: 'number',  value: 3},
    'four': { type: 'number',  value: 4},
    'five': { type: 'number',  value: 5},
    'six': { type: 'number',  value: 6},
    'seven': { type: 'number',  value: 7},
    'eight': { type: 'number',  value: 8},
    'nine': { type: 'number',  value: 9},
    'minus': { type: 'operator'},
    'plus': { type: 'operator'},
    'multiply': { type: 'operator'},
    'equal': { type: 'operator'},
    'dot': { type: 'operator'},
    'plus-minus': { type: 'operator'},
    'division':{type:'operator'},
    'clear':{type:'operator'}
}

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


const keyboard = document.querySelector('.keyboard');
const viewField = document.querySelector('.view-field');
setResult(0);

keyboard.addEventListener('click', (e) => {
    const id = e.target.id;
    const keyConfig = keys[id];
    processClick(keyConfig, id);
    if (state.visibleNumber !== 0) {
        setResult(state.visibleNumber);
    }
});

function setResult(value) {
    viewField.innerHTML = value;
}

function processClick(keyConfig, id) {
    if(keyConfig.type === 'number') {
        return processNumberClick(keyConfig.value);
    }


    if (keyConfig.type === 'operator'){
        
        if(keyConfig.type === 'operator' && id === 'equal')
        {
            return calculateResult();
        }

        if(keyConfig.type === 'operator' && id ==='clear')
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
    console.log(state);
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
    setVisibleNumber(0);
}

function changeVisibleValue(value) {
    const visibleNumber = state.visibleNumber.toString() + value.toString();
    setVisibleNumber(parseFloat(visibleNumber, 10));
}

function clearLastValue(){
    console.log(state);
    if (state.visibleNumber > 9) {
        const visibleNumber = state.visibleNumber.toString().slice(0,-1);
        setVisibleNumber(parseFloat(visibleNumber,10));
    }

}
