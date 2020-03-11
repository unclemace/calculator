import {keysBasic,keysEngineer,keysProgrammer} from './config.mjs';
import {render} from './render.mjs' 


let keys = keysEngineer;
const operators = Object.keys(keys).filter(key => keys[key].type === 'operator');

const state = {
    lastOperation: '',
    memory:0,
    expression:'',
    lastType:''
};


function setOperation(operation) {
    state.lastOperation = operation;
}

function setExpression(value){
    state.expression = value;
}

function setLastType(value){
    state.lastType = value;
}

function setResult(value) {
    viewField.innerHTML = value.toString();
}

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

            if(id === 'equal' && state.lastOperation !=='equal' && !isOperator(state.expression[-1]))
            {
                if(isOperator(state.expression[0])){
                    setExpression('0'+ state.expression);
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
    if(state.lastOperation === 'equal'){
        setOperation('');
        setExpression(value);
    }else {
        changeExpression(value);
    }
    setLastType('number');
   
}

function processOperationClick(value) {
    if (value !== 'equal'){
        setLastType('operator');
        setOperation(value);
        changeExpression(keys[value].value);
    }
}

function changeExpression(value) {
    const expresion = state.expression.toString()+value.toString();
    setExpression(expresion);
}

function clearLastValue(){
    if (state.lastOperation === 'equal'){
        setOperation('');
        setExpression('');
    }

    if(state.expression.toString().length>1){
        let newExpression = state.expression.toString().slice(0,-1);
        setExpression(newExpression);
    }
    
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
        case '%': return 5
        case '^': return 6;
        case 'sin': return 6;
        default: return 7;
    }

}

function calculate(input){
    const output = getExpression(input);
    const result = counting(output);
    state.expression = result;
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
             while (!isOperator(input[i]))
             {
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
            let a = '';
            while ((input[i]!== " ") && (!isOperator(input[i]))) 
            {
                a += input[i]; 
                i++;
                if (i == input.length) {
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
                case '%': result = b % a; break;
                case '^': result = parseFloat(Math.pow(parseFloat(b.toString()), parseFloat(a.toString())).toString()); break;
                case 'sin': result = parseFloat(Math.sin(a));

            }
            temp.push(result); 
        }
    }
    return temp.pop(); 
}

function getExprJS(input){
    let oper = [];
    let inputArr = input.split(' ');
    return inputArr
        .reduce((output, token, index) => {
            if(!isNaN(parseInt(token))){
                output += token+' ';
            }
            else if(isOperator(token)){
                if(token === '('){
                    oper.push(token)
                }
                if(token === ')'){
                    let s = oper.pop();
                    while (s != '(')
                    {
                        output+= s.toString() + ' ';
                        s = oper.pop();
                    }
                }
                else {
                    if (oper.length > 0){
                        if (getPriority(token) <= getPriority(oper[oper.length - 1])){
                            output += oper.pop().toString() + " "; 
                        }
                    }
                    oper.push(token);
                }
                }
            if (index === inputArr.length-1){
                while(oper.length > 0) {
                    output+=oper.pop()+' ';
                }
                output = output.slice(0,-1);
            }
            return output;
            },'')
}


function countingJS(postfix){
    let temp = [];
    postfix
    .split(' ')
    .reduce((result,token) => {
        console.log(temp);
        if(!isNaN(parseInt(token))){
            temp.push(token);
        }
        else if (isOperator(token)){
            console.log('in operator: '+ temp);
            let a = parseFloat(temp.pop());
            let b = parseFloat(temp.pop());
            console.log('a = '+ a);
            console.log('b = '+ b);
            switch(token){
                case '+': result = b + a; break;
                case '-': result = b - a; break;
                case '*': result = b * a; break;
                case '/': result = b / a; break;
                case '%': result = b % a; break;
                case '^': result = parseFloat(Math.pow(parseFloat(b.toString()), parseFloat(a.toString())).toString()); break;
                case 'sin': result = parseFloat(Math.sin(a));
            }
            temp.push(result);
        }
        return result;

    },'')
    return temp.pop();
}


console.log(counting(getExpression('1+2*2')));
console.log(countingJS(getExprJS('-1.5 + 2')))