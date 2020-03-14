const path = require('path');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = require('./utils/public_path');
const { env, isProduction } = require('./utils/env');
const proxyList = require("../code/configs/proxy");

const proxy = {};
proxyList.map(record => {
  proxy[record.path] = {
    target: record.target,
    changeOrigin: true,
    pathRewrite: { [`^${record.path}`]: "" },
    logLevel: 'debug'
  };
});

module.exports = {
  entry: './client/index.js',
  output: {
    filename: isProduction ? 'assets/main.[contentHash].js' : 'assets/main.js',
    chunkFilename: 
    isProduction ? 'assets/[name].[contentHash].js' : 'assets/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: publicPath(env)
  },
  devServer: {
    port: env.PORT,
    historyApiFallback: {
      index: publicPath(env)
    },
    compress: true,
    open: true,
    publicPath: publicPath(env),
    proxy
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../view/index.html'),
      inject: true,
      title: env.APP_NAME
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({...process.env, ...env})
    })
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "useBuiltIns": "usage",
                    "corejs": 3
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                "react-loadable/babel",
                "@babel/plugin-syntax-dynamic-import"
              ]
            }
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets'
            }
          }
        ]
      }
    ]
  }
};
