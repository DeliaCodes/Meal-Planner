// add a state variable to store meals
const STORE = {};

// create template for the insertion
const template = item => `<p>Name: ${item.name}</p> <p>Ingredients: ${item.ingredients}</p>`;

// add some data to the store variable
const data = [{
    name: 'Macaroni and Cheese',
    ingredients: ['macaroni', ' cheese', ' water', ' seasoning', ' salt', ' oil'],
  },
  {
    name: 'Boiled Cabbage',
    ingredients: ['cabbage', 'water', 'salt', 'pepper'],
  },
];

addingMeal(data);

// render that data to the html
const render = () => {
  if (STORE.meals !== undefined) {
    const mealsToHtml = () => STORE.meals[0].map(m => template(m));
    $('#currentMeals').append(mealsToHtml(STORE.meals));
  } else {
    getAllMeals().then((value) => {
      STORE.meals = value;
      render();
    });
  }
};

render();


// accept data from the form and then add it to display data
// onclick('submit').val()->value
// addMyMeal(value);

// rerender the form
//
