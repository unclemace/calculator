// eslint-disable-next-line no-unused-vars
import transformer from 'babel-jest';
import { Calculator } from './model';

describe('Model module', () => {
  let calculatorInstance;

  beforeEach(() => {
    calculatorInstance = new Calculator();
  });

  it('should set default state after instance init', () => {
    const defaultState = {
      expression: '',
      keysArr: [],
      memory: 0,
      counted: false,
    };

    expect(calculatorInstance.state).toEqual(defaultState);
  });

  describe('#processInput', () => {
    let processKeySpy;

    beforeEach(() => {
      processKeySpy = jest.spyOn(calculatorInstance, 'processKey').mockImplementation();
    });

    afterEach(() => {
      processKeySpy.mockRestore();
    });

    it('should process Enter key', () => {
      const value = 'Enter';
      const expectedParameter = '=';
      const stateExpresion = calculatorInstance.state.expression;

      const result = calculatorInstance.processInput(value);

      expect(result).toEqual(stateExpresion);
      expect(calculatorInstance.processKey).toHaveBeenCalledTimes(1);
      expect(calculatorInstance.processKey).toHaveBeenCalledWith(expectedParameter);
    });

    it('should process Backspace key', () => {
      const value = 'Backspace';
      const expectedParameter = 'c';
      const stateExpresion = calculatorInstance.state.expression;

      const result = calculatorInstance.processInput(value);

      expect(result).toEqual(stateExpresion);
      expect(calculatorInstance.processKey).toHaveBeenCalledTimes(1);
      expect(calculatorInstance.processKey).toHaveBeenCalledWith(expectedParameter);
    });

    it('should process any other key', () => {
      const value = '1';
      const expectedParameter = value;
      const stateExpresion = calculatorInstance.state.expression;

      const result = calculatorInstance.processInput(value);

      expect(result).toEqual(stateExpresion);
      expect(calculatorInstance.processKey).toHaveBeenCalledTimes(1);
      expect(calculatorInstance.processKey).toHaveBeenCalledWith(expectedParameter);
    });
  });
  describe('#processKey', () => {
    let getExpressionSpy;

    beforeEach(() => {
      getExpressionSpy = jest.spyOn(calculatorInstance, 'getExpression').mockImplementation();
    });

    afterEach(() => {
      getExpressionSpy.mockRestore();
    });

    it('should process equal symbol', () => {
      const calculateSpy = jest.spyOn(calculatorInstance, 'calculate').mockImplementation();
      const value = '=';
      calculatorInstance.processKey(value);

      expect(calculatorInstance.state.counted).toEqual(true);
      expect(calculatorInstance.calculate).toHaveBeenCalled();

      calculateSpy.mockRestore();
    });
    it('should process c symbol', () => {
      const clearSpy = jest.spyOn(calculatorInstance, 'clearLastValue').mockImplementation();
      const value = 'c';
      calculatorInstance.processKey(value);

      expect(calculatorInstance.clearLastValue).toHaveBeenCalled();

      clearSpy.mockRestore();
    });

    it('should process memory symbols', () => {
      const processMemorySpy = jest.spyOn(calculatorInstance, 'processMemory').mockImplementation();
      const value = 'mr';
      calculatorInstance.processKey(value);

      expect(calculatorInstance.processMemory).toHaveBeenCalledWith('mr');

      processMemorySpy.mockRestore();
    });
    it('should process not operator after counting', () => {
      const value = '1';
      calculatorInstance.state.counted = true;
      calculatorInstance.processKey(value);

      expect(calculatorInstance.state.counted).toEqual(false);
      expect(calculatorInstance.state.keysArr).toEqual([value]);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });

    it('should process operator after counting', () => {
      const value = '+';
      calculatorInstance.state.counted = true;
      calculatorInstance.processKey(value);

      expect(calculatorInstance.state.counted).toEqual(false);
      expect(calculatorInstance.state.keysArr).toEqual([value]);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should process convertible symbol', () => {
      const convertOperationSpy = jest.spyOn(calculatorInstance, 'convertOperation').mockImplementation();
      const value = 'e';
      calculatorInstance.processKey(value);

      expect(calculatorInstance.convertOperation).toHaveBeenCalled();

      convertOperationSpy.mockRestore();
    });
  });
  describe('#calculate', () => {
    let setExpressionSpy;
    let transformToRPNSpy;
    let validateSpy;

    beforeEach(() => {
      setExpressionSpy = jest.spyOn(calculatorInstance, 'setExpression').mockImplementation();
      transformToRPNSpy = jest.spyOn(calculatorInstance, 'transformToRPN').mockImplementation();
      validateSpy = jest.spyOn(calculatorInstance, 'validate').mockImplementation();
    });

    afterEach(() => {
      setExpressionSpy.mockRestore();
      transformToRPNSpy.mockRestore();
      validateSpy.mockRestore();
    });

    it('should process NaN output ', () => {
      const evaluateSpy = jest.spyOn(calculatorInstance, 'evaluate').mockImplementation(() => NaN);
      calculatorInstance.calculate();

      expect(calculatorInstance.state.keysArr).toEqual([]);
      expect(calculatorInstance.setExpression).toHaveBeenCalled();

      evaluateSpy.mockRestore();
    });
    it('should process any other output ', () => {
      const getExpressionSpy = jest.spyOn(calculatorInstance, 'getExpression').mockImplementation();
      const evaluateSpy = jest.spyOn(calculatorInstance, 'evaluate').mockImplementation(() => 32);
      calculatorInstance.calculate();

      expect(calculatorInstance.setExpression).toHaveBeenCalled();
      expect(calculatorInstance.state.keysArr).toEqual(calculatorInstance.state.expression.split(''));
      expect(calculatorInstance.getExpression).toHaveBeenCalled();

      getExpressionSpy.mockRestore();
      evaluateSpy.mockRestore();
    });
  });
  describe('#processMemory', () => {
    let getExpressionSpy;
    let setMemorySpy;

    beforeEach(() => {
      getExpressionSpy = jest.spyOn(calculatorInstance, 'getExpression').mockImplementation();
      setMemorySpy = jest.spyOn(calculatorInstance, 'setMemory').mockImplementation();
    });

    afterEach(() => {
      getExpressionSpy.mockRestore();
      setMemorySpy.mockRestore();
    });

    it('should process mr value', () => {
      const value = 'mr';
      calculatorInstance.processMemory(value);

      expect(calculatorInstance.state.keysArr).toEqual(calculatorInstance.state.memory.toString().split(''));
      expect(calculatorInstance.state.counted).toEqual(true);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should process mc value', () => {
      const value = 'mc';
      calculatorInstance.processMemory(value);

      expect(calculatorInstance.setMemory).toHaveBeenCalled();
    });

    it('should process m+ value', () => {
      const value = 'm+';
      calculatorInstance.state.counted = true;
      calculatorInstance.processMemory(value);
      expect(calculatorInstance.setMemory).toHaveBeenCalled();
    });
    it('should process m- value', () => {
      const value = 'm-';
      calculatorInstance.state.counted = true;
      calculatorInstance.processMemory(value);
      expect(calculatorInstance.setMemory).toHaveBeenCalled();
    });
  });
  describe('#validate', () => {
    it('should transform expresion with - in first place', () => {
      calculatorInstance.state.keysArr = ['-', '2', '+', '3'];
      const result = calculatorInstance.validate();

      expect(result).toEqual('0 - 2 + 3');
    });
    it('should transform expresion with spaces at start and at end', () => {
      calculatorInstance.state.keysArr = ['(', '2', '+', '3', ')'];
      const result = calculatorInstance.validate();

      expect(result).toEqual('( 2 + 3 )');
    });
  });
  describe('#convertOperation', () => {
    let getExpressionSpy;

    beforeEach(() => {
      getExpressionSpy = jest.spyOn(calculatorInstance, 'getExpression').mockImplementation();
    });

    afterEach(() => {
      getExpressionSpy.mockRestore();
    });

    it('should convert 2^', () => {
      const value = '2^';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['2', '^']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert ^2', () => {
      const value = '^2';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['^', '2']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert ^3', () => {
      const value = '^3';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['^', '3']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert e^', () => {
      const value = 'e^';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['2', '.', '7', '1', '8', '2', '8', '^']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert 10^', () => {
      const value = '10^';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['1', '0', '^']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert 1/', () => {
      const value = '1/';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['1', '/']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert e', () => {
      const value = 'e';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['2', '.', '7', '1', '8', '2', '8']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert π', () => {
      const value = 'π';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual(['3', '.', '1', '4', '1', '5', '9']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should convert any other operation', () => {
      const value = '-';
      calculatorInstance.state.keysArr = [];
      calculatorInstance.convertOperation(value);

      expect(calculatorInstance.state.keysArr).toEqual([]);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
  });
  describe('#clearLastValue', () => {
    let getExpressionSpy;

    beforeEach(() => {
      getExpressionSpy = jest.spyOn(calculatorInstance, 'getExpression').mockImplementation();
    });
    afterEach(() => {
      getExpressionSpy.mockRestore();
    });
    it('should clear values after counting', () => {
      calculatorInstance.state.counted = true;

      calculatorInstance.clearLastValue();

      expect(calculatorInstance.state.keysArr).toEqual([]);
      expect(calculatorInstance.state.counted).toEqual(false);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
    it('should clear values at any other cases', () => {
      calculatorInstance.state.counted = false;
      calculatorInstance.state.keysArr = ['1', '+', '3'];
      calculatorInstance.clearLastValue();

      expect(calculatorInstance.state.keysArr).toEqual(['1', '+']);
      expect(calculatorInstance.getExpression).toHaveBeenCalled();
    });
  });
  describe('#getExpression', () => {
    it('should get expression', () => {
      const setExpression = jest.spyOn(calculatorInstance, 'setExpression').mockImplementation();
      calculatorInstance.state.keysArr = ['1', '+', '3'];
      calculatorInstance.getExpression();
      expect(calculatorInstance.setExpression).toHaveBeenCalledWith('1+3');
      setExpression.mockRestore();
    });
  });
  describe('#setExpression', () => {
    it('should set expression', () => {
      const value = '1+3';
      calculatorInstance.setExpression(value);
      expect(calculatorInstance.state.expression).toEqual('1+3');
    });
  });
  describe('#setMemory', () => {
    it('should set memory', () => {
      const value = '33';
      calculatorInstance.setMemory(value);
      expect(calculatorInstance.state.memory).toEqual('33');
    });
  });
  describe('#operation', () => {
    it('should evaluate + operation', () => {
      const a = 3;
      const b = 4;
      expect(calculatorInstance.operation('+', a, b)).toEqual(7);
    });
    it('should evaluate - operation', () => {
      const a = 3;
      const b = 4;
      expect(calculatorInstance.operation('-', a, b)).toEqual(1);
    });
    it('should evaluate * operation', () => {
      const a = 3;
      const b = 4;
      expect(calculatorInstance.operation('*', a, b)).toEqual(12);
    });
    it('should evaluate / operation', () => {
      const a = 4;
      const b = 4;
      expect(calculatorInstance.operation('/', a, b)).toEqual(1);
    });
    it('should evaluate % operation', () => {
      const a = 3;
      const b = 4;
      expect(calculatorInstance.operation('%', a, b)).toEqual(1);
    });
    it('should evaluate ^ operation', () => {
      const a = 3;
      const b = 2;
      expect(calculatorInstance.operation('^', a, b)).toEqual(8);
    });
    it('should evaluate √ operation', () => {
      const a = 4;
      const b = 4;
      expect(calculatorInstance.operation('√', a, b)).toEqual(2);
    });
    it('should evaluate ∛ operation', () => {
      const a = 8;
      const b = 4;
      expect(calculatorInstance.operation('∛', a, b)).toEqual(2);
    });
    it('should evaluate ln operation', () => {
      const a = 1;
      const b = 4;
      expect(calculatorInstance.operation('ln', a, b)).toEqual(0);
    });
    it('should evaluate log operation', () => {
      const a = 10;
      const b = 4;
      expect(calculatorInstance.operation('log', a, b)).toEqual(1);
    });
    it('should evaluate ! operation', () => {
      const a = 3;
      const b = 4;
      expect(calculatorInstance.operation('!', a, b)).toEqual(6);
    });
    it('should evaluate sin operation', () => {
      const a = 1;
      const b = 4;
      expect(calculatorInstance.operation('sin', a, b)).toEqual(0.8414709848078965);
    });
    it('should evaluate cos operation', () => {
      const a = 1;
      const b = 4;
      expect(calculatorInstance.operation('cos', a, b)).toEqual(0.5403023058681398);
    });
    it('should evaluate tan operation', () => {
      const a = 1;
      const b = 4;
      expect(calculatorInstance.operation('tan', a, b)).toEqual(1.5574077246549023);
    });
    it('should evaluate sinh operation', () => {
      const a = 1;
      const b = 4;
      expect(calculatorInstance.operation('sinh', a, b)).toEqual(1.1752011936438014);
    });
    it('should evaluate cosh operation', () => {
      const a = 1;
      const b = 4;
      expect(calculatorInstance.operation('cosh', a, b)).toEqual(1.5430806348152437);
    });
    it('should evaluate tanh operation', () => {
      const a = 1;
      const b = 4;
      expect(calculatorInstance.operation('tanh', a, b)).toEqual(0.7615941559557649);
    });
    it('should evaluate rand operation', () => {
      const a = 2;
      const b = 2;
      expect(calculatorInstance.operation('rand', a, b)).toEqual(1);
    });
    it('should evaluate root operation', () => {
      const a = 8;
      const b = 3;
      expect(calculatorInstance.operation('root', a, b)).toEqual(2);
    });
    it('should evaluate any other operation', () => {
      const a = 8;
      const b = 3;
      expect(calculatorInstance.operation('rasda', a, b)).toEqual('Error');
    });
  });
  describe('#isBinaryOperator', () => {
    it('should define binary operations', () => {
      const value = '+';
      expect(calculatorInstance.isBinaryOperator(value)).toEqual(true);
    });
  });
  describe('#getPriority', () => {
    it('should define priority of operation', () => {
      const value = '+';
      expect(calculatorInstance.getPriority(value)).toEqual(1);
    });
  });
  describe('#factorial', () => {
    it('should evaluate factorial', () => {
      const value = 3;
      expect(calculatorInstance.factorial(value)).toEqual(6);
    });
  });

  describe('#transformToRPN', () => {
    it('should transform to RPN', () => {
      const input = '( 1 + 2 ) * 3';
      expect(calculatorInstance.transformToRPN(input)).toEqual('( 1 2 + 3 *');
    });
  });

  describe('#evaluate', () => {
    it('should evaluate postfix form', () => {
      const postfix = '( 1 2 + 3 *';
      expect(calculatorInstance.evaluate(postfix)).toEqual(9);
    });
  });
});
