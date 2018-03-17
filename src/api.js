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

require('dotenv').config();

// do I need this?
/* const {
  SECRET_DB_USER,
  SECRET_DB_PS,
} = require('../.env'); */

const mongoose = require('mongoose');

/* global SECRET_DB_USER */
const dbAddress = `mongodb://${process.env.SECRET_DB_USER}:${process.env.SECRET_DB_PS}@ds113849.mlab.com:13849/mplannerdb`;

mongoose.connect(dbAddress);

const db = mongoose.connection;

// is there a way to do this without a console statement?
db.on('error', console.error.bind(console, 'MongoDB econnection error:'));

// stub post function to add itens to fake database
const addMealToDB = post => new Promise((resolve, reject) => {
  cooperDB.push(post);
  console.log('Adding');
  resolve(post);
});

// stub get function to get data stored in fake database
const getAllMealsFromDB = () => Promise.resolve(cooperDB);

// exporting of the stubbed get and post functions.
module.exports = {
  getAllMealsFromDB,
  addMealToDB,
};
