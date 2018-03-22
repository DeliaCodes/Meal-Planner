const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  Schema,
} = mongoose;

const mealSchema = new Schema({
  name: String,
  ingredients: [],
});

const mealModel = mongoose.model('Meal Model', mealSchema);

module.exports = {
  mealModel,
};
