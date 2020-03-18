import {keysBasic,keysEngineer,keysProgrammer} from './config.js';
import {render} from './render.js'
import {calculate, isOperator, isBinaryOperator} from './model.js';


export let keys = keysEngineer;

const state = {
    lastOperation: '',
    memory:0,
    calculatedExpr:'',
    expression:'',
    typesArr:[],
    bracketOpen:0
};


render(keys);
const keyboard = document.querySelector('.keyboard');
const viewField = document.querySelector('.view-field');
const menu = document.querySelector('.menu');

setResult('');
addListenersToButtons();
addListenersToKeyboard();

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
    setResult('');
    setOperation('');
    setExpression('');
    setCalcExpr('');
    state.typesArr = [];
    addListenersToButtons();
});

function addListenersToKeyboard() {
    document.addEventListener('keydown', e => {
        processKeyboardPress(e);
        setResult(state.expression);
    });
}

function processKeyboardPress(e) {
    const keyName = e.key;
    const allowedNumbers = ['0','1','2','3','4','5','6','7','8','9','.'];
    const operations = {
        'plus': {value:'+'},
        'minus': { value:'-'},
        'multiply': { value:'*'},
        'division':{ value:'/'},
        'percent':{ value:'%'},
        'lscope':{value:'('},
        'rscope':{value:')'}
    };

    const allowedOperations = Object.keys(operations);

    if (allowedNumbers.some(key => key === keyName) && isValidNumber()){
        if (state.lastOperation === 'equal'){
            setCalcExpr('');
            setExpression('');
            setOperation('');
        }
        changeCalcExpr(keyName);
        changeExpression(keyName);
        console.log(state);
        state.typesArr.push('number');
    }
    if (allowedOperations.some(key => operations[key].value === keyName) && isValidOperation(allowedOperations.find(key => operations[key].value === keyName))){
        changeCalcExpr(keyName);
        changeExpression(keyName);
        setOperation(allowedOperations.find(key => operations[key].value === keyName));
        console.log(state);
        state.typesArr.push('operator');
    }

    if (keyName === 'Enter'){
        state.typesArr = [];
        return validateAndCalc();

    }
    if (keyName === 'Backspace'){
        return clearLastValue();
    }

}

function addListenersToButtons() {
    const keyboard = document.querySelector('.keyboard');
    keyboard.addEventListener('click', (e) => {
        const id = e.target.id;
        const keyConfig = keys[id];
        processClick(keyConfig, id);
        setResult(state.expression);
    });
}

function setResult(value) {
    viewField.innerHTML = value.toString();
}

function removeKeyboard() {
    const keyboard = document.querySelector('.basic');
    keyboard.removeChild(keyboard.firstChild);
}

function processClick(keyConfig, id) {
    console.log(state);
    if(keyConfig.type === 'number' && isValidNumber(id)) {
        processNumberClick(keyConfig.value);
    }
    else if (keyConfig.type === 'operator'){

        if(id ==='clear')
        {
            return clearLastValue();
        }
        else if (id === 'mr' || id === 'mplus' || id === 'mminus' || id === 'mc'){
            if (id === 'mplus' || id === 'mminus'){
                if (state.lastOperation === 'equal'){
                    return processMemoryClick(id);
                }
            }else {
                return processMemoryClick(id);
            }
        }
        else if (keyConfig.value === '='){
            state.typesArr = [];
            return validateAndCalc();
        }
        else if(isValidOperation(id))
        {
            processOperationClick(id);
        }
    }

}

function isValidOperation(id) {
    const key = keys[id].value;
    const lastType = state.typesArr[state.typesArr.length-1];

    if (state.expression.length === 0)
    {
        if (key === '('){
            state.bracketOpen+=1;
        }
        return key !== '!'  && isPrefixOperation(key) || key === '-'|| key === 'e' || key === 'π';
    }
    else if (lastType === 'number' && (isBinaryOperator(key) || !isPrefixOperation(key))){
        if (state.bracketOpen !== 0 && key === ')'){
            state.bracketOpen -=1;
        }
        return true;
    }
    else if (state.lastOperation.length !== 0 ){
        if (isBinaryOperator(keys[state.lastOperation].value) && isPrefixOperation(key)){
            if (key === '('){
                state.bracketOpen +=1;
            }
            return true;
        }
        else if (isBinaryOperator(key) && state.lastOperation === 'rscope' && key!==')'){
            return true;
        }
        else if (isPrefixOperation(keys[state.lastOperation].value) && key === '('){
            state.bracketOpen+=1;
            return true;
        }
        else  if (state.lastOperation === 'rscope' && state.bracketOpen !==0 && key === ')'){
            state.bracketOpen -=1;
            return true;
        }
    }
    else  {
        return false;
    }
}
function isValidNumber() {
    if(state.expression.length === 0){
        return true
    }
    else if (state.lastOperation !== '' && state.lastOperation !== 'rscope' && (isBinaryOperator(keys[state.lastOperation].value) || state.lastOperation === 'lscope')){
        return true;
    }else return state.typesArr.length !== 0 && state.typesArr[state.typesArr.length - 1] === 'number';
}



function isPrefixOperation(value){
    const prefix = Object.keys(keys).filter( key => keys[key].prefix === true);
    return prefix.some(key => keys[key].value === value);
}

function validateAndCalc(){
    if ( state.calculatedExpr[state.calculatedExpr.length-1] === ' '){
        setCalcExpr(state.calculatedExpr.slice(0,-1));
    }
    if ( state.calculatedExpr[0] === ' '){
        setCalcExpr(state.calculatedExpr.slice(1));
    }
    if (state.calculatedExpr[0]=== '-'){
        setCalcExpr('0 '+ state.calculatedExpr);
    }
    setCalcExpr(state.calculatedExpr.replace('  ', ' '));
    let res = calculate(state.calculatedExpr);
    
    if (isNaN(res)){
        setExpression('Error');
        setOperation('equal');
        setCalcExpr('');
        return state.expression;
    }
    else {
        state.expression = res;
        setOperation('equal');
        state.typesArr.push('number');
        setCalcExpr(state.expression.toString());
        return state.expression;
    }
}

function processNumberClick(value) {
    if(state.lastOperation === 'equal'){
        setOperation('');
        setExpression(value);

    }else {
        changeExpression(value);
        changeCalcExpr(value);
    }
    
    state.typesArr.push('number');
   
}

function processOperationClick(value) {
    if (value !== 'equal'){
        state.typesArr.push('operator');
        if(isConvertibleOperation(keys[value].value)){
            convertOperation(keys[value].value);
        }else {
            changeCalcExpr(keys[value].value);
            setOperation(value);
        }
        changeExpression(keys[value].value);
    }
}

function processMemoryClick(value) {
    let memory = state.memory;
    switch (value) {
        case 'mr':
            setExpression(memory.toString());
            setCalcExpr(memory.toString());
            setOperation('');
            state.typesArr.push('number');
            break;
        case 'mc':
            setMemory(0);
            break;
        case 'mplus':
            setMemory(memory + parseFloat(state.expression));
            break;
        case 'mminus':
            setMemory(memory - parseFloat(state.expression));
        default:
            break;
    }
}

function isConvertibleOperation(value){
    const convertible = Object.keys(keys).filter(key => keys[key].convertible === true);
    return convertible.some(key => keys[key].value === value);
}

function convertOperation(value){
   switch (value) {
       case '2^':
           changeCalcExpr('2 ^ ');
           state.typesArr.pop();
           state.typesArr.push('number');
           state.typesArr.push('operator'); 
           setOperation('xy');
           break;
        case '^2':
           changeCalcExpr(' ^ 2'); 
           state.typesArr.pop();
           state.typesArr.push('operator');
           state.typesArr.push('number');
           setOperation('xy');
           break;
        case '^3':
           changeCalcExpr(' ^ 3'); 
           state.typesArr.pop();
           state.typesArr.push('operator');
           state.typesArr.push('number');
           setOperation('xy');
           break;
        case 'e^':
           changeCalcExpr('2.71828 ^ '); 
           state.typesArr.pop();
           state.typesArr.push('number');
           state.typesArr.push('operator'); 
           setOperation('xy');
           break;
        case '10^':
           changeCalcExpr('10 ^ ');
           state.typesArr.pop();
           state.typesArr.push('number');
           state.typesArr.push('operator'); 
           setOperation('xy'); 
           break;
        case '1/':
            changeCalcExpr('1 / ');
            state.typesArr.pop();
            state.typesArr.push('number');
            state.typesArr.push('operator');
            setOperation('division');
            break;
        case 'e':
            changeCalcExpr('2.71828');
            state.typesArr.pop();
            state.typesArr.push('number');
            break;
        case 'π':
            changeCalcExpr('3.14159');
            state.typesArr.pop();
            state.typesArr.push('number');
            break;
       default:
           break;
   }
}

function changeExpression(value) {
    const expresion = state.expression.toString()+value.toString();
    setExpression(expresion);
}

function changeCalcExpr(value){
    if (isOperator(value)){
        if (value === '!'){
            const expresion = " ! " + state.calculatedExpr.toString();
            return setCalcExpr(expresion);
        }
        const expresion = state.calculatedExpr.toString()+ " " +value.toString()+ " ";
        return setCalcExpr(expresion);
    }else {
        const expresion = state.calculatedExpr.toString()+value.toString();
        return setCalcExpr(expresion);
    }
}

function clearLastValue(){
    if (state.lastOperation === 'equal'){
        setOperation('');
        setExpression('');
        setCalcExpr('');
        state.typesArr = [];
    }
    state.calculatedExpr.replace('  ',' ');
    let calc = state.calculatedExpr.split(' ');

    deleteElement(calc,'');

    if (state.typesArr[state.typesArr.length-1] === 'operator'){
        let newExpr = calc.slice(0,-1);
        setCalcExpr(newExpr.join(' '));
        setExpression(newExpr.join(''));
        state.lastOperation = state.typesArr.pop();
    }else {
        setCalcExpr(calc.join(' ').slice(0,-1));
        setExpression(calc.join('').slice(0,-1));
        state.typesArr.pop();
    
    }

    if (state.expression.length === 0){
        setOperation('');
    }
    
}

function deleteElement(arr, value){
    while (arr.indexOf(value) !== -1){
        let ind = arr.indexOf(value);
        arr.splice(ind,1);
    }
    return arr;
}

function setOperation(operation) {
    state.lastOperation = operation;
}

function setExpression(value){
    state.expression = value;
}

function setCalcExpr(value) {
    state.calculatedExpr = value;
}

function setMemory(value){
    state.memory = value;
}