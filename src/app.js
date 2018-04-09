// this file serves enpoints and passes data to the api

const bodyParser = require('body-parser');

const express = require('express');

const {
  mealModel,
} = require('./models');

const app = express();

app.use(bodyParser.json());

const {
  addMealToDB,
  getAllMealsFromDB,
} = require('./api.js');

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

// add endpoint to get all meals
app.get('/meals', (req, res) => {
  getAllMealsFromDB().then((meals) => {
    res.status(200).json(meals);
  });
});

app.post('/meals', (req, res) => {
  const newMeal = {
    name: req.body.name,
    description: req.body.description,
    dayOfWeek: req.body.dayOfWeek,
  };
  addMealToDB(newMeal).then(() => res.status(200).json(newMeal));
});

module.exports = {
  app,
};
