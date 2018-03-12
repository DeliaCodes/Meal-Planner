const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: {
    client: './src/client.js',
    // api: './src/api.js',
  },
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
};
