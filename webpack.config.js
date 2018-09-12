const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin('style.css');

module.exports = {
    mode: "none",
    entry: "./index.jsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    context: path.resolve(__dirname, "src"),
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, "src/assets"),
            '@scss': path.resolve(__dirname, "src/scss")
        }
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({template: 'index.html'}),
        extractPlugin
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public/assets'),
        stats: 'errors-only',
        open: true,
        port: 8080,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/'
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {importLoaders: 1},
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }
        ]
    }
};