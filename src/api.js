// creating a fake database to simulate later use
const cooperDB = [{
    name: 'Macaroni and Cheese',
    ingredients: ['macaroni', ' cheese', ' water', ' seasoning', ' salt', ' oil'],
  },
  {
    name: 'Boiled Cabbage',
    ingredients: ['cabbage', ' water', ' salt', ' pepper'],
  },
];

// stub post function to add itens to fake database
const addingMealToDB = post => new Promise((resolve, reject) => {
  cooperDB.push(post);
  console.log('Adding');
  resolve(post);
});

// stub get function to get data stored in fake database
const getAllMealsFromDB = () => Promise.resolve(cooperDB);

// exporting of the stubbed get and post functions.
/* module.exports = {
  addMeal: addingMeal(),
  getMeals: getAllMeals(),
};
 */
