// import {resolve,} from 'url';

// this file manipulates client side

require('isomorphic-fetch');
require('es6-promise').polyfill();

const $ = require('jquery');
require('fullcalendar');
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
const template = item => `<p>Name: ${item.name}</p> <p>Description: ${item.description}</p>`;

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
const checkForErrors = (response) => {
  if (response.status >= 400) {
    // console.log(response);
    throw new Error('Bad response from server');
  }
  return response;
};

const noErrorResponse = response => response.json();

const getMealsFromEndpoint = () => fetch('/meals')
  .then(checkForErrors)
  .then(noErrorResponse);


const sendMealToEndpoint = data => fetch('/meals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: data.name,
    description: data.description,
  }),
})
  .then((response) => {
    if (response.status >= 400) {
      // console.log(response);
      throw new Error('Bad response from server');
    }
    return response.json();
  });

/* const seedDataIntoDb = data => new Promise((resolve, reject) => {
  if (getMealsFromEndpoint() === undefined) {
    sendMealToEndpoint(data);
  }
}); */


$(document).ready(() => {
  getMealsFromEndpoint().then(value => render({
    meals: value,
  }));
  $('#calendar').fullCalendar({
    defaultView: 'basicWeek',
    themeSystem: 'jquery-ui',
  });
});

// untested
const getMealsFromUser = () => {
  const newMeal = {};
  newMeal.name = document.getElementById('meal-name').value;
  newMeal.description = [];
  newMeal.description.push(document.getElementById('description').value);
  return newMeal;
};

// not tested
const addUserMeals = () => {
  $('form').submit((event) => {
    event.preventDefault();
    const dataToAdd = getMealsFromUser();
    // do I need to pass in data to add to anon function below?
    sendMealToEndpoint(dataToAdd).then(() => {
      addToState(STORE, dataToAdd);
      render(STORE);
    });
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
