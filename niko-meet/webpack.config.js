const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = './src/';
const distDir = './dist/';

module.exports = {
    mode: 'production',
    entry: {
        contentScript: path.join(__dirname, srcDir + 'contentScript.ts'),
        background: path.join(__dirname, srcDir + 'background.ts')
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
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', 'js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: '.', to: '../', context: 'public' }]
        })
    ]
};