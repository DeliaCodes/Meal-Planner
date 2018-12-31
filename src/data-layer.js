// this file is a layer between the database, the models, and the app aka endpoints

const mongoose = require('mongoose');

const {
  mealModel,
} = require('./models.js');

const addMealToDB = mealModel.create.bind(mealModel);

/* pass in user name and default value of null,
if user name is passed in get only meals with that user */

const getAllMealsFromDB = () => mealModel.find();

const removeMealFromDB = id => mealModel.deleteOne({
  _id: id,
});

const updateMealInDB = (id, obj) => mealModel.findByIdAndUpdate(id, obj);

// exporting get and post functions.
module.exports = {
  getAllMealsFromDB,
  addMealToDB,
  removeMealFromDB,
  updateMealInDB,
};
