const express = require('express');

// const path = require('path');

const app = express();

const {
  addMealToDB,
} = require('./api.js');

app.use(express.static('dist'));

// should these be a try and catch block instead of an if / else?
const stringCheck = (mightBeAString) => {
  if (typeof mightBeAString === string) {
    return mightBeAString;
  } else {
    return console.error(mightBeAString, 'Is Not A String');
  };
};

// do I need this and the stringCheck?
const hasTitleAndIngredient = (userContent) => {
  if (userContent.title !== undefined && userContent.ingredients !== undefined) {
    return userContent;
  } else {
    return console.error(userContent, 'needs to be entered');
  }
};
// need to do this for each value of the request body
const validateUserInput = (input) => {
  hasTitleAndIngredient(input).then(stringCheck(input)).then(Promise.resolve(input));
};

// /\ write tests for the above and below \/

// write something that will convert user input into what is needed by the database
// take input and convert it into an object with name: "" and ingredients: []
const convertInputDataIntoDbFormat = (validateUserInput, userData) => {
  const formattedData = {
    ingredients: [],
  };
  validateUserInput(userData.name).then(formattedData.name = userData.name);
  validateUserInput(userData.ingredient).then(formattedData.ingredients.push(userData.ingredient));
  return formattedData;
};

app.get('/', (req, res) => {
  // res.send('Working!!!');
  res.sendStatus(200);
});

app.post('/meals', (req, res) => {
  // console.log('runs', req.body);
  addMealToDB(req.body);
  return res.sendStatus(200);
});

module.exports = {
  app,
};
