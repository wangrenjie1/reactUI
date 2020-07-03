const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name][hash:8].bundle.js',
        chunkFilename: 'scripts/[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: './favicon.ico',
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        inline: true, 
        port: "9999",
        openPage: './index.html',
        proxy: {
            '/serach':{
                target: 'http://s.nec.lenovouat.com',
                secure: false, //接受运行在https上，且使用了无效证书的后端服务器
                changeOrigin: true,
                pathRewrite: {"^/serach" : ""}
            },
            '/api':{
                target: 'https://admin.nec.lenovouat.com',
                secure: false, //接受运行在https上，且使用了无效证书的后端服务器
                changeOrigin: true,
                pathRewrite: {"^/api" : ""}
            },
        },
        //404 页面返回 index.html
        historyApiFallback: true,
    },
    devtool: 'eval-source-map'
}