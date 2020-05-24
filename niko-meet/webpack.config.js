const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = './src/';
const distDir = './dist/';

module.exports = {
    mode: 'production',
    entry: {
        contentScript: path.join(__dirname, srcDir + 'contentScript.js'),
        background: path.join(__dirname, srcDir + 'background.js')
    },
    output: {
        path: path.join(__dirname, distDir + 'js'),
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial'
        }
    },
    resolve: {
        extensions: ['js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: '.', to: '../', context: 'public' }]
        })
    ]
};