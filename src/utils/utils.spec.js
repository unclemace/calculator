import {sortKeys} from './utils'

describe('utils',()=>{
    describe('#sortKeys',()=>{
        it('should sort keys', function () {
            let keys = {
                '0': {type: 'number', rowId: 0, position: 0, doubleKey: true},
                '.': {type: 'number', rowId: 0, position: 1},
                '=': {type: 'operator', rowId: 0, position: 2, basicOperation: true},

                '1': {type: 'number', rowId: 1, position: 0},
                '2': {type: 'number', rowId: 1, position: 1},
                '3': {type: 'number', rowId: 1, position: 2},
                '+': {type: 'operator', rowId: 1, position: 3, basicOperation: true}
            };
            expect(sortKeys(keys)).toEqual(["1", "2", "3", "+", "0", ".", "="]);
        });
    });
});