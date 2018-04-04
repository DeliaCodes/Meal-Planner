// file for database models



const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  Schema,
} = mongoose;

const mealSchema = new Schema({
  name: String,
  description: [],
});

const mealModel = mongoose.model('Meal Model', mealSchema);

module.exports = {
  mealModel,
};
