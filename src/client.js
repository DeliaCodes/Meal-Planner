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

const {
  getMealsFromEndpoint,
  updateMealEndpoint,
  sendMealToEndpoint,
  deleteMealEndpoint,
  getScheduleFromEndpoint,
} = require('./api.js');

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

const accessEachDaysMealsInOrder = (week, mealObject) =>
  week.map(day => mealObject[day]);

const scheduleTemplate = meals =>
  `<div class="meal ${meals.dayOfWeek}"><p class="name">${
  meals.name
  }</p><p class="description">${
  meals.description
  }</p><a class="edit delete" id="${
  meals._id
  }">Delete Meal</a><a class="edit editMeal">Edit Meal</a></div>`;

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

const afterEditClick = (event) => {
  const edit = {};
  edit.id = $(event.target)
    .prev()
    .attr('id');
  console.log('selector', edit);
  const itemName = $(event.target)
    .parent()
    .find('.name')
    .text();
  const itemDescription = $(event.target)
    .parent()
    .find('.description')
    .text();
  editRenderForm(edit.id, itemName, itemDescription, event);
};

// untested
const editFormTemplate = (name, desc) => `<form id="editMealForm">
<fieldset>
  <label for="editName">
    Edit Meal Name Here:
    <input role="textbox" id="editName" type="text" value="${name}" name="Meal Name" role="input" required>
  </label>

  <label for="editDescription">
    Edit Your Meal Description Here:
    <input role="textbox" id="editDescription" value="${desc}" type="text" name="meal description" required>
  </label>
  <label for="editDayOfWeek">Edit The Day Of The Week For This Meal:
    <select name="select day of week" id="editDayOfWeek" required>
      <option value="monday">Monday</option>
      <option value="tuesday">Tuesday</option>
      <option value="wednesday">Wednesday</option>
      <option value="thursday">Thursday</option>
      <option value="friday">Friday</option>
      <option value="saturday">Saturday</option>
      <option value="sunday">Sunday</option>
    </select>
  </label>
  <input id="editSubmit" type="submit" name="submit" role="button">
</fieldset>
</form>`;

const getEditedMealFromUser = () => {
  const newMeal = {};
  newMeal.name = document.getElementById('editName').value;
  newMeal.description = [];
  newMeal.description.push(document.getElementById('editDescription').value);
  const userWeekday = document.getElementById('editDayOfWeek').value;
  newMeal.dayOfWeek = convertWeekDayToNumber(userWeekday);
  return newMeal;
};

// bind to on submit
const submitEditForm = (id, store) => {
  $('#editMealForm').submit((event) => {
    event.preventDefault();
    const dayNumber = $(event.target)
      .closest('.meal')
      .attr('class')
      .slice(5);
    const displayDay = convertNumberToWeekDay(dayNumber);
    const newMeal = getEditedMealFromUser();
    const sliceVal = store.schedule[displayDay].findIndex(e => e._id === id);
    store.schedule[displayDay].splice(sliceVal, 1);
    const editedDay = convertNumberToWeekDay(newMeal.dayOfWeek);
    // console.log('Edited Meal', store.schedule[displayDay]);
    store.schedule[editedDay].push(newMeal);
    updateMealEndpoint(id, newMeal);
    return renderSchedule(store.schedule);
  });
};

const editRenderForm = (id, name, description, event) => {
  $(event.target)
    .parent()
    .empty()
    .append(editFormTemplate(name, description));
  submitEditForm(id, STORE);
  // console.log('STORING', Object.keys(store));
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

// is this tested?
const afterDelete = (event) => {
  const toDelete = {};
  toDelete.id = $(event.target).attr('id');
  console.log('toDelete', toDelete);
  deleteAndRender(toDelete);
};

// is this tested?
const handleDeleteClick = () =>
  $('.delete').click((event) => {
    event.preventDefault();
    afterDelete(event);
  });

const handleEditClick = () =>
  $('.editMeal').click((event) => {
    event.preventDefault();
    afterEditClick(event);
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
  handleEditClick();
  // console.log(orderedMeals.map(m => m);
};

const renderIntoMain = (temp) => {
  $('#main')
    .empty()
    .append(temp);
};

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
  $('#addMealForm').submit((event) => {
    event.preventDefault();
    const dataToAdd = getMealsFromUser();
    sendMealToEndpoint(dataToAdd).then(() => {
      addToState(STORE, dataToAdd);
      render(STORE);
      $('#addMealForm')[0].reset();
    });
    // do I need to pass in data to add to anon function below?
  });
};

const addMealFormView = () => {
  const addMealForm = `<section id="addMealSection">
  <h1 class="title">Add A Meal Here</h1>
  <form id="addMealForm">
    <fieldset>
      <label for="meal-name">
        Insert Meal Name Here:
        <input role="textbox" id="meal-name" type="text" name="Meal Name" role="input" required />
      </label>

      <label for="description">
        Insert Your Meal Description Here:
        <input role="textbox" id="description" type="text" name="meal description" required />
      </label>
      <label for="dayOfWeek">Select The Day Of The Week For This Meal:
        <select name="select day of week" id="dayOfWeek" required>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </label>
      <input id="submit" type="submit" name="submit" role="button" />
    </fieldset>
  </form>
</section>`;
  renderIntoMain(addMealForm);
  getMealsFromEndpoint().then(value =>
    render({
      meals: value,
    }));
  addUserMeals();
};

const scheduleView = () => {
  const scheduleDisplay = `<div id="schedule">
  <h1>My Upcoming Meals</h1>
  <div id="displaySchedule" aria-live="assertive"></div></div>`;

  renderIntoMain(scheduleDisplay);

  getScheduleFromEndpoint().then((value) => {
    STORE.schedule = value;
    return renderSchedule(value);
  });
};

const demo = {
  username: 'DemoAutomaton',
  password: 'Explain-Ocean_Everything*RunninG',
};

const loginAction = (user, pass) => { };

const registerUserView = () => {
  const registerForm = `<section id="newUserRegistration">
  <h1 class="title">Register Here</h1>
  <form id="userRegistrationForm">
    <fieldset>
    <label for="registerEmail">
        Email:
        <input role="textbox" id="registerEmail" type="text" name="Register Email" role="input" required />
      </label>
      <label for="registerUsername">
        Username:
        <input role="textbox" id="registerUsername" type="text" name="Register Username" role="input" required />
      </label>
      <label for="registerPassword">
        Password:
        <input role="textbox" id="registerPassword" type="text" name="Login Password" required />
      <input id="registerSubmit" type="submit" name="submit" role="button" />
    </fieldset>
  </form>
  <nav class ="userNav">
  <a id="registerDemo" class="register demo">Unsure? Try this demo account:
  Username: DemoAutomaton
  Password: Explain-Ocean_Everything*RunninG
  </a>
      <a id="loginUser" class="login here">Go back to the Login page here</a>
      </nav>
</section>`;
  renderIntoMain(registerForm);
  $('#userRegistrationForm').submit((event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    // do some sort of reg and login
  });
  $('#registerDemo').click(() => loginAction(demo.username, demo.password));
  $('#loginUser').click(() => userLoginView());
};

const userLoginView = () => {
  const userLoginForm = `<section id="userLoginOrRegister">
  <h1 class="title">Login Here</h1>
  <form id="userLogin">
    <fieldset>
      <label for="loginUsername">
        Username:
        <input role="textbox" id="loginUsername" type="text" name="Login Username" role="input" required />
      </label>
      <label for="loginPassword">
        Password:
        <input role="textbox" id="loginPassword" type="text" name="Login Password" required />
      <input id="loginSubmit" type="submit" name="submit" role="button" />
    </fieldset>
  </form>
  <nav class="userNav">
  <a id="registerDemo" class="register demo">Unsure? Try this demo account:
  Username: DemoAutomaton
  Password: Explain-Ocean_Everything*RunninG
  </a>
      <a id="registerUserHere" class="register here">Or you can signup here</a>
  </nav>
</section>`;
  renderIntoMain(userLoginForm);
  $('#userLogin').submit((event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    loginAction(username, password);
  });
  $('#registerDemo').click(() => loginAction(demo.username, demo.password));
  $('#registerUserHere').click(() => registerUserView());
};

$(document).ready(() => {
  userLoginView();
  $('#mealNav').click(() => addMealFormView());
  $('#scheduleNav').click(() => scheduleView());
  $('#userNav').click(() => userLoginView);
});

module.exports = {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  daysFromCurrentDay,
  sortWeekDays,
  convertNumberToWeekDay,
  renderSchedule,
  iterIterDay,
  scheduleTemplate,
  accessEachDaysMealsInOrder,
  convertWeekDayToNumber,
  insertAndFlattenToHTML,
  deleteAMealFromSchedule,
};
