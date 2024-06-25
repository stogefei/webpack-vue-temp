// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader')
const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';

const extractCss = {
    loader: MiniCssExtractPlugin.loader, // mini-css-extract-plugin是将css打包成独立的文件的插件
    options: {
        publicPath: '../' // 设置publicPath，这样css引用的背景图url就会以css所在的文件为基础
    }
}

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        clean: true,
    },
    devServer: {
        open: true,
        host: 'localhost',
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
                          appendTsSuffixTo: [/\.vue$/] // vue文件加上ts
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
            //         //图片路径，存放在dist/imgs/原名+8位hash+后缀
            //         filename: 'imgs/[name][ext]'
            //     }
            // },
            {
                test:/\.(jpg|jpeg|png|gif)$/,
                type:"asset", // 行内输出
                //解析
                parser: {
                  //转base64的条件
                  dataUrlCondition: {
                    maxSize: 25 * 1024, // 25kb
                  }
                },
                generator:{ 
                  //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
                  filename:'img/[name].[hash:6][ext]',
                  //打包后对资源的引入，文件命名已经有/img了
                  publicPath:'./'
                },
              },
            {
                test: /\.(woff|woff2|eot|ttf|otf|)$/,
                type: 'asset/resource',
                generator: {
                    //字体路径
                    filename: 'font/[name][ext]'
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
        // new ExtractTextPlugin({
        // filename: 'css/[name].[hash].css',
        // allChunks: true,
        // }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@mixins": path.resolve(__dirname, "./src/mixins/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@images": path.resolve(__dirname, "./src/assets/images/")
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
