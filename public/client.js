// add a state variable to store meals
const mealsAPI = require('./api.js');

const getMyMeals = mealsAPI.getMeals;

const addMyMeal = mealsAPI.addMeal;

const STORE = {};

// create template for the insertion
const template = item => `<p>Name: ${item.name}</p> <p>Ingredients: ${item.ingredients}</p>`;

// add some data to the store variable
const data = {
  name: 'Macaroni and Cheese',
  ingredients: ['macaroni', ' cheese', ' water', ' seasoning', ' salt', ' oil'],

};

// render that data to the html
const render = () => document.getElementById('currentMeals').textContent(template(STORE.meals));


// accept data from the form and then add it to display data

// rerender the form
