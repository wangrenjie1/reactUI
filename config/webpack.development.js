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
            '/':{
                target: 'http://s.nec.lenovouat.com',
                secure: false,
                changeOrigin: true
            },
        },
        //404 页面返回 index.html
        historyApiFallback: true,
    },
    devtool: 'eval-source-map'
}