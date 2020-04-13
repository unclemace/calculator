const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/controller/core.js',
    watch: true,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    }
};