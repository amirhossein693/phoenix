const common = require('./webpack.common');
const merge = require('webpack-merge');
const DotenvWebpack = require('dotenv-webpack');
const ExtractCssChunksWithPageDirection = require("extract-css-chunks-webpack-plugin-with-page-direction");
const RtlCssPlugin = require('rtl-css-transform-webpack-plugin');
const { dotenvPath } = require('./utils/env');

const x = require("../modules/get_configs/");
console.log({x});

const codeDevConfig = {};

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DotenvWebpack({
      path: dotenvPath
    }),
    new ExtractCssChunksWithPageDirection({
      filename: "assets/[name]-[pagedir].css",
      chunkFilename: "assets/[name]-[pagedir].css"
    }),
    new RtlCssPlugin({
      filename: 'assets/[name]-rtl.css',
      sourcemap: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          // style-loader
          {
            loader: ExtractCssChunksWithPageDirection.loader,
            options: {
              hot: true,
              reloadAll: true
            }
          },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          // less-loader
          {
            loader: 'less-loader'
          }
        ]
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     // style-loader
      //     {
      //       loader: ExtractCssChunksWithPageDirection.loader,
      //       options: {
      //         hot: true,
      //         reloadAll: true
      //       }
      //     },
      //     // css-loader
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //         modules: true,
      //         camelCase: true,
      //         localIdentName: '[name]__[local]__[hash:base64:5]'
      //       }
      //     },
      //     // sass-loader
      //     {
      //       loader: 'sass-loader'
      //     }
      //   ]
      // }
    ]
  }
};

module.exports = merge.smart(common, config, codeDevConfig);
