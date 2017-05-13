const webpack = require('webpack');
var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');

devConfig.module.rules.push({
  test: /\.js$/ ,
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log')
});

module.exports = devConfig;
