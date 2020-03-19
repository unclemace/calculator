import {keys} from './core.js';

export function calculate(input){
    const output = getExpression(input);
    console.log(output);
    return counting(output);
}

function getExpression(input){
    let oper = [];
    let inputArr = input.split(' ');
    return inputArr
        .reduce((output, token, index) => {
            if(!isNaN(parseInt(token))){
                output += token+' ';
            }
            else if(isOperator(token)){
                console.log(oper);
                if(token === '('){
                    oper.push(token)
                }
                if(token === ')'){
                    let s = oper.pop();
                    while (s !== '(')
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


export function counting(postfix){
    let temp = [];
    console.log(postfix);
    postfix
    .split(' ')
    .reduce((result,token,index) => {
        if(!isNaN(parseInt(token))){
            temp.push(token);
        }
        else if (isOperator(token)){
            let a = 0;
            let b = 0;
            if (token === '('){
                return result;
            }
            if (isBinaryOperator(token)){
                a = parseFloat(temp.pop());
                b = parseFloat(temp.pop());
                console.log('a = '+ a);
                console.log('b = '+ b);
            }else {
                a = parseFloat(temp.pop());
                console.log(a);
            }
            switch(token){
                case '+': result = b + a; break;
                case '-': result = b - a; break;
                case '*': result = b * a; break;
                case '/': result = b / a; break;
                case '%': result = b % a; break;
                case '^': result = parseFloat(Math.pow(b, a)); break;
                case '√': result = parseFloat(Math.pow(a, 1/2)); break;
                case '∛': result = parseFloat(Math.pow(a, 1/3)); break;
                case 'ln': result = parseFloat(Math.log(a)); break;
                case 'log': result = parseFloat(Math.log10(a)); break;
                case '!': result = factorial(a);break;
                case 'sin': result = parseFloat(Math.sin(a));break;
                case 'cos': result = parseFloat(Math.cos(a));break;
                case 'tan': result = parseFloat(Math.tan(a));break;
                case 'sinh': result = parseFloat(Math.sinh(a));break;
                case 'cosh': result = parseFloat(Math.cosh(a));break;
                case 'tanh': result = parseFloat(Math.tanh(a));break;
                case 'rand': a<=1?result = Math.random():result = Math.floor(Math.random() * (a - 1)) + 1;break;
                case  'root':result = parseFloat(Math.pow(a,1/b));break;
                default:break;
            }
            temp.push(result);
        }
        return result;

    },'');
    return temp.pop();
}

function factorial(n) {
    return (n !== 1) ? n * factorial(n - 1) : 1;
  }

function getPriority(value) {
    let priorityKey = Object.keys(keys).filter(key => keys[key].value === value);
    return keys[priorityKey].priority;
}

export function isOperator(value){
    const operators = Object.keys(keys).filter(key => keys[key].type === 'operator');
    return operators.some(key => keys[key].value === value);
}

export function isBinaryOperator(value){
    const operators = Object.keys(keys).filter(key => keys[key].binary === true);
    return operators.some(key => keys[key].value === value);
}