const $ = require('jquery');
const {
  getAllMealsFromDB,
  addMealToDB,
} = require('./api.js');

// add a state variable to store meals
const STORE = {
  meals: [],
};

const addToState = (storeToChange, meal, index) => {
  const mealToAdd = meal;
  if (index === undefined) {
    index = 0;
  }
  storeToChange.meals.splice(index, 0, mealToAdd);
  return storeToChange;
};

// send meal to Db via api
/* const sendMealToDbApi = (mealToAdd, api) => {
  api(mealToAdd);
};
 */
// create template for the insertion
const template = item => `<p>Name: ${item.name}</p> <p>Ingredients: ${item.ingredients}</p>`;

const mappingMealsIntoTemplate = (input) => {
  return input.map(m => template(m)).join("");
};

const render = (store) => {
  $('#currentMeals').append(mappingMealsIntoTemplate(store.meals));
};

$(document).ready(() => {
  getAllMealsFromDB().then(value => render({
    meals: value,
  }));
});

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
    addToState(STORE, dataToAdd);
    render(STORE);
    addMealToDB(dataToAdd);
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
