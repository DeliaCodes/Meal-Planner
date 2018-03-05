const path = require('path');

module.exports = {
  entry: {
    './src/client.js',
    './src/api.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
