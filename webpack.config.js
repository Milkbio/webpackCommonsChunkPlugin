const path = require('path');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        index: './src/page/index/index.js',
        result: './src/page/result/index.js',
        vendor: ['jquery']
    },
    output: {
        path: resolve('dist'),
        filename: "static/js/[name].[chunkhash].js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node-modules/',
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                }]
            }
        ]
    },
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['index', 'result']
        }),
        new cleanWebpackPlugin(['dist']),
    ]
}