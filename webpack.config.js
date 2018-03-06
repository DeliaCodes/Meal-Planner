const path = require('path');

module.exports = {
  entry: {
    client: './src/client.js',
    // api: './src/api.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
