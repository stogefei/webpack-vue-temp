const { merge } = require('webpack-merge'); // 插件引入
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require('./webpack.common'); // 引入共用配置

const baseConfig = {
    mode: 'production',
    devtool: 'nosources-source-map',
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [extractCss],
            },
            {
                test: /\.css$/i,
                use: [extractCss],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|)$/,
                type: 'asset/resource',
                generator: {
                    //字体路径
                    filename: 'font/[name][ext]',
                    // publicPath:'..'
                }
            },
        ],
    },
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
      plugins: [
    ],
};

module.exports = () => {
    return merge(commonConfig, baseConfig);
};