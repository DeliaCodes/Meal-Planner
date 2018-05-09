// import {resolve,} from 'url';

// this file manipulates client side
/**
 * Meal
 * @typedef {Object} Meal
 * @property {string} name
 * @property {string} description
 * @property {string} dayOfWeek
 */

/**
 * Schedule
 * @typedef {Object} Schedule
 * @property {Meal[]} Sun - The first day
 * @property {Meal[]} Mon - The first day
 * @property {Meal[]} Tue - The first day
 * @property {Meal[]} Wed - The first day
 * @property {Meal[]} Thu - The first day
 * @property {Meal[]} Fri - The first day
 * @property {Meal[]} Sat - The first day
 */

require('isomorphic-fetch');
require('es6-promise').polyfill();

const $ = require('jquery');

const moment = require('moment');

moment().format();

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
const template = item =>
  `<p>Name: ${item.name}</p> <p>Description: ${item.description}</p>`;

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

const getScheduleFromEndpoint = () =>
  fetch('/schedule')
    .then(checkForErrors)
    .then(noErrorResponse);

const getMealsFromEndpoint = () =>
  fetch('/meals')
    .then(checkForErrors)
    .then(noErrorResponse);

const sendMealToEndpoint = data =>
  fetch('/meals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
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

/* const convertDayOfWeek = (data) => {
  const three = data.filter(x => x.dayOfWeek === 'wed');

  const threeNum = three.map(m => m.dayOfWeek = 3);
  console.log('three', threeNum);
  // data.map(m => );
}; */

const hideEverything = () => {
  $('#schedule').hide();
  $('#displayMeals').hide();
  $('#addMealSection').hide();
};

const unrollingPerDayMeals = input => input.map(m => m);

// npconst perMealTemplate = input => `<p>${input.meal}</p>`;

const scheduleTemplate = meals => `<h2>${moment().weekday(meals.day).format('ddd')}</h2><p>${meals.meal.map(m => m)}</p>`;

const mappingScheduleTemplate = input =>
  input.map(m => scheduleTemplate(m)).join('');

const convertWeekDayToNumber = data => moment().day(data).format('d');

const convertNumberToWeekDay = number => moment().weekday(number).format('ddd');

const sortWeekDays = (daysToSort, currentDay) => {
  const numberedDays = daysToSort.map(stringDay => convertWeekDayToNumber(stringDay));
  const sortedDayNumbers = numberedDays.filter(x => x >= currentDay).concat(numberedDays.filter(x => x < currentDay));
  return sortedDayNumbers.map(dayNumber => convertNumberToWeekDay(dayNumber));
};

/**
 @param {Schedule} weeksWorthOfMeals
 */
const displayDaysandMealsInOrder = (weeksWorthOfMeals, currentDay) => {
  const standardWeek = Object.keys(weeksWorthOfMeals);
  const upcomingWeek = sortWeekDays(standardWeek, currentDay);
  //  console.log('object data', dataObject);
  const filterOutDaysWithNoMeals = upcomingWeek.filter(i => weeksWorthOfMeals[i][i] !== undefined);
  // console.log(filterOutDaysWithNoMeals);
  return filterOutDaysWithNoMeals.map(i => `<h2>${moment().weekday(i).format('ddd')}</h2}${weeksWorthOfMeals[i][i].map(m => `<p>Name:${m.name}</p><p>${m.description}</p>`)}`);
};

/**
 @param {Schedule} meals - schedule for meals
 */
const renderSchedule = (meals) => {
  const today = moment().weekday();
  const orderedMeals = displayDaysandMealsInOrder(meals, today);
  // console.log(orderedMeals.map(m => m);
  return $('#schedule').append(orderedMeals);
};


$(document).ready(() => {
  getMealsFromEndpoint().then(value =>
    render({
      meals: value,
    }));

  getScheduleFromEndpoint().then(value =>
    renderSchedule(value));

  hideEverything();

  $('#mealNav').click(() => {
    $('#addMealSection').show();
    $('#schedule').hide();
  });
  $('#scheduleNav').click(() => {
    $('#addMealSection').hide();
    $('#schedule').show();
  });
});

// untested
const getMealsFromUser = () => {
  const newMeal = {};
  newMeal.name = document.getElementById('meal-name').value;
  newMeal.description = [];
  newMeal.description.push(document.getElementById('description').value);
  const userWeekday = document.getElementById('dayOfWeek').value;
  newMeal.dayOfWeek = convertWeekDayToNumber(userWeekday);
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
      $('#addMealForm')[0].reset();
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
  displayDaysandMealsInOrder,
  sortWeekDays,
  convertNumberToWeekDay,
  scheduleTemplate,
  renderSchedule,
  mappingScheduleTemplate,
  unrollingPerDayMeals,
  convertWeekDayToNumber,
};
