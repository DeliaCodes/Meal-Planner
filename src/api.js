// this file is a layer between the database, the models, and the app aka endpoints

const mongoose = require('mongoose');

const {
  mealModel,
} = require('./models.js');

const addMealToDB = mealModel.create.bind(mealModel);

const getAllMealsFromDB = () => mealModel.find();

// exporting get and post functions.
module.exports = {
  getAllMealsFromDB,
  addMealToDB,
};
