// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require('webpack');
const path = require('path');
const MeasureWebpackPlugin = require('measure-webpack-plugin')
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common'); // 引入共用配置
const baseConfig = {
    watch: true,
    watchOptions: {
        // 默认为空，配置不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/, // 可以提高性能
        // 监听到的变化发生后会等300ms再去执行，默认 300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化时通过不停的询问系统指定文件有没有变化实现的，默认每秒询问 1000 次
        poll: 1000
    },
    mode: 'development',
    optimization: {
      usedExports: true
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {  // 静态资源默认路径
            directory: path.join(__dirname, '../dist'),
        },
        client: {
            progress: true,
        },
        // hot: true,
        liveReload: true,
        // open: true,
        // port: 9888,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new MeasureWebpackPlugin()
    ],
};
module.exports = () => {
    return merge(commonConfig, baseConfig);
};
