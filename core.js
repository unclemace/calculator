const keysBasic = {
    'zero': { type: 'number', value: 0,rowId:0,position:0,doubleKey:true},
    'dot': { type: 'number',value:'.',rowId:0,position:1},
    'equal': { type: 'operator',value:'=',rowId:0,position:2, basicOperation:true},

    'one': { type: 'number', value: 1,rowId:1,position:0},
    'two': { type: 'number',  value: 2,rowId:1,position:1},
    'three': { type: 'number',  value: 3,rowId:1,position:2},
    'plus': { type: 'operator',value:'+',rowId:1,position:3, basicOperation:true},

    'four': { type: 'number',  value: 4,rowId:2,position:0},
    'five': { type: 'number',  value: 5,rowId:2,position:1},
    'six': { type: 'number',  value: 6,rowId:2,position:2},
    'minus': { type: 'operator',value:'-',rowId:2,position:3, basicOperation:true},

    'seven': { type: 'number',  value: 7,rowId:3,position:0},
    'eight': { type: 'number',  value: 8,rowId:3,position:1},
    'nine': { type: 'number',  value: 9,rowId:3,position:2},
    'multiply': { type: 'operator',value:'*',rowId:3,position:3, basicOperation:true},

    'clear':{type:'operator',value:'c',rowId:4,position:0},
    'plus-minus': { type: 'operator',value:'+-',rowId:4,position:1},
    'division':{type:'operator',value:'/',rowId:4,position:3, basicOperation:true},
    'percent':{type:'operator',value:'%',rowId:4,position:2}
};

const keysEngineer = {
    'lscope':{type:'operator',value:'(',rowId:4,position:0},
    'rscope':{type:'operator',value:')',rowId:4,position:1},
    'mc':{type:'operator',value:'mc',rowId:4,position:2},
    'mplus':{type:'operator',value:'m+',rowId:4,position:3},
    'mminus':{type:'operator',value:'m-',rowId:4,position:4},
    'mr':{type:'operator',value:'mr',rowId:4,position:5},
    'clear':{type:'operator',value:'c',rowId:4,position:6},
    'plus-minus': { type: 'operator',value:'+-',rowId:4,position:7},
    'percent':{type:'operator',value:'%',rowId:4,position:8},
    'division':{type:'operator',value:'/',rowId:4,position:9, basicOperation:true},

    '2nd':{type:'operator',value:'2^nd',rowId:3,position:0},
    'square':{type:'operator',value:'x^2',rowId:3,position:1},
    'cube':{type:'operator',value:'x^3',rowId:3,position:2},
    'xy':{type:'operator',value:'x^y',rowId:3,position:3},
    'ex':{type:'operator',value:'e^x',rowId:3,position:4},
    '10x':{type:'operator',value:'10^x',rowId:3,position:5},
    'seven': { type: 'number',  value: 7,rowId:3,position:6},
    'eight': { type: 'number',  value: 8,rowId:3,position:7},
    'nine': { type: 'number',  value: 9,rowId:3,position:8},
    'multiply': { type: 'operator',value:'*',rowId:3,position:9, basicOperation:true},

    '1-div-x':{type:'operator',value:'1/x',rowId:2,position:0},
    'squareRoot':{type:'operator',value:'√x',rowId:2,position:1},
    'cubeRoot':{type:'operator',value:'∛x',rowId:2,position:2},
    'nRoot':{type:'operator',value:'',rowId:2,position:3},
    'ln':{type:'operator',value:'ln',rowId:2,position:4},
    'logTen':{type:'operator',value:'log',rowId:2,position:5},
    'four': { type: 'number',  value: 4,rowId:2,position:6},
    'five': { type: 'number',  value: 5,rowId:2,position:7},
    'six': { type: 'number',  value: 6,rowId:2,position:8},
    'minus': { type: 'operator',value:'-',rowId:2,position:9, basicOperation:true},

    'fact':{type:'operator',value:'x!',rowId:1,position:0},
    'sin':{type:'operator',value:'sin',rowId:1,position:1},
    'cos':{type:'operator',value:'cos',rowId:1,position:2},
    'tan':{type:'operator',value:'tan',rowId:1,position:3},
    'e':{type:'operator',value:'e',rowId:1,position:4},
    'EE':{type:'operator',value:'EE',rowId:1,position:5},
    'one': { type: 'number', value: 1,rowId:1,position:6},
    'two': { type: 'number',  value: 2,rowId:1,position:7},
    'three': { type: 'number',  value: 3,rowId:1,position:8},
    'plus': { type: 'operator',value:'+',rowId:1,position:9, basicOperation:true},

    'rad':{type:'operator',value:'rad',rowId:0,position:0},
    'sinh':{type:'operator',value:'sinh',rowId:0,position:1},
    'cosh':{type:'operator',value:'cosh',rowId:0,position:2},
    'tanh':{type:'operator',value:'tanh',rowId:0,position:3},
    'pi':{type:'operator',value:'π',rowId:0,position:4},
    'rand':{type:'operator',value:'Rand',rowId:0,position:5},
    'zero': { type: 'number', value: 0,rowId:0,position:6,doubleKey:true},
    'dot': { type: 'number',value:'.',rowId:0,position:7},
    'equal': { type: 'operator',value:'=',rowId:0,position:8, basicOperation:true}
}

const keysProgrammer = {
    'and':{type:'operator',value:'AND',rowId:5,position:0},
    'or':{type:'operator',value:'OR',rowId:5,position:1},
    'd':{type:'number',value:'D',rowId:5,position:2},
    'e':{type:'number',value:'E',rowId:5,position:3},
    'f':{type:'number',value:'F',rowId:5,position:4},
    'ac':{type:'operator',value:'AC',rowId:5,position:5},
    'clear':{type:'operator',value:'C',rowId:5,position:6},

    'nor':{type:'operator',value:'NOR',rowId:4,position:0},
    'xor':{type:'operator',value:'XOR',rowId:4,position:1},
    'a':{type:'number',value:'A',rowId:4,position:2},
    'b':{type:'number',value:'B',rowId:4,position:3},
    'c':{type:'number',value:'C',rowId:4,position:4},
    'rol':{type:'operator',value:'Rol',rowId:4,position:5},
    'ror':{type:'operator',value:'RoR',rowId:4,position:6},

    'lShift':{type:'operator',value:'<<',rowId:3,position:0},
    'rShift':{type:'operator',value:'>>',rowId:3,position:1},
    'seven': { type: 'number',  value: 7,rowId:3,position:2},
    'eight': { type: 'number',  value: 8,rowId:3,position:3},
    'nine': { type: 'number',  value: 9,rowId:3,position:4},
    '2s':{type:'operator',value:"2's",rowId:3,position:5},
    '1s':{type:'operator',value:"1's",rowId:3,position:6},

    'xLSHiftY':{type:'operator',value:'X< <Y',rowId:2,position:0},
    'xRShifhtY':{type:'operator',value:'X>>Y',rowId:2,position:1},
    'four': { type: 'number',  value: 4,rowId:2,position:2},
    'five': { type: 'number',  value: 5,rowId:2,position:3},
    'six': { type: 'number',  value: 6,rowId:2,position:4},
    'division':{type:'operator',value:'/',rowId:2,position:5, basicOperation:true},
    'minus': { type: 'operator',value:'-',rowId:2,position:6, basicOperation:true},

    'byteFlip': { type: 'operator',value:'byte flip',rowId:1,position:0,doubleKey:true },
    'one': { type: 'number', value: 1,rowId:1,position:1},
    'two': { type: 'number',  value: 2,rowId:1,position:2},
    'three': { type: 'number',  value: 3,rowId:1,position:3},
    'multiply': { type: 'operator',value:'*',rowId:1,position:4, basicOperation:true},
    'plus': { type: 'operator',value:'+',rowId:1,position:5, basicOperation:true},

    'wordFlip': { type: 'operator',value:'word flip',rowId:0,position:0,doubleKey:true },
    'ff': { type: 'number', value: 'FF',rowId:0,position:1},
    'zero': { type: 'number', value: 0,rowId:0,position:2},
    'oo': { type: 'number', value:'00' ,rowId:0,position:3},
    'equal': { type: 'operator', value: '=',rowId:0,position:4,doubleKey:true, basicOperation:true},
    
}

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
    console.log(config.value);
    if(config.doubleKey){
        button.classList.add('double-key');
    }
    if(config.basicOperation){
        button.classList.add('basic-operation');
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

