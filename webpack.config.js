const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
            ],
        }),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
        })
    ]
};