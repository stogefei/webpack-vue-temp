// Generated using webpack-cli https://github.com/webpack/webpack-cli
const MeasureWebpackPlugin = require('measure-webpack-plugin')
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common'); // 引入共用配置
const baseConfig = {
    mode: 'development',
    optimization: {
      usedExports: true
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MeasureWebpackPlugin()
    ]
};
module.exports = () => {
    return merge(commonConfig, baseConfig);
};
