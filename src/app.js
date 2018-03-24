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

const hasTitleAndIngredient = (userContent) => {
  if (userContent.title !== undefined && userContent.ingredients !== undefined) {
    return userContent;
  } else {
    return console.error(userContent, 'needs to be entered');
  }
};

const validateUserInput = (input) => {
  hasTitleAndIngredient(input).then(stringCheck(input)).then(Promise.resolve(input));
  // check if a meal has a title
  // check if a meal has an ingredient
  // check if meal title is a string
  // check if ingredient is a string
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
