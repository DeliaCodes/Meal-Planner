/* global getAllMealsFromDB, addingMealToDB */
// add a state variable to store meals
const STORE = {};

// create template for the insertion
const template = item => `<p>Name: ${item.name}</p> <p>Ingredients: ${item.ingredients}</p>`;

// add some data to the store variable
const render = () => {
  // if store.meals has data then write it to html
  if (STORE.meals !== undefined) {
    const mealsToHtml = () => STORE.meals[0].map(m => template(m));
    $('#currentMeals').append(mealsToHtml(STORE.meals));
  } else { // update store from Database to make it defined
    getAllMealsFromDB().then((value) => {
      STORE.meals = value;
      render();
    });
  }
};

// render that data to the html
$(document).ready(() => {
  render();
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
};

// rerender the form
//
