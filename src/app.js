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
 * @property {Meal[]} Sun - The first day
 * @property {Meal[]} Mon - The first day
 * @property {Meal[]} Tue - The first day
 * @property {Meal[]} Wed - The first day
 * @property {Meal[]} Thu - The first day
 * @property {Meal[]} Fri - The first day
 * @property {Meal[]} Sat - The first day
 */

const moment = require('moment');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

const {
  mealModel,
} = require('./models');

moment().format();

app.use(bodyParser.json());
app.use(morgan('common'));


const {
  addMealToDB,
  getAllMealsFromDB,
  removeMealFromDB,
  updateMealInDB,
} = require('./data-layer.js');

const { localStrategy, jwtStrategy } = require('./auth/strategies.js');

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.use(express.static('dist'));

app.get('/', jwtAuth, (req, res) => {
  res.sendStatus(200);
});

// add JWT endpoint to get all meals

app.get('/meals', jwtAuth, (req, res) => {
  console.log('/meals get');
  getAllMealsFromDB().then((meals) => {
    res.status(200).json(meals);
  });
});

app.post('/meals', jwtAuth, (req, res) => {
  const newMeal = {
    name: req.body.name,
    description: req.body.description,
    dayOfWeek: req.body.dayOfWeek,
    user: req.user._id,
  };
  addMealToDB(newMeal).then(meal => res.status(200).json(meal));
});

app.put('/meals/:id', jwtAuth, (req, res) => {
  const mealToSend = {
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    dayOfWeek: req.body.dayOfWeek,
  };
  updateMealInDB(req.params.id, mealToSend).then(() => res.status(204).end());
});


/**
 * @param {Meal[]} data
 * @returns {Schedule} sortedItems items sorted
 */
const sortMealData = (data) => {
  const sortedItems = {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  };

  data.forEach(m => sortedItems[`${moment().weekday(m.dayOfWeek).format('ddd')}`].push(m));

  return sortedItems;
};

app.get('/schedule', jwtAuth, (req, res) => {
  getAllMealsFromDB().then((meals) => {
    console.log(meals);
    const scheduledMeals = sortMealData(meals);
    return res.status(200).json(scheduledMeals);
  });
});

app.delete('/meals/:id', jwtAuth, (req, res) => {
  removeMealFromDB(req.params.id).then(() => res.status(204).end());
});

module.exports = {
  app,
  sortMealData,
};
