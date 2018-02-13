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
        loader: 'babel-loader',
        exclude: /node_modules/
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
      index: './' + folder + '/index.html'
    }
  }
};

console.log(lernaAliases());

module.exports = config;
