// this file manipulates client side

const $ = require('jquery');
// instead of these use endpoints to serve - use FETCH or AJAX
/* const {
  getAllMealsFromDB,
  addMealToDB,
} = require('./api.js'); */

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

// create template for the insertion
const template = item => `<p>Name: ${item.name}</p> <p>Ingredients: ${item.ingredients}</p>`;

const mappingMealsIntoTemplate = input => input.map(m => template(m)).join('');
// to convert to vanilla JS use https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
const render = (store) => {
  /* document.getElementById('currentMeals').innerHTML(mappingMealsIntoTemplate(store.meals)) */
  $('#currentMeals').append(mappingMealsIntoTemplate(store.meals));
};

//

const getMealsFromEndpoint = () => {
  /*   const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        return request.response;
      }
      console.log('An Error Occured In Your Request');
    };
    request.open('Get', '/meals'); */
};


$(document).ready(() => {
  // getAllMealsFromDB()

  getMealsFromEndpoint().then(value => render({
    meals: value,
  }));
});

// untested
const getMealsFromUser = () => {
  const newMeal = {};
  newMeal.name = document.getElementById('meal-name').value;
  newMeal.ingredients = [];
  newMeal.ingredients.push(document.getElementById('ingredient').value);
  return newMeal;
};

// not tested
const addUserMeals = () => {
  $('form').submit((event) => {
    event.preventDefault();
    const dataToAdd = getMealsFromUser();
    addToState(STORE, dataToAdd);
    render(STORE);
    // addMealToDB(dataToAdd);
  });
};

addUserMeals();

module.exports = {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  getMealsFromEndpoint,
};
