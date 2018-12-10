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

// const mockDelete = id => Promise.resolve(true);

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

const checkForErrors = (response) => {
  if (response.status >= 400) {
    // console.log(response);
    throw new Error('Bad response from server');
  }
  return response;
};

const noErrorResponse = response => response.json();

// move fetches into client into api and then rename api to data -
const getScheduleFromEndpoint = () =>
  fetch('/schedule')
    .then(checkForErrors)
    .then(noErrorResponse);

const getMealsFromEndpoint = () =>
  fetch('/meals')
    .then(checkForErrors)
    .then(noErrorResponse);

const deleteMealEndpoint = id =>
  fetch(`/meals/${id}`, {
    method: 'delete',
  }).then(checkForErrors);

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

const updateMealEndpoint = (id, data) =>
  fetch(`/meals/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

const accessEachDaysMealsInOrder = (week, mealObject) =>
  week.map(day => mealObject[day]);

const hideEverything = () => {
  $('#schedule').hide();
  $('#addMealSection').hide();
};

const scheduleTemplate = meals =>
  `<div class="meal"><p class="name">${meals.name}</p><p class="description">${
    meals.description
  }</p><a class="edit delete" id="${meals._id}">Delete Meal</a><a class="edit editMeal">Edit Meal</a></div>`;

const dayTemplate = dayInWeek => `<h2 class="day">${dayInWeek}</h2>`;

const convertWeekDayToNumber = data =>
  moment()
    .day(data)
    .format('d');

const convertNumberToWeekDay = number =>
  moment()
    .weekday(number)
    .format('ddd');

const sortWeekDays = (daysToSort, currentDay) => {
  const numberedDays = daysToSort.map(stringDay =>
    convertWeekDayToNumber(stringDay));
  const sortedDayNumbers = numberedDays
    .filter(x => x >= currentDay)
    .concat(numberedDays.filter(x => x < currentDay));
  return sortedDayNumbers.map(dayNumber => convertNumberToWeekDay(dayNumber));
};

/**
 @param {Schedule} weeksWorthOfMeals
 */
const daysFromCurrentDay = (weeksWorthOfMeals, currentDay) => {
  const standardWeek = Object.keys(weeksWorthOfMeals);
  return sortWeekDays(standardWeek, currentDay);
};
/**
 @param {Schedule} mealObject - array of current week
 */

const iterIterDay = mealsForDay =>
  mealsForDay.map(meals => scheduleTemplate(meals));

const insertAndFlattenToHTML = (weekMeals, week) => {
  const accumulatorArray = [];
  for (let i = 0; i < weekMeals.length; i += 1) {
    accumulatorArray.push(dayTemplate(week[i]));
    accumulatorArray.push(iterIterDay(weekMeals[i]));
  }
  return accumulatorArray.reduce((acc, x) => acc.concat(x), []).join('');
};

/* eslint-disable no-underscore-dangle */
const deleteAMealFromSchedule = (meal, store) => {
  const itemToDelete = meal.id;
  const newStore = {};
  const storeKeys = Object.keys(store);
  console.log('item to delete', itemToDelete);

  for (let i = 0; i < storeKeys.length; i += 1) {
    const newMeals = store[storeKeys[i]].filter((m) => {
      console.log('M in for loop', m);
      return m._id !== itemToDelete;
    });
    newStore[storeKeys[i]] = newMeals;
  }
  console.log('newStore', newStore);
  return newStore;
};

// is this tested
const deleteAndRender = (mealID) => {
  const rerenderMe = deleteAMealFromSchedule(mealID, STORE.schedule);

  deleteMealEndpoint(mealID.id).then(() => {
    STORE.schedule = rerenderMe;
    console.log('store', rerenderMe);
    renderSchedule(rerenderMe);
  });
};

// is this tested
const afterDelete = (event) => {
  const toDelete = {};
  toDelete.id = $(event.target).attr('id');
  console.log('toDelete', toDelete);
  deleteAndRender(toDelete);
};

// is this tested?
const handleDeleteClick = () => $('.delete').click((event) => {
  event.preventDefault();
  afterDelete(event);
});

/**
 @param {Schedule} meals - schedule for meals
 */
const renderSchedule = (meals) => {
  console.log('render called', meals);
  const today = moment().weekday();
  const nextWeek = daysFromCurrentDay(meals, today);
  const orderedMeals = accessEachDaysMealsInOrder(nextWeek, meals);
  const mealsHtml = insertAndFlattenToHTML(orderedMeals, nextWeek);
  $('#displaySchedule')
    .empty()
    .append(mealsHtml);
  handleDeleteClick();
  // console.log(orderedMeals.map(m => m);
};

$(document).ready(() => {
  getMealsFromEndpoint().then(value =>
    render({
      meals: value,
    }));

  getScheduleFromEndpoint().then((value) => {
    STORE.schedule = value;
    return renderSchedule(value);
  });

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

hideEverything();

module.exports = {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  getMealsFromEndpoint,
  daysFromCurrentDay,
  sortWeekDays,
  convertNumberToWeekDay,
  renderSchedule,
  iterIterDay,
  scheduleTemplate,
  accessEachDaysMealsInOrder,
  convertWeekDayToNumber,
  insertAndFlattenToHTML,
  sendMealToEndpoint,
  deleteMealEndpoint,
  deleteAMealFromSchedule,
};
