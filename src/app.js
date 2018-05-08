// this file serves enpoints and passes data to the api
/**
 * Meal
 * @typedef {Object} Meal
 * @property {string} name
 * @property {string} description
 * @property {string} dayOfWeek
 */

/**
 * Schedule
 * @typedef {Object} Schedule
 * @property {Meal[]} day0 - The first day
 * @property {Meal[]} day1 - The first day
 * @property {Meal[]} day2 - The first day
 * @property {Meal[]} day3 - The first day
 * @property {Meal[]} day4 - The first day
 * @property {Meal[]} day5 - The first day
 * @property {Meal[]} day6 - The first day
 */


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
  console.log('something');
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


/**
 * @param {Meal[]} data
 * @returns {Schedule} sortedItems items sorted
 */
const sortMealData = (data) => {
  const sortedItems = {
    day0: [],
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: [],
    day6: [],
  };

  data.forEach(m => sortedItems[`day${m.dayOfWeek}`].push(m));

  return sortedItems;
};

app.get('/schedule', (req, res) => {
  getAllMealsFromDB().then((meals) => {
    // console.log(meals);
    const scheduledMeals = sortMealData(meals);
    return res.status(200).json(scheduledMeals);
  });
});

module.exports = {
  app,
  sortMealData,
};
