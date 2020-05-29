import {sortKeys} from "../utils/utils";


export class Renderer {
    drawKeyBoard(){
        const basic = document.querySelector('.basic');
        return this.appendNamedDiv(basic,'keyboard');
    }

    drawRow(keyboard) {
        return this.appendNamedDiv(keyboard,'keyboard-row');
    }

    drawButton(row, config, key) {
        const button = this.appendNamedDiv(row,'key');
        button.classList.add(`${config.type}-key`);
        button.id = key;
        button.innerHTML = key;
        if(config.doubleKey){
            button.classList.add('double-key');
        }
        if(config.basicOperation){
            button.classList.add('basic-operation');
        }
    }

    appendNamedDiv(parent,className) {
        const element = document.createElement('div');
        element.classList.add(className);
        parent.appendChild(element);
        return element;
    }

    render(keys){
        const keyboard = this.drawKeyBoard();
        let rows = {};
        const sortedKeys = sortKeys(keys);
        sortedKeys.forEach(key => {
            const keyConfig = keys[key];
            const rowId = keyConfig.rowId;
            if(!rows[rowId]) {
                rows[rowId] = this.drawRow(keyboard);
            }
            const row = rows[rowId];
            this.drawButton(row, keyConfig, key);
        })
    }

}
