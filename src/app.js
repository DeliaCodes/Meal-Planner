// this file serves enpoints and passes data to the api

const bodyParser = require('body-parser');

const express = require('express');

const {
  mealModel
} = require('./models');

// const path = require('path');

const app = express();

app.use(bodyParser.json());

const {
  addMealToDB,
  getAllMealsFromDB,
} = require('./api.js');

app.use(express.static('dist'));

app.get('/', (req, res) => {
  // res.send('Working!!!');
  res.sendStatus(200);
});

// add endpoint to get all meals
app.get('/meals', (req, res) => {
  mealModel.find().then((meals) => {
    console.log(meals);
    res.status(200).json({
      meals
    });
  });
  /*   getAllMealsFromDB().then((meals) => {
      console.log('meals', meals);
      res.status(200).json(meals)
    }); */
  /* getAllMealsFromDB();
  res.status(200).json(); */
});

app.post('/meals', (req, res) => {
  const newMeal = {
    name: req.body.name,
    ingredients: req.body.ingredients,
  };
  addMealToDB(newMeal).then(() => res.status(200).json(newMeal));
  /* addMealToDB(newMeal);
  res.status(200).json(newMeal); */
});

module.exports = {
  app,
};
