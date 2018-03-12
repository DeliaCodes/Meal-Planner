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
    path: path.resolve(__dirname, '/dist/'),
    publicPath: '/',
  },
};
