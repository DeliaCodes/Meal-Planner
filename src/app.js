const express = require('express');

// const path = require('path');

const app = express();

const {
  addMealToDB,
} = require('./api.js');

app.use(express.static('dist'));

app.get('/', (req, res) => {
  // res.send('Working!!!');
  res.sendStatus(200);
});

app.post('/meals', (req, res) => {
  // console.log('runs', req.body);
  addMealToDB(req.body);
  return res.sendStatus(200);
});

module.exports = {
  app,
};
