export const keysBasic = {
    '0': { type: 'number',rowId:0,position:0,doubleKey:true},
    '.': { type: 'number',rowId:0,position:1},
    '=': { type: 'operator',rowId:0,position:2, basicOperation:true},

    '1': { type: 'number',rowId:1,position:0},
    '2': { type: 'number',rowId:1,position:1},
    '3': { type: 'number',rowId:1,position:2},
    '+': { type: 'operator',rowId:1,position:3, basicOperation:true},

    '4': { type: 'number', rowId:2,position:0},
    '5': { type: 'number', rowId:2,position:1},
    '6': { type: 'number',rowId:2,position:2},
    '-': { type: 'operator',rowId:2,position:3, basicOperation:true},

    '7': { type: 'number',rowId:3,position:0},
    '8': { type: 'number',rowId:3,position:1},
    '9': { type: 'number', rowId:3,position:2},
    '*': { type: 'operator',rowId:3,position:3, basicOperation:true},

    'c':{type:'operator',rowId:4,position:0},
    '+-': { type: 'operator',rowId:4,position:1},
    '/':{type:'operator',rowId:4,position:3, basicOperation:true},
    '%':{type:'operator',rowId:4,position:2}
};

export const keysEngineer = {
    '(':{type:'operator',value:'(',rowId:4,position:0, priority: 0, binary: true, prefix: true},
    ')':{type:'operator',value:')',rowId:4,position:1, priority: 0, binary: true,prefix:false},
    'mc':{type:'operator',value:'mc',rowId:4,position:2},
    'm+':{type:'operator',value:'m+',rowId:4,position:3},
    'm-':{type:'operator',value:'m-',rowId:4,position:4},
    'mr':{type:'operator',value:'mr',rowId:4,position:5},
    'c':{type:'operator',value:'c',rowId:4,position:6},
    '+-': { type: 'operator',value:'+-',rowId:4,position:7},
    '%':{type:'operator',value:'%',rowId:4,position:8, binary: true, priority: 2},
    '/':{type:'operator',value:'/',rowId:4,position:9, basicOperation:true, binary: true, priority: 2},

    '2^':{type:'operator',rowId:3,position:0},
    '^2':{type:'operator',rowId:3,position:1},
    '^3':{type:'operator',rowId:3,position:2,},
    '^':{type:'operator',rowId:3,position:3},
    'e^':{type:'operator',rowId:3,position:4},
    '10^':{type:'operator',rowId:3,position:5 },
    '7': { type: 'number',rowId:3,position:6},
    '8': { type: 'number',rowId:3,position:7},
    '9': { type: 'number',rowId:3,position:8},
    '*': { type: 'operator',rowId:3,position:9,basicOperation:true},

    '1/':{type:'operator',rowId:2,position:0, binary: false, priority: 3, convertible:true, prefix:true},
    '√':{type:'operator',rowId:2,position:1, binary: false, priority: 3, prefix: true },
    '∛':{type:'operator',rowId:2,position:2, binary: false, priority: 3, prefix: true },
    'root':{type:'operator',rowId:2,position:3, binary: true, priority: 3},
    'ln':{type:'operator',rowId:2,position:4, binary: false, priority: 3, prefix: true },
    'log':{type:'operator',rowId:2,position:5, binary: false, priority: 3, prefix: true },
    '4': { type: 'number',rowId:2,position:6},
    '5': { type: 'number',rowId:2,position:7},
    '6': { type: 'number',rowId:2,position:8},
    '-': { type: 'operator',rowId:2,position:9, basicOperation:true, binary: true, priority: 1},

    '!':{type:'operator',rowId:1,position:0},
    'sin':{type:'operator',rowId:1,position:1},
    'cos':{type:'operator',rowId:1,position:2},
    'tan':{type:'operator',rowId:1,position:3},
    'e':{type:'operator',rowId:1,position:4},
    'EE':{type:'operator',rowId:1,position:5},
    '1': { type: 'number',rowId:1,position:6},
    '2': { type: 'number',rowId:1,position:7},
    '3': { type: 'number',rowId:1,position:8},
    '+': { type: 'operator',rowId:1,position:9, basicOperation:true},

    'rad':{type:'operator',rowId:0,position:0},
    'sinh':{type:'operator',rowId:0,position:1},
    'cosh':{type:'operator',rowId:0,position:2},
    'tanh':{type:'operator',rowId:0,position:3},
    'π':{type:'operator',rowId:0,position:4},
    'rand':{type:'operator',rowId:0,position:5},
    '0': { type: 'number',rowId:0,position:6,doubleKey:true},
    '.': { type: 'number',rowId:0,position:7},
    '=': { type: 'operator',rowId:0,position:8, basicOperation:true}
};

export const keysProgrammer = {
    'and':{type:'operator',value:'&&',rowId:5,position:0, binary: true},
    'or':{type:'operator',value:'||',rowId:5,position:1, binary: true},
    'd':{type:'number',value:'D',rowId:5,position:2},
    'e':{type:'number',value:'E',rowId:5,position:3},
    'f':{type:'number',value:'F',rowId:5,position:4},
    'ac':{type:'operator',value:'AC',rowId:5,position:5},
    'clear':{type:'operator',value:'C',rowId:5,position:6},

    'nor':{type:'operator',value:'NOR',rowId:4,position:0},
    'xor':{type:'operator',value:'XOR',rowId:4,position:1},
    'a':{type:'number',value:'A',rowId:4,position:2},
    'b':{type:'number',value:'B',rowId:4,position:3},
    'c':{type:'number',value:'C',rowId:4,position:4},
    'rol':{type:'operator',value:'Rol',rowId:4,position:5},
    'ror':{type:'operator',value:'RoR',rowId:4,position:6},

    'lShift':{type:'operator',value:'<<',rowId:3,position:0},
    'rShift':{type:'operator',value:'>>',rowId:3,position:1},
    'seven': { type: 'number',  value: 7,rowId:3,position:2},
    'eight': { type: 'number',  value: 8,rowId:3,position:3},
    'nine': { type: 'number',  value: 9,rowId:3,position:4},
    '2s':{type:'operator',value:"2's",rowId:3,position:5},
    '1s':{type:'operator',value:"1's",rowId:3,position:6},

    'xLShiftY':{type:'operator',value:'X< <Y',rowId:2,position:0},
    'xRShiftY':{type:'operator',value:'X>>Y',rowId:2,position:1},
    'four': { type: 'number',  value: 4,rowId:2,position:2},
    'five': { type: 'number',  value: 5,rowId:2,position:3},
    'six': { type: 'number',  value: 6,rowId:2,position:4},
    'division':{type:'operator',value:'/',rowId:2,position:5, basicOperation:true},
    'minus': { type: 'operator',value:'-',rowId:2,position:6, basicOperation:true},

    'byteFlip': { type: 'operator',value:'byte flip',rowId:1,position:0,doubleKey:true },
    'one': { type: 'number', value: 1,rowId:1,position:1},
    'two': { type: 'number',  value: 2,rowId:1,position:2},
    'three': { type: 'number',  value: 3,rowId:1,position:3},
    'multiply': { type: 'operator',value:'*',rowId:1,position:4, basicOperation:true},
    'plus': { type: 'operator',value:'+',rowId:1,position:5, basicOperation:true},

    'wordFlip': { type: 'operator',value:'word flip',rowId:0,position:0,doubleKey:true },
    'ff': { type: 'number', value: 'FF',rowId:0,position:1},
    'zero': { type: 'number', value: 0,rowId:0,position:2},
    'oo': { type: 'number', value:'00' ,rowId:0,position:3},
    'equal': { type: 'operator', value: '=',rowId:0,position:4,doubleKey:true, basicOperation:true}
};

