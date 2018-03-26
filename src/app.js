// this file serves enpoints and passes data to the api

const bodyParser = require('body-parser');

const express = require('express');



// const path = require('path');

const app = express();

app.use(bodyParser.json());

const {
  addMealToDB,
} = require('./api.js');

app.use(express.static('dist'));

app.get('/', (req, res) => {
  // res.send('Working!!!');
  res.sendStatus(200);
});

app.post('/meals', (req, res) => {
  const newMeal = {
    name: req.body.name,
    ingredients: req.body.ingredients,
  };
  addMealToDB(newMeal);
  res.status(200).json(newMeal);


});

module.exports = {
  app,
};
