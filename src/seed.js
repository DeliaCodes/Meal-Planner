// require model - mealmodel.create and then seeds data once by calling script

const {
  mealModel,
} = require('./models');

// Add clearing of db code

const meal = {
  name: 'Boiled Cabbage',
  description: ['cabbage', ' water', ' salt', ' pepper'],
  dayOfWeek: 'Sunday',
};

// double check seed script in package json

mealModel.create(meal);
