// this file is a layer between the database, the models, and the app aka endpoints

// creating a fake database to simulate later use
const cooperDB = [{
    name: 'Macaroni and Cheese',
    ingredients: ['macaroni', ' cheese', ' water', ' seasoning', ' salt', ' oil'],
  },
  {
    name: 'Boiled Cabbage',
    ingredients: ['cabbage', ' water', ' salt', ' pepper'],
  },
];

// require('dotenv').config();

const mongoose = require('mongoose');

const {
  mealModel,
} = require('./models.js');

// stub post function to add itens to fake database
const addMealToDB = post => mealModel.create(post);

// stub get function to get data stored in fake database
const getAllMealsFromDB = () =>
  mealModel.find();

// exporting of the stubbed get and post functions.
module.exports = {
  getAllMealsFromDB,
  addMealToDB,
};
