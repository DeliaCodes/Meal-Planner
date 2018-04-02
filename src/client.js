// this file manipulates client side

const fetch = require('isomorphic-fetch');
require('es6-promise').polyfill();

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

/* const passMealToAPI = (input) => {
  $.ajax({
    url: '/meals',
    type: 'POST',
    dataType: 'json',
  });
}; */


const getMealsFromEndpoint = () => {
  fetch('//limitless-bayou-99473.herokuapp.com/meals')
    .then((response) => {
      if (response.status >= 400) {
        console.log(response);
        throw new Error('Bad response from server');
      }
      return response.json();
    });
};

const sendMealToEndpoint = (data) => {
  fetch('https://limitless-bayou-99473.herokuapp.com/meals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      ingredients: data.ingredients,
    }),
  }).then((response) => {
    if (response.status >= 400) {
      console.log(response);
      throw new Error('Bad response from server');
    }
    return response.status(200).json();
  });
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
