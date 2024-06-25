const { merge } = require('webpack-merge'); // 插件引入
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require('./webpack.common'); // 引入共用配置

const baseConfig = {
    mode: 'production',
    devtool: 'nosources-source-map',
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            parallel: true, // 可省略，默认开启并行
            terserOptions: {
                toplevel: true, // 最高级别，删除无用代码
                ie8: true,
                safari10: true,
            }
        }),
        ],
       minimize:true,
      },
};

module.exports = () => {
    return merge(commonConfig, baseConfig);
};