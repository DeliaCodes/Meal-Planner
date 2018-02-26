// creating a fake database to simulate later use
const cooperDB = [];

// stub post function to add itens to fake database
const addingMeal = post => new Promise((resolve, reject) => {
  cooperDB.push(post);
  console.log('Adding');
  resolve(post);
});

// stub get function to get data stored in fake database
const getAllMeals = () => Promise.resolve(cooperDB);

// exporting of the stubbed get and post functions.
/* module.exports = {
  addMeal: addingMeal(),
  getMeals: getAllMeals(),
};
 */
