import { keys } from './model_config';

export default class Calculator {
  constructor() {
    this.state = {
      expression: '',
      keysArr: [],
      memory: 0,
      counted: false,
    };
  }

  processInput(value) {
    if (value === 'Enter') {
      this.processKey('=');
    } else if (value === 'Backspace') {
      this.processKey('c');
    } else {
      this.processKey(value);
    }

    return this.state.expression;
  }

  processKey(value) {
    if (value === '=') {
      this.state.counted = true;
      return this.calculate();
    } if (value === 'c') {
      return this.clearLastValue();
    } if (value === 'mr' || value === 'm+' || value === 'm-' || value === 'mc') {
      return this.processMemory(value);
    }
    if (this.state.counted && !this.isOperator(value)) {
      this.state.keysArr = [];
      this.state.counted = false;
    } else if (this.state.counted && this.isOperator(value)) {
      this.state.counted = false;
    }
    if (this.isConvertible(value)) {
      return this.convertOperation(value);
    }
    this.state.keysArr.push(value);
    return this.getExpression();
  }

  calculate() {
    const output = this.evaluate(this.transformToRPN(this.validate())).toString();
    if (Number.isNaN(output)) {
      this.state.keysArr = [];
      return this.setExpression('Error');
    }
    this.setExpression(output);
    this.state.keysArr = this.state.expression.split('');
    return this.getExpression();
  }

  processMemory(value) {
    if (value === 'mr') {
      this.state.keysArr = [];
      this.state.keysArr.push(...this.state.memory.toString().split(''));
      this.state.counted = true;
      return this.getExpression();
    } if (value === 'mc') {
      return this.setMemory(0);
    } if (value === 'm+' && this.state.counted) {
      return this.setMemory(this.state.memory + parseFloat(this.state.expression));
    } if (value === 'm-' && this.state.counted) {
      return this.setMemory(this.state.memory - parseFloat(this.state.expression));
    }
    return undefined;
  }

  transformToRPN(input) {
    const oper = [];
    const inputArr = input.split(' ');
    return inputArr
      .reduce((output, token, index) => {
        if (!Number.isNaN(parseInt(token))) {
          output += `${token} `;
        } else if (this.isOperator(token)) {
          if (token === '(') {
            oper.push(token);
          }
          if (token === ')') {
            let s = oper.pop();
            while (s !== '(') {
              output += `${s.toString()} `;
              s = oper.pop();
            }
          } else {
            if (oper.length > 0) {
              if (this.getPriority(token) <= this.getPriority(oper[oper.length - 1])) {
                output += `${oper.pop().toString()} `;
              }
            }
            oper.push(token);
          }
        }
        if (index === inputArr.length - 1) {
          while (oper.length > 0) {
            output += `${oper.pop()} `;
          }
          output = output.slice(0, -1);
        }
        return output;
      }, '');
  }

  validate() {
    const expression = this.state.keysArr;
    if (expression[0] === '-') {
      this.state.keysArr.unshift(0);
    }
    let outPut = expression.reduce((result, current) => {
      if (this.isOperator(current)) {
        return `${result.toString()} ${current.toString()} `;
      }
      return result.toString() + current.toString();
    }, '');

    if (outPut[0] === ' ') {
      outPut = outPut.slice(1);
    }
    if (outPut[outPut.length - 1] === ' ') {
      outPut = outPut.slice(0, -1);
    }

    return outPut.replace('  ', ' ');
  }

  convertOperation(value) {
    switch (value) {
      case '2^':
        this.state.keysArr.push('2', '^');
        break;
      case '^2':
        this.state.keysArr.push('^', '2');
        break;
      case '^3':
        this.state.keysArr.push('^', '3');
        break;
      case 'e^':
        this.state.keysArr.push('2', '.', '7', '1', '8', '2', '8', '^');
        break;
      case '10^':
        this.state.keysArr.push('1', '0', '^');
        break;
      case '1/':
        this.state.keysArr.push('1', '/');
        break;
      case 'e':
        this.state.keysArr.push('2', '.', '7', '1', '8', '2', '8');
        break;
      case 'π':
        this.state.keysArr.push('3', '.', '1', '4', '1', '5', '9');
        break;
      default:
        break;
    }
    return this.getExpression();
  }

  getPriority(value) {
    return keys[value].priority;
  }

  isOperator(value) {
    return keys[value].type === 'operator';
  }

  isConvertible(value) {
    return keys[value].convertible === true;
  }

  clearLastValue() {
    if (this.state.counted === true) {
      this.state.keysArr = [];
      this.state.counted = false;
    } else {
      this.state.keysArr.pop();
    }
    return this.getExpression();
  }

  getExpression() {
    return this.setExpression(this.state.keysArr.join(''));
  }

  setExpression(value) {
    this.state.expression = value;
  }

  setMemory(value) {
    this.state.memory = value;
  }

  evaluate(postfix) {
    const temp = [];
    postfix
      .split(' ')
      .reduce((result, token) => {
        if (!Number.isNaN(parseInt(token))) {
          temp.push(token);
        } else if (this.isOperator(token)) {
          const a = parseFloat(temp.pop());
          const b = this.isBinaryOperator(token) ? parseFloat(temp.pop()) : 0;
          if (token === '(') {
            return result;
          }

          result = this.operation(token, a, b);
          temp.push(result);
        }

        return result;
      }, '');
    return temp.pop();
  }

  operation(token, a, b) {
    switch (token) {
      case '+':
        return b + a;
      case '-':
        return b - a;
      case '*':
        return b * a;
      case '/':
        return b / a;
      case '%':
        return b % a;
      case '^':
        return parseFloat(b ** a);
      case '√':
        return parseFloat(a ** 1 / 2);
      case '∛':
        return parseFloat(a ** 1 / 3);
      case 'ln':
        return parseFloat(Math.log(a));
      case 'log':
        return parseFloat(Math.log10(a));
      case '!':
        return this.factorial(a);
      case 'sin':
        return parseFloat(Math.sin(a));
      case 'cos':
        return parseFloat(Math.cos(a));
      case 'tan':
        return parseFloat(Math.tan(a));
      case 'sinh':
        return parseFloat(Math.sinh(a));
      case 'cosh':
        return parseFloat(Math.cosh(a));
      case 'tanh':
        return parseFloat(Math.tanh(a));
      case 'rand':
        return a <= 1 ? Math.random() : Math.floor(Math.random() * (a - 1)) + 1;
      case 'root':
        return parseFloat(a ** 1 / b);
      default:
        return 'Error';
    }
  }

  isBinaryOperator(value) {
    return keys[value].binary === true;
  }

  factorial(n) {
    return (n !== 1) ? n * this.factorial(n - 1) : 1;
  }
}
