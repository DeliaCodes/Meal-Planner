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
const express = require('express');
const passport = require('passport');
const moment = require('moment');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

moment().format();

const {
  addMealToDB,
  getAllMealsFromDB,
  removeMealFromDB,
  updateMealInDB,
  getUserIDFromDB,
} = require('../data-layer.js');

const { mealModel } = require('./meal-models');

// add /api to all of these and should be a router

router.get('/meals', jwtAuth, (req, res) => {
  console.log('/meals get');
  // pass userid into this
  getAllMealsFromDB(req.user.userID).then((meals) => {
    res.status(200).json(meals);
  });
});

router.post('/meals', jwtAuth, (req, res) => {
  const newMeal = {
    name: req.body.name,
    description: req.body.description,
    dayOfWeek: req.body.dayOfWeek,
    userID: req.user.userID,
  };
  addMealToDB(newMeal).then(meal => res.status(200).json(meal));
});

router.put('/meals/:id', jwtAuth, (req, res) => {
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

  data.forEach(m =>
    sortedItems[
      `${moment()
        .weekday(m.dayOfWeek)
        .format('ddd')}`
    ].push(m));

  return sortedItems;
};

router.get('/schedule', jwtAuth, (req, res) => {
  // add user paramter to getAllMeals
  console.log('Headers', req.user);
  getAllMealsFromDB(req.user.userID).then((meals) => {
    console.log('Schedule Meals', meals);
    const scheduledMeals = sortMealData(meals);
    return res.status(200).json(scheduledMeals);
  });
});

router.delete('/meals/:id', jwtAuth, (req, res) => {
  removeMealFromDB(req.params.id, req.body.userID).then(() =>
    res.status(204).end());
});

module.exports = {
  router,
  sortMealData,
};
