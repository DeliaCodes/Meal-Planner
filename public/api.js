// creating a fake database to simulate later use
const fakeDB = {};

// stub post function to add itens to fake database
const addingMeal = post => new Promise((resolve, reject) => {
  fakeDB.post = post;
  resolve(post);
});

// stub get function to get data stored in fake database
const getAllMeals = () => Promise.resolve(fakeDB);

// exporting of the stubbed get and post functions.
module.exports = {
  addMeal: addingMeal(),
  getMeals: getAllMeals(),
};
