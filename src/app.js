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

const sortMealData = (data) => {
  const sortedItems = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  data.map(m => sortedItems[m.dayOfWeek].push(m));

  return sortedItems;
};

const convertDayOfWeek = (data) => {
  const three = data.filter(x => x.dayOfWeek === 'wednesday');

  const threeNum = three.map(m => m.dayOfWeek = 3);
  console.log('three', threeNum);
  // data.map(m => );
};

app.get('/schedule', (req, res) => {
  getAllMealsFromDB().then((meals) => {
    const scheduledMeals = sortMealData(meals);
    return res.status(200).json(scheduledMeals);
  });
});

module.exports = {
  app,
  sortMealData,
  convertDayOfWeek,
};
