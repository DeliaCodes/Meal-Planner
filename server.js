const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
// app.use(express.static('dist'));

const runServer = () => {
  app.listen(process.env.PORT || 8020);
  console.log('Server running.');
};

function getSomething() {
  return true;
}

module.exports = getSomething;

runServer();
