import Renderer from './render';

describe('Render module', () => {
  let renderInstance;

  beforeEach(() => {
    renderInstance = new Renderer();
  });

  describe('#appendNamedDiv', () => {
    it('should append div with classname to specific parent', () => {
      const parentClassName = 'main';
      const childClassName = 'child';
      document.body.innerHTML = `<div class="${parentClassName}"></div>`;
      const parentDiv = document.querySelector(`.${parentClassName}`);
      const element = renderInstance.appendNamedDiv(parentDiv, childClassName);
      const childDiv = document.querySelector(`.${childClassName}`);

      expect(element).toBeTruthy();
      expect(element.className).toEqual(childClassName);
      expect(childDiv).toBeTruthy();
    });
  });

  describe('#drawKeyBoard', () => {
    it('should append keyboard div to basic div', () => {
      const parentClassName = 'basic';
      const childClassName = 'keyboard';
      document.body.innerHTML = `<div class="${parentClassName}"></div>`;
      const element = renderInstance.drawKeyBoard();
      const childDiv = document.querySelector(`.${childClassName}`);

      expect(element).toBeTruthy();
      expect(element.className).toEqual(childClassName);
      expect(childDiv).toBeTruthy();
    });
  });

  describe('#drawRow', () => {
    it('should append row into keyboard', () => {
      const parentClassName = 'keyboard';
      const childClassName = 'keyboard-row';
      document.body.innerHTML = `<div class="${parentClassName}"></div>`;
      const parentDiv = document.querySelector(`.${parentClassName}`);
      const element = renderInstance.drawRow(parentDiv);
      const childDiv = document.querySelector(`.${childClassName}`);

      expect(element).toBeTruthy();
      expect(element.className).toEqual(childClassName);
      expect(childDiv).toBeTruthy();
    });
  });

  describe('#drawButton', () => {
    it('should draw basic button', () => {
      const config = { type: 'number' };
      const key = '1';
      const parentClassName = 'keyboard-row';
      const childClassName = 'key';
      document.body.innerHTML = `<div class="${parentClassName}"></div>`;
      const rowDiv = document.querySelector(`.${parentClassName}`);
      renderInstance.drawButton(rowDiv, config, key);
      const buttonDiv = document.querySelector(`.${childClassName}`);

      expect(buttonDiv).toBeTruthy();
      expect(buttonDiv.classList.contains(`${config.type}-key`)).toBeTruthy();
      expect(buttonDiv.id).toEqual(key);
      expect(buttonDiv.innerHTML).toEqual(key);
    });

    it('should draw double-key button', () => {
      const config = { type: 'operation', doubleKey: true };
      const key = '=';
      const parentClassName = 'keyboard-row';
      const childClassName = 'key';
      const doubleKeyClassName = 'double-key';
      document.body.innerHTML = `<div class="${parentClassName}"></div>`;
      const rowDiv = document.querySelector(`.${parentClassName}`);
      renderInstance.drawButton(rowDiv, config, key);
      const buttonDiv = document.querySelector(`.${childClassName}`);

      expect(buttonDiv).toBeTruthy();
      expect(buttonDiv.classList.contains(doubleKeyClassName)).toBeTruthy();
    });

    it('should draw basic-operation button', () => {
      const config = { type: 'operation', basicOperation: true };
      const key = '+';
      const parentClassName = 'keyboard-row';
      const childClassName = 'key';
      const basicOperationClassName = 'basic-operation';
      document.body.innerHTML = `<div class="${parentClassName}"></div>`;
      const rowDiv = document.querySelector(`.${parentClassName}`);
      renderInstance.drawButton(rowDiv, config, key);
      const buttonDiv = document.querySelector(`.${childClassName}`);

      expect(buttonDiv).toBeTruthy();
      expect(buttonDiv.classList.contains(basicOperationClassName)).toBeTruthy();
    });
  });
  describe('#render', () => {
    it('should render keys', () => {
      const keys = {
        0: {
          type: 'number', rowId: 0, position: 0, doubleKey: true,
        },
        '.': { type: 'number', rowId: 0, position: 1 },
        '=': {
          type: 'operator', rowId: 0, position: 2, basicOperation: true,
        },

        1: { type: 'number', rowId: 1, position: 0 },
        2: { type: 'number', rowId: 1, position: 1 },
        3: { type: 'number', rowId: 1, position: 2 },
        '+': {
          type: 'operator', rowId: 1, position: 3, basicOperation: true,
        },
      };
      document.body.innerHTML = '<div class=\'basic\'></div>';
      renderInstance.render(keys);
      const keyBoard = document.querySelector('.keyboard');
      const keyBoardRow = document.getElementsByClassName('keyboard-row');

      expect(keyBoard).toBeTruthy();
      expect(keyBoardRow).toHaveLength(2);
    });
  });
});
