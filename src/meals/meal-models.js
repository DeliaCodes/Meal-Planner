// file for database models


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  Schema,
} = mongoose;

const mealSchema = new Schema({
  name: String,
  description: String,
  dayOfWeek: String,
  userID: mongoose.Schema.Types.ObjectId,
});

const mealModel = mongoose.model('Meal Model', mealSchema);

module.exports = {
  mealModel,
};
