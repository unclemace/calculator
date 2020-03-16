export const keysBasic = {
    'zero': { type: 'number', value: 0,rowId:0,position:0,doubleKey:true},
    'dot': { type: 'number',value:'.',rowId:0,position:1},
    'equal': { type: 'operator',value:'=',rowId:0,position:2, basicOperation:true},

    'one': { type: 'number', value: 1,rowId:1,position:0},
    'two': { type: 'number',  value: 2,rowId:1,position:1},
    'three': { type: 'number',  value: 3,rowId:1,position:2},
    'plus': { type: 'operator',value:'+',rowId:1,position:3, basicOperation:true, binary: true, priority: 1},

    'four': { type: 'number',  value: 4,rowId:2,position:0},
    'five': { type: 'number',  value: 5,rowId:2,position:1},
    'six': { type: 'number',  value: 6,rowId:2,position:2},
    'minus': { type: 'operator',value:'-',rowId:2,position:3, basicOperation:true, binary: true, priority: 1},

    'seven': { type: 'number',  value: 7,rowId:3,position:0},
    'eight': { type: 'number',  value: 8,rowId:3,position:1},
    'nine': { type: 'number',  value: 9,rowId:3,position:2},
    'multiply': { type: 'operator',value:'*',rowId:3,position:3, basicOperation:true, binary: true, priority: 2},

    'clear':{type:'operator',value:'c',rowId:4,position:0},
    'plus-minus': { type: 'operator',value:'+-',rowId:4,position:1},
    'division':{type:'operator',value:'/',rowId:4,position:3, basicOperation:true, binary: true, priority: 2},
    'percent':{type:'operator',value:'%',rowId:4,position:2, binary: true, priority: 2}
};

export const keysEngineer = {
    'lscope':{type:'operator',value:'(',rowId:4,position:0,binary: false, priority: 0},
    'rscope':{type:'operator',value:')',rowId:4,position:1, priority: 0, binary: false},
    'mc':{type:'operator',value:'mc',rowId:4,position:2},
    'mplus':{type:'operator',value:'m+',rowId:4,position:3},
    'mminus':{type:'operator',value:'m-',rowId:4,position:4},
    'mr':{type:'operator',value:'mr',rowId:4,position:5},
    'clear':{type:'operator',value:'c',rowId:4,position:6},
    'plus-minus': { type: 'operator',value:'+-',rowId:4,position:7},
    'percent':{type:'operator',value:'%',rowId:4,position:8, binary: true, priority: 2},
    'division':{type:'operator',value:'/',rowId:4,position:9, basicOperation:true, binary: true, priority: 2},

    '2nd':{type:'operator',value:'2^',rowId:3,position:0,binary: false, priority:3, convertible:true},
    'square':{type:'operator',value:'^2',rowId:3,position:1, binary: false, priority: 3, convertible:true},
    'cube':{type:'operator',value:'^3',rowId:3,position:2, binary: false, priority:3 , convertible:true},
    'xy':{type:'operator',value:'^',rowId:3,position:3, binary: true, priority: 3},
    'ex':{type:'operator',value:'e^',rowId:3,position:4, binary: true, priority: 3, convertible:true},
    '10x':{type:'operator',value:'10^',rowId:3,position:5, binary: false, priority: 3, convertible:true},
    'seven': { type: 'number',  value: 7,rowId:3,position:6},
    'eight': { type: 'number',  value: 8,rowId:3,position:7},
    'nine': { type: 'number',  value: 9,rowId:3,position:8},
    'multiply': { type: 'operator',value:'*',rowId:3,position:9, basicOperation:true, binary: true, priority: 2},

    '1-div-x':{type:'operator',value:'1/',rowId:2,position:0, binary: true, priority: 3, convertible:true},
    'squareRoot':{type:'operator',value:'√',rowId:2,position:1, binary: false, priority: 3},
    'cubeRoot':{type:'operator',value:'∛',rowId:2,position:2, binary: false, priority: 3},
    'nRoot':{type:'operator',value:'',rowId:2,position:3, binary: true, priority: 3},
    'ln':{type:'operator',value:'ln',rowId:2,position:4, binary: false, priority: 3},
    'log':{type:'operator',value:'log',rowId:2,position:5, binary: false, priority: 3},
    'four': { type: 'number',  value: 4,rowId:2,position:6},
    'five': { type: 'number',  value: 5,rowId:2,position:7},
    'six': { type: 'number',  value: 6,rowId:2,position:8},
    'minus': { type: 'operator',value:'-',rowId:2,position:9, basicOperation:true, binary: true, priority: 1},

    'fact':{type:'operator',value:'!',rowId:1,position:0, binary: false, priority: 3},
    'sin':{type:'operator',value:'sin',rowId:1,position:1, binary: false, priority: 3},
    'cos':{type:'operator',value:'cos',rowId:1,position:2, binary: false, priority: 3},
    'tan':{type:'operator',value:'tan',rowId:1,position:3, binary: false, priority: 3},
    'e':{type:'operator',value:'e',rowId:1,position:4, convertible:true},
    'EE':{type:'operator',value:'EE',rowId:1,position:5},
    'one': { type: 'number', value: 1,rowId:1,position:6},
    'two': { type: 'number',  value: 2,rowId:1,position:7},
    'three': { type: 'number',  value: 3,rowId:1,position:8},
    'plus': { type: 'operator',value:'+',rowId:1,position:9, basicOperation:true, binary: true, priority: 1},

    'rad':{type:'operator',value:'rad',rowId:0,position:0, binary: false},
    'sinh':{type:'operator',value:'sinh',rowId:0,position:1, binary: false, priority: 3},
    'cosh':{type:'operator',value:'cosh',rowId:0,position:2, binary: false, priority: 3},
    'tanh':{type:'operator',value:'tanh',rowId:0,position:3, binary: false, priority: 3},
    'pi':{type:'operator',value:'π',rowId:0,position:4, convertible:true},
    'rand':{type:'operator',value:'rand',rowId:0,position:5, binary: false},
    'zero': { type: 'number', value: 0,rowId:0,position:6,doubleKey:true},
    'dot': { type: 'number',value:'.',rowId:0,position:7},
    'equal': { type: 'operator',value:'=',rowId:0,position:8, basicOperation:true}
}

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
    'xRShifttY':{type:'operator',value:'X>>Y',rowId:2,position:1},
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

