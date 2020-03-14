import {isOperator} from './core.mjs'

export function calculate(input){
    const output = getExpression(input);
    const result = counting(output);
    return result;
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


export function counting(postfix){
    let temp = [];
    postfix
    .split(' ')
    .reduce((result,token,index) => {
        if(!isNaN(parseInt(token))){
            temp.push(token);
            // console.log(temp);
        }
        else if (isOperator(token)){
            console.log(temp);
            let a = parseFloat(temp.pop());
            let b = parseFloat(temp.pop());
            console.log('a' + a);
            console.log('b' + b);
            switch(token){
                case '+': result = b + a; break;
                case '-': result = b - a; break;
                case '*': result = b * a; break;
                case '/': result = b / a; break;
                case '%': result = b % a; break;
                case '^': result = parseFloat(Math.pow(parseFloat(b.toString()), parseFloat(a.toString())).toString()); break;
                case 'sin': result = parseFloat(Math.sin(a));break;
                case 'cos': result = parseFloat(Math.cos(a));break;

            }
            temp.push(result);
        }
        return result;

    },'')
    return temp.pop();
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
        case 'sin': return 7;
        case 'cos': return 8;

        default: return 9;
    }

}





// function counting(input)
// {
//     let result = 0; 
//     let temp = []; 
//     for (let i = 0; i < input.length; i++) 
//     {
//         if (!isNaN(parseInt(input[i]))) 
//         {
//             let a = '';
//             while ((input[i]!== " ") && (!isOperator(input[i]))) 
//             {
//                 a += input[i]; 
//                 i++;
//                 if (i == input.length) {
//                     break;
//                 }
//             }
//             temp.push(parseFloat(a)); 
//             i--;
//         }
//         else if (isOperator(input[i])) 
//         {
            
//             let a = temp.pop(); 
//             let b = temp.pop();

//             switch (input[i]) 
//             { 
//                 case '+': result = b + a; break;
//                 case '-': result = b - a; break;
//                 case '*': result = b * a; break;
//                 case '/': result = b / a; break;
//                 case '%': result = b % a; break;
//                 case '^': result = parseFloat(Math.pow(parseFloat(b.toString()), parseFloat(a.toString())).toString()); break;
//                 case 'sin': result = parseFloat(Math.sin(a));

//             }
//             temp.push(result); 
//         }
//     }
//     return temp.pop(); 
// }


// function getExpression(input)
// {
//    let output = '';
//    let operators = [];
//     for (let i = 0; i < input.length; i++)
//     { 
//         if (!isNaN(parseInt(input[i])))
//         {
//              while (!isOperator(input[i]))
//              {
//                  output+=input[i];
//                  i++;
//                  if (i == input.length){
//                      break;
//                  } 
//              }
//              output+=' '; 
//              i--;
//         }
//         if (isOperator(input[i])) 
//         {
//             if (input[i] == '('){
//                 operators.push(input[i]);
//             }
//             else if (input[i] == ')')
//             {
//                 let s = operators.pop();

//                 while (s != '(')
//                 {
//                     output += s.toString() + ' ';
//                     s = operators.pop();
//                 }
//             }
//             else 
//             {
//                 if (operators.length > 0)
//                     if (getPriority(input[i]) <= getPriority(operators[operators.length - 1])){
//                         output += operators.pop().toString() + " "; 
//                     }
//                 operators.push(input[i].toString());
//             }
//         }
//     }

//     while (operators.length > 0)
//         output += operators.pop() + " ";

//     return output; 

// }
