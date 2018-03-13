const express = require('express');

// const path = require('path');

const app = express();
// const router = express.Router();

app.get('/', (req, res) => {
  // res.send('Working!!!');
  res.sendStatus(200);
});

module.exports = {
  app,
  express,
};
