function drawKeyBoard(){
    const basic = document.querySelector('.basic');
    return appendNamedDiv(basic,'keyboard');
}

function drawRow(keyboard) {
    return appendNamedDiv(keyboard,'keyboard-row');
}

function drawButton(row, config,key) {
    const button = appendNamedDiv(row,'key');
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

function appendNamedDiv(parent,className) {
    const element = document.createElement('div');
    element.classList.add(className);
    parent.appendChild(element);
    return element;
}

export function render(keys){
    const keyboard = drawKeyBoard();
    let rows = {};
    const sortedKeys = Object.keys(keys).sort((a,b)=>{
        if(keys[a].rowId === keys[b].rowId){
            return keys[a].position-keys[b].position;

        }
        return keys[b].rowId-keys[a].rowId;
    });
    sortedKeys.forEach(key => {
        const keyConfig = keys[key];
        const rowId = keyConfig.rowId;
        if(!rows[rowId]) {
            rows[rowId] = drawRow(keyboard);
        }
        const row = rows[rowId];
        drawButton(row, keyConfig, key);
    })
}
