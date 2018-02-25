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

addMyMeal(data);

// render that data to the html
const render = () => {
  if (STORE.meals === undefined) {
    STORE.meals = getMyMeals();
  } else {
    document.getElementById('currentMeals').innerText(template(STORE.meals));
  }
};

render();


// accept data from the form and then add it to display data
//onclick('submit').val()->value
//addMyMeal(value);

// rerender the form
//
