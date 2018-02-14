/* global __dirname, require, module */

const webpack = require('webpack');
const path = require('path');
const { webpack: lernaAliases } = require('lerna-alias');

const env = require('yargs').argv.env || {};
const folder = env.folder;

const config = {
  context: __dirname + '/../' + folder,
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../' + folder + '/dist',
    filename: 'index.min.js',
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["env", {
                "targets": {
                  "browsers": ["last 2 versions", "safari >= 7"]
                }
              }],
              "react-plus"
            ],
            plugins: ["babel-plugin-add-module-exports"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader',
          options: { modules: false }
        },{
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader',
          options: { modules: false }
        }]
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      }
    ]
  },
  resolve: {
    alias: lernaAliases(),
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: {
      index: './examples/index.html'
    }
  }
};

module.exports = config;
