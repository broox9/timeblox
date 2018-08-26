const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader'}
    ]
  },

  node: {
    __dirname: false,
    __filename: false
  },

  target: 'electron-main',
  plugins: []
}
