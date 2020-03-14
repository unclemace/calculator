import {keysBasic,keysEngineer,keysProgrammer} from './config.mjs';
import {render} from './render.mjs' 
import {calculate} from './model.mjs';


let keys = keysEngineer;

const state = {
    lastOperation: '',
    memory:0,
    calculatedExpr:'',
    expression:'',
    lastType:''
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
        if(state.lastType!=='operator' || id === 'clear' || id === 'equal' || id === 'lscope' || id === 'rscope')
        {

            if(id === 'equal' && state.lastOperation !=='equal' && !isOperator(state.calculatedExpr[-1]))
            {
                console.log(state.calculatedExpr[0]);
                if(state.calculatedExpr[0] == ' '){
                    setCalcExpr('0'+ state.calculatedExpr);
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

export function isOperator(value){
    const operators = Object.keys(keys).filter(key => keys[key].type === 'operator');
    return operators.some(key => keys[key].value === value);
}



function processNumberClick(value) {
    if(state.lastOperation === 'equal'){
        setOperation('');
        setExpression(value);

    }else {
        changeExpression(value);
        changeCalcExpr(value);
    }
    setLastType('number');
   
}

function processOperationClick(value) {
    if (value !== 'equal'){
        changeCalcExpr(keys[value].value);
        setLastType('operator');
        setOperation(value);
        changeExpression(keys[value].value);
    }
}

function changeExpression(value) {
    const expresion = state.expression.toString()+value.toString();
    setExpression(expresion);
}

function changeCalcExpr(value){
    console.log(value);
    if (isOperator(value)){
        const expresion = state.calculatedExpr.toString()+ " " +value.toString()+ " ";
        setCalcExpr(expresion);
    }else {
        const expresion = state.calculatedExpr.toString()+value.toString();
        setCalcExpr(expresion);
    }
}

function clearLastValue(){
    if (state.lastOperation === 'equal'){
        setOperation('');
        setExpression('');
        setCalcExpr('');
    }
    if (state.expression.toString().length == 1){
        setExpression('');
    }

    if(state.expression.toString().length>1){
        let newExpression = state.expression.toString().slice(0,-1);
        setExpression(newExpression);
    }
    if (state.calculatedExpr.toString().length == 1){
        setCalcExpr('');
    }
    if(state.calculatedExpr.toString().length > 1){
        let newCalcExpression = state.expression.toString().slice(0,-1);
        setCalcExpr(newCalcExpression);
    }
    
}



function setOperation(operation) {
    state.lastOperation = operation;
}

function setExpression(value){
    state.expression = value;
}

function setLastType(value){
    state.lastType = value;
}

function setCalcExpr(value) {
    state.calculatedExpr = value;
}

function setResult(value) {
    viewField.innerHTML = value.toString();
}

