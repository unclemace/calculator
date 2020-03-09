import {keysBasic,keysEngineer,keysProgrammer} from './config.mjs';
import {render} from './render.mjs' 


let keys = keysBasic;
const operators = Object.keys(keys).filter(key => keys[key].type === 'operator');

const state = {
    // currentValue: 0,
    lastOperation: '',
    // visibleNumber: '',
    memory:0,
    expression:'',
    lastType:''
};

// function setValue(value) {
//     state.currentValue = value;
// }

function setOperation(operation) {
    state.lastOperation = operation;
}

// function setVisibleNumber(value) {
//     state.visibleNumber = value;
// }

function setExpression(value){
    state.expression = value;
}

function setLastType(value){
    state.lastType = value;
}

function setResult(value) {
    viewField.innerHTML = value;
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
        console.log(state);
        processClick(keyConfig, id);
        // if(state.lastOperation!== 'equal'){
        //     setResult(state.expression)
        // }else {
        //     setResult(state.visibleNumber);
        // }
        setResult(state.expression);
    });
}

function removeKeyboard() {
    const keyboard = document.querySelector('.basic');
    keyboard.removeChild(keyboard.firstChild);
}

function processClick(keyConfig, id) {
    if(keyConfig.type === 'number' ) {
        return processNumberClick(keyConfig.value);
    }
    if (keyConfig.type === 'operator'){
        if(state.lastType!=='operator')
        {
            console.log(state.expression[0]);
            if(id === 'equal' && state.lastOperation !=='equal')
            {
                if(isOperator(state.expression[0])){
                    setExpression('0'+state.expression);
                    return calculate(state.expression);
                }
                return calculate(state.expression);
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
    setLastType('number');
    changeExpression(value);
    // changeVisibleValue(value);
}

function processOperationClick(value) {
    setLastType('operator');
    setOperation(value);
    // setValue(state.visibleNumber);
    changeExpression(keys[value].value);
    // setVisibleNumber('');
}

// function changeVisibleValue(value) {
//     const visibleNumber = state.visibleNumber.toString() + value.toString();
//     setVisibleNumber(parseFloat(visibleNumber, 10));
// }

function changeExpression(value) {
    const expresion = state.expression.toString()+value.toString();
    setExpression(expresion);
}

function clearLastValue(){
    // if (Math.abs(state.visibleNumber) > 9) {
    //     const visibleNumber = state.visibleNumber.toString().slice(0,-1);
    //     setValue(parseFloat(visibleNumber,10))
    //     setVisibleNumber(parseFloat(visibleNumber,10));
    // }
    // else {
    //         setValue(0);
    //         setVisibleNumber(0);
    // }
    let newExpression = state.expression.slice(0,-1);
    setExpression(newExpression);
    
}

function isOperator(value){
    return operators.some(key => keys[key].value === value);
}

function getPriority(value) {
    switch (value){
        case '(': return 0;
        case ')': return 1;
        case '+': return 2;
        case '-': return 3;
        case '*': return 4;
        case '/': return 4;
        case '^': return 5;
        default: return 6;
    }

}

function calculate(input){
    const output = getExpression(input);
    const result = counting(output);
    // setVisibleNumber(result);
    state.expression = result;
    console.log(state);
    setOperation('equal');
}

function getExpression(input)
{
   let output = '';
   let operators = [];
    for (let i = 0; i < input.length; i++)
    { 
        if (!isNaN(parseInt(input[i])))
        {
            console.log('ok')
             while (!isOperator(input[i]))
             {
                 console.log(typeof(input[i]));
                 output+=input[i];
                i++;
                 if (i == input.length){
                     break;
                 } 
             }
             output+=' '; 
             i--;
        }
        if (isOperator(input[i])) 
        {
            if (input[i] == '('){
                operators.push(input[i]);
            }
            else if (input[i] == ')')
            {
                let s = operators.pop();

                while (s != '(')
                {
                    output += s.toString() + ' ';
                    s = operators.pop();
                }
            }
            else 
            {
                if (operators.length > 0)
                    if (getPriority(input[i]) <= getPriority(operators[operators.length - 1])){
                        output += operators.pop().toString() + " "; 
                    }
                operators.push(input[i].toString());
            }
        }
    }

    while (operators.length > 0)
        output += operators.pop() + " ";

    return output; 

}

function counting(input)
{
    let result = 0; 
    let temp = []; 

    for (let i = 0; i < input.length; i++) 
    {
        if (!isNaN(parseInt(input[i]))) 
        {
            let a = [];
            while ((input[i]!== " ") && (!isOperator(input[i]))) 
            {
                a += input[i]; 
                i++;
                if (i == input.Length) {
                    break;
                }
            }
            temp.push(parseFloat(a)); 
            i--;
        }
        else if (isOperator(input[i])) 
        {
            
            let a = temp.pop(); 
            let b = temp.pop();

            switch (input[i]) 
            { 
                case '+': result = b + a; break;
                case '-': result = b - a; break;
                case '*': result = b * a; break;
                case '/': result = b / a; break;
                case '^': result = parseFloat(Math.pow(parseFloat(b.toString()), parseFloat(a.toString())).toString()); break;
            }
            temp.push(result); 
        }
    }
    return temp.pop(); 
}

function validForEqual(expresion){
    if(isOperator(expresion[0])){
        state.expression.replace(expresion[0],'0 '+ expresion[0])
    }
}