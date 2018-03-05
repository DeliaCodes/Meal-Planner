// add a state variable to store meals
const $ = require('jquery');
const {
  getAllMealsFromDB,
  addingMealToDB,
} = require('./api.js');

// const STORE = {};

// create template for the insertion
const template = item => `<p>Name: ${item.name}</p> <p>Ingredients: ${item.ingredients}</p>`;



// add some data to the store variable
const render = (store) => {
  // if store.meals has data then write it to html
  const mappingMealsIntoTemplate = (input) => {
    // console.log(input);
    input.map(m => template(m));
  };
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
  $('#submit').submit((event) => {
    event.preventDefault();
    const dataToAdd = getMealsFromUser();
    addingMealToDB(dataToAdd);
    render();
  });
};

module.exports = {
  render,
  template,
};

// rerender the form
//
