const express = require('express');

const path = require('path');

const app = express();

app.use(express.static('dist'));

const runServer = (port) => {
  app.listen(process.env.PORT || port);
  console.log('Server running on ', port);
};

function getSomething() {
  return true;
}

module.exports = getSomething;

runServer(8010);
