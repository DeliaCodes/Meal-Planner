// this file is a layer between the database, the models, and the app aka endpoints

const mongoose = require('mongoose');

const { mealModel } = require('./meals/meal-models.js');
const { usersModel } = require('./users/user-models.js');

const addMealToDB = mealModel.create.bind(mealModel);

/* pass in user name and default value of null,
if user name is passed in get only meals with that user */

const getAllMealsFromDB = userID => mealModel.find({ userID });

const getUserIDFromDB = (username) => {
  console.log('getUserID username', username);
  return usersModel.find({ username });
}

// add userID validation
const removeMealFromDB = (id, userID) =>
  mealModel.deleteOne({
    _id: id,
    userID,
  });

// add userID validation to this function by using a find and then a promise to update
const updateMealInDB = (id, obj) => mealModel.findByIdAndUpdate(id, obj);

// exporting get and post functions.
module.exports = {
  getAllMealsFromDB,
  addMealToDB,
  removeMealFromDB,
  updateMealInDB,
  getUserIDFromDB,
};
