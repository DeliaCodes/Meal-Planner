const express = require('express');

const app = express();

app.use(express.static('public'));

const runServer = () => {
  app.listen(process.env.PORT || 8060);
  console.log('Server running.');
};

function getSomething() {
  return true;
}

module.exports = getSomething;

runServer();
