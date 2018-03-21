const express = require('express');

// const path = require('path');

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  // res.send('Working!!!');
  res.sendStatus(200);
});

module.exports = {
  app,
};
