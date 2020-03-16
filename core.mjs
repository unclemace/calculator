import {keysBasic,keysEngineer,keysProgrammer} from './config.mjs';
import {render} from './render.mjs' 
import {calculate, isOperator, isBinaryOperator} from './model.mjs';


export let keys = keysEngineer;

const state = {
    lastOperation: '',
    memory:0,
    calculatedExpr:'',
    expression:'',
    typesArr:[]
};


render(keys);
const keyboard = document.querySelector('.keyboard');
const viewField = document.querySelector('.view-field');
const menu = document.querySelector('.menu');

setResult('');
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
    setResult('');
    setOperation('');
    setExpression('');
    addListenersToButtons();
});

function addListenersToButtons() {
    const keyboard = document.querySelector('.keyboard');
    keyboard.addEventListener('click', (e) => {
        const id = e.target.id;
        const keyConfig = keys[id];
        processClick(keyConfig, id);
        setResult(state.expression);
    });
}

function removeKeyboard() {
    const keyboard = document.querySelector('.basic');
    keyboard.removeChild(keyboard.firstChild);
}

function processClick(keyConfig, id) {
    console.log(state);
    if(keyConfig.type === 'number' ) {
        return processNumberClick(keyConfig.value);
    }
    if (keyConfig.type === 'operator'){
        if (state.calculatedExpr.length === 0){
            if (id === 'minus'){
                return processOperationClick(id);
            }else if (!isBinaryOperator(keyConfig.value)){
                return processOperationClick(id);
            }
        }
        else if(state.typesArr[state.typesArr.length-1] === 'number' || !isBinaryOperator(keyConfig.value) || isBinaryOperator(keys[state.lastOperation].value))
        {

            if(id === 'equal' && state.lastOperation !=='equal' && (state.typesArr[state.typesArr.length-1]!=='operator' ||state.lastOperation === 'rscope'))
            {
                if ( state.calculatedExpr[state.calculatedExpr.length-1] == ' '){
                    state.calculatedExpr = state.calculatedExpr.slice(0,-1);
                }
                state.expression = calculate(state.calculatedExpr);;
                setOperation('equal');
                setCalcExpr(state.expression.toString());
                return state.expression;
            }
    
            if(id ==='clear')
            {
                return clearLastValue();
            }
            return processOperationClick(id);
        }
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
        if(isConvertibleOperation(keys[value].value)){
            convertOperation(keys[value].value);
        }else{ 
            changeCalcExpr(keys[value].value);
        }
        state.typesArr.push('operator');
        setOperation(value);
        changeExpression(keys[value].value);
    }
}

function processMemoryClick(value) {
    let memory = state.memory;
    switch (value) {
        case 'mr':
            
            break;
        case 'mc':
            setMemory(0);
            break;
        case 'mplus':
            setMemory(memory+parseFloat(state.expression));
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
           break;
        case '^2':
           changeCalcExpr(' ^ 2'); 
           break;
        case '^3':
           changeCalcExpr(' ^ 3'); 
           break;
        case 'e^':
           changeCalcExpr('2.71828 ^ '); 
           break;
        case '10^':
           changeCalcExpr('10 ^ '); 
           break;
        case '1/':
            changeCalcExpr('1 / ');
            break;
        case 'e':
            changeCalcExpr('2.71828');
            break;
        case 'π':
            changeCalcExpr('3.14159');
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
        if(state.calculatedExpr.length == 0) {
            if(value === '-'){
                const expresion = state.calculatedExpr.toString()+value.toString();
                return setCalcExpr(expresion);
            }
            const expresion = state.calculatedExpr.toString()+value.toString() + " ";
            return setCalcExpr(expresion);
        }else {
            if (value === '(' || !isBinaryOperator(value)){
                const expresion = state.calculatedExpr.toString()+value.toString()+ " ";
                return setCalcExpr(expresion);
            }
            if (value === ')'){
                const expresion = state.calculatedExpr.toString()+ " " + value.toString();
                return setCalcExpr(expresion);
            }
            const expresion = state.calculatedExpr.toString()+ " " +value.toString()+ " ";
            return setCalcExpr(expresion);
        }
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
    
    let calc = state.calculatedExpr.split(' ');

    if (calc.indexOf('')>-1){
        calc = calc.slice(0,-1);
    }

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

function setResult(value) {
    viewField.innerHTML = value.toString();
}


console.log(calculate('4 * ( 3 + 2 )'));