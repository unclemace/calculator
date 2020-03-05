const keys = {
    'zero': { type: 'number', value: 0,rowId:0,position:0,doubleKey:true},
    'one': { type: 'number', value: 1,rowId:1,position:0},
    'two': { type: 'number',  value: 2,rowId:1,position:1},
    'three': { type: 'number',  value: 3,rowId:1,position:2},
    'four': { type: 'number',  value: 4,rowId:2,position:0},
    'five': { type: 'number',  value: 5,rowId:2,position:1},
    'six': { type: 'number',  value: 6,rowId:2,position:2},
    'seven': { type: 'number',  value: 7,rowId:3,position:0},
    'eight': { type: 'number',  value: 8,rowId:3,position:1},
    'nine': { type: 'number',  value: 9,rowId:3,position:2},
    'minus': { type: 'operator',value:'-',rowId:2,position:3},
    'plus': { type: 'operator',value:'+',rowId:1,position:3},
    'multiply': { type: 'operator',value:'*',rowId:3,position:3},
    'equal': { type: 'operator',value:'=',rowId:0,position:2},
    'dot': { type: 'operator',value:'.',rowId:0,position:1},
    'plus-minus': { type: 'operator',value:'+-',rowId:4,position:1},
    'division':{type:'operator',value:'/',rowId:4,position:3},
    'percent':{type:'operator',value:'%',rowId:4,position:2},
    'clear':{type:'operator',value:'c',rowId:4,position:0}
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

render(keys);
const keyboard = document.querySelector('.keyboard');
const viewField = document.querySelector('.view-field');
setResult(0);
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

function drawKeyBoard(){
    const basic = document.querySelector('.basic');
    return appendNamedDiv(basic,'keyboard');
}

function drawRow(keyboard) {
    return appendNamedDiv(keyboard,'keyboard-row');
}

function drawButton(row, config,key) {
    const button = appendNamedDiv(row,'key');
    button.classList.add(`${config.type}-key`);
    button.id = key;
    button.innerHTML = config.value;
    if(config.doubleKey){
        button.classList.add('double-key');
    }
}

function appendNamedDiv(parent,className) {
    const element = document.createElement('div');
    element.classList.add(className);
    parent.appendChild(element);
    return element;
}

function render(keys){
    const keyboard = drawKeyBoard();
    let rows = {};
    const sortedKeys = Object.keys(keys).sort((a,b)=>{
        if(keys[a].rowId === keys[b].rowId){
            return keys[a].position-keys[b].position;

        }
        return keys[b].rowId-keys[a].rowId;
    });
    sortedKeys.forEach(key => {
        const keyConfig = keys[key];
        const rowId = keyConfig.rowId;
        if(!rows[rowId]) {
            rows[rowId] = drawRow(keyboard);
        }
        const row = rows[rowId];
        drawButton(row, keyConfig, key);
    })
}
   