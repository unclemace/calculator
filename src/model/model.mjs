import {keys} from './model_config.mjs';

export function processInput(value) {
    if (value === 'Enter'){
        processKey('=')
    }
    else if (value === 'Backspace'){
        processKey('c');
    }else {
        processKey(value);
    }
   
    return state.expression;
}

let state = {
    expression:'',
    keysArr:[],
    memory:0,
    counted: false
};

function processKey(value){
    if (value === '='){
        state.counted = true;
        return calculate();
    }
    else if (value === 'c'){
        return clearLastValue();
    }
    else if (value === 'mr' || value === 'm+' || value === 'm-' || value === 'mc'){
        return processMemory(value);
    }
    else{
        if (state.counted === true && !isOperator(value)){
            state.keysArr = [];
            state.counted = false;
        }
        else if (state.counted === true && isOperator(value)){
            state.counted = false;
        }
        if ( isConvertible(value)){
            return convertOperation(value);
        }
        state.keysArr.push(value);
        return getExpression();
    }
}

function calculate(){
    let output = counting(transformToRPN(validate())).toString();
    if(isNaN(output)){
        state.keysArr = [];
        return setExpression('Error');
    }else {
        setExpression(output);
        state.keysArr = state.expression.split(''); 
        return getExpression();
    }
}

function processMemory(value) {
    if(value === 'mr'){
        state.keysArr = [];
        state.keysArr.push(...state.memory.toString().split(''));
        state.counted = true;
        return getExpression();
    }
    else if(value === 'mc'){
        return setMemory(0);
    }
    else if ( value === 'm+'){
        if(state.counted === true){
            return setMemory(state.memory + parseFloat(state.expression));
        }
    }
    else if ( value === 'm+'){
        if(state.counted === true){
            return setMemory(state.memory - parseFloat(state.expression));
        }
    }
}

function transformToRPN(input) {
    let oper = [];
    let inputArr = input.split(' ');
    return inputArr
        .reduce((output, token, index) => {
            if (!isNaN(parseInt(token))) {
                output += token + ' ';
            } else if (isOperator(token)) {
                if (token === '(') {
                    oper.push(token)
                }
                if (token === ')') {
                    let s = oper.pop();
                    while (s !== '(') {
                        output += s.toString() + ' ';
                        s = oper.pop();
                    }
                } else {
                    if (oper.length > 0) {
                        if (getPriority(token) <= getPriority(oper[oper.length - 1])) {
                            output += oper.pop().toString() + " ";
                        }
                    }
                    oper.push(token);
                }
            }
            if (index === inputArr.length - 1) {
                while (oper.length > 0) {
                    output += oper.pop() + ' ';
                }
                output = output.slice(0, -1);
            }
            return output;
        }, '')
}

function counting(postfix) {
    let temp = [];
    postfix
        .split(' ')
        .reduce((result, token) => {
            if (!isNaN(parseInt(token))) {
                temp.push(token);
            } else if (isOperator(token)) {
                let a = 0;
                let b = 0;
                if (token === '(') {
                    return result;
                }
                if (isBinaryOperator(token)) {
                    a = parseFloat(temp.pop());
                    b = parseFloat(temp.pop());
                } else {
                    a = parseFloat(temp.pop());
                }
                switch (token) {
                    case '+':
                        result = b + a;
                        break;
                    case '-':
                        result = b - a;
                        break;
                    case '*':
                        result = b * a;
                        break;
                    case '/':
                        result = b / a;
                        break;
                    case '%':
                        result = b % a;
                        break;
                    case '^': 
                        result = parseFloat(Math.pow(b, a)); 
                        break;
                    case '√': 
                        result = parseFloat(Math.pow(a, 1/2)); 
                        break;
                    case '∛':
                        result = parseFloat(Math.pow(a, 1/3));
                        break;
                    case 'ln':
                        result = parseFloat(Math.log(a));
                        break;
                    case 'log':
                        result = parseFloat(Math.log10(a));
                        break;
                    case '!':
                        result = factorial(a);
                        break;
                    case 'sin':
                        result = parseFloat(Math.sin(a));
                        break;
                    case 'cos':
                        result = parseFloat(Math.cos(a));
                        break;
                    case 'tan':
                        result = parseFloat(Math.tan(a));
                        break;
                    case 'sinh':
                        result = parseFloat(Math.sinh(a));
                        break;
                    case 'cosh':
                        result = parseFloat(Math.cosh(a));
                        break;
                    case 'tanh':
                        result = parseFloat(Math.tanh(a));
                        break;
                    case 'rand':
                        a<=1?result = Math.random():result = Math.floor(Math.random() * (a - 1)) + 1;
                        break;
                    case 'root':
                        result = parseFloat(Math.pow(a,1/b));
                        break;
                    default:
                        break;
                }
                temp.push(result);
            }
            return result;

        }, '');
    return temp.pop();
}

function factorial(n) {
    return (n !== 1) ? n * factorial(n - 1) : 1;
}

function validate(){
    let expresion = state.keysArr;
    if (expresion[0] === '-'){
        state.keysArr.unshift(0);
    }
    let outPut = expresion.reduce((result,current) => {
        if(isOperator(current)){
            return result.toString() + ' ' + current.toString() + ' ';
        }
        else {
            return result.toString() + current.toString();
        }
    },'');

    if (outPut[0] === ' '){
        outPut = outPut.slice(1);
    }
    if (outPut[outPut.length-1] === ' '){
        outPut = outPut.slice(0,-1);
    }
    return outPut.replace('  ', ' ');
}

function convertOperation(value){
   switch (value) {
       case '2^':
           state.keysArr.push('2', '^');
           break;
        case '^2':
           state.keysArr.push('^','2');
           break;
        case '^3':
           state.keysArr.push('^','3');
           break;
        case 'e^':
           state.keysArr.push('2','.','7','1','8','2','8','^');
           break;
        case '10^':
            state.keysArr.push('1','0','^');
            break;
        case '1/':
            state.keysArr.push('1','/');
            break;
        case 'e':
            state.keysArr.push('2','.','7','1','8','2','8');
            break;
        case 'π':
            state.keysArr.push('3','.','1','4','1','5','9');
            break;
       default:
           break;
   }
   return getExpression();
}
          
function getPriority(value) {
    return keys[value].priority;
}

function isOperator(value) {
    return keys[value].type === 'operator';
}

function isBinaryOperator(value) {
    return keys[value].binary === true;
}

function isConvertible(value) {
    return keys[value].convertible === true;
}

function clearLastValue() {
    if (state.counted === true ){
        state.keysArr = [];
        state.counted = false;
    }else {
        state.keysArr.pop();
    }
    return getExpression();
}

function getExpression(){
    setExpression(state.keysArr.join(''));
}

function setExpression(value){
    state.expression = value;
}

function setMemory(value){
    state.memory = value;
}

