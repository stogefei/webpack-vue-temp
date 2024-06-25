const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

const extractCss = {
    loader: MiniCssExtractPlugin.loader, //将css打包成独立的文件的插件
    options: {
        publicPath: '../' // 设置publicPath，这样css引用的背景图url就会以css所在的文件为基础
    }
};

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js',
        clean: true,
        library: {
            name: 'CloudpivotBpmn',
            type: 'umd',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                      {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env', '@vue/babel-preset-jsx']
                        }
                      },
                      {
                        loader: 'ts-loader',
                        options: {
                          appendTsSuffixTo: [/\.vue$/]
                        }
                      }
                ]
            },
            {
                test: /\.less$/i,
                use: [extractCss, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.css$/i,
                use: [extractCss, 'css-loader', 'postcss-loader'],
            },
            // {
            //     test: /\.(svg|png|jpg|gif)$/i,
            //     type: 'asset/resource', 单独输出
            //     generator: {
            //         //图片路径，存放在dist/imgs/原名+后缀
            //         filename: 'imgs/[name][ext]'
            //     }
            // },
            {
                test:/\.(jpg|jpeg|png|gif|svg)$/,
                type:"asset", // 行内输出
                //解析
                parser: {
                  //转base64的条件
                  dataUrlCondition: {
                    maxSize: 25 * 1024, // 25kb
                  }
                },
                generator:{ 
                  filename:'imgs/[name][ext]',
                  publicPath:'../'
                },
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
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new ProgressBarWebpackPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve('src'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.vue', '...'],
    },
};

module.exports = config;