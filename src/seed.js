// require model - mealmodel.create and then seeds data once by calling script

const {
  mealmodel,
} = require('./models');

const meal = {
  name: 'Boiled Cabbage',
  description: ['cabbage', ' water', ' salt', ' pepper'],
};

mealmodel.create(meal);
