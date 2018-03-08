const $ = require('jquery');
const {
  getAllMealsFromDB,
  addingMealToDB,
} = require('./api.js');

// add a state variable to store meals
const STORE = {
  meals: [],
};

// create modified store function and pass it into render
const addToState = (storeToChange, meal, index) => {
  // some operation on currentState to add meal into currentState
  const mealToAdd = meal;
  if (index === undefined) {
    index = 0;
  }
  storeToChange.meals.splice(index, 0, mealToAdd);
  return storeToChange;
};

// create a save to send one meal to api
const sendMealToDbApi = (mealToAdd, api) => {
  api(mealToAdd);
};

// create template for the insertion
const template = item => `<p>Name: ${item.name}</p> <p>Ingredients: ${item.ingredients}</p>`;

const mappingMealsIntoTemplate = (input) => {
  return input.map(m => template(m)).join("");
};

const render = (store) => {
  $('#currentMeals').html(mappingMealsIntoTemplate(store.meals));
};

// render that data to the html
$(document).ready(() => {
  getAllMealsFromDB().then(value => render({
    meals: value,
  }));
});

// accept data from the form and then add it to display data
// onclick('submit').val()->value
// addMyMeal(value);

const getMealsFromUser = () => {
  const newMeal = {};
  newMeal.name = $('#meal-name').val();
  newMeal.ingredients = [];
  newMeal.ingredients.push($('#ingredient').val());
  return newMeal;
};

const addUserMeals = () => {
  $('form').submit((event) => {
    event.preventDefault();
    const dataToAdd = getMealsFromUser();
    render(dataToAdd);
  });
};

addUserMeals();

module.exports = {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  sendMealToDbApi,
};

// rerender the form
//
