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
        /*vendor: ['jquery']*/
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
            name: 'vendor',
            minChunks: function (module, count) {
                console.log(module.resource, `引用次数${count}`);
                //"有正在处理文件" + "这个文件是 .js 后缀" + "这个文件是在 node_modules 中"
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['index', 'result']
        }),
        new cleanWebpackPlugin(['dist']),
    ]
}