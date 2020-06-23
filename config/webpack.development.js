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
            filename: 'index.html',   // 指定生成的文件名，默认就是 index.html
            template: './src/index.html',  // 指定 html 生成使用用的模版文件，我指定 使用 ```./index.html``` 作为模版文件
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        inline: true, 
        port: "9999",
        openPage: './index.html',
        proxy: {
            '/':{
                target: 'http://admin.nec.lenovouat.cn/',
                secure: false,
                changeOrigin: true
            },
        },
        //404 页面返回 index.html
        historyApiFallback: true,
    },
    devtool: 'eval-source-map'
}