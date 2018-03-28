// this file is a layer between the database, the models, and the app aka endpoints

// creating a fake database to simulate later use
/* const cooperDB = [{
    name: 'Macaroni and Cheese',
    ingredients: ['macaroni', ' cheese', ' water', ' seasoning', ' salt', ' oil'],
  },
  {
    name: 'Boiled Cabbage',
    ingredients: ['cabbage', ' water', ' salt', ' pepper'],
  },
]; */

const mongoose = require('mongoose');

const {
  mealModel
} = require('./models.js');

const addMealToDB = mealModel.create.bind(mealModel);

const getAllMealsFromDB = () => mealModel.find();

// exporting get and post functions.
module.exports = {
  getAllMealsFromDB,
  addMealToDB,
};
