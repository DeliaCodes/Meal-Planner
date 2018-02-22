// create some data

const createMeals = () => {
  return {
    name: 'Macaroni and Cheese',
    ingredients: ['macaroni', ' cheese', ' water', ' seasoning', ' salt', ' oil'],

  };
};

// display created data to the currentMeals div

document.getElementById("currentMeals").textContent = `Name: ${createMeals().name} Ingredients: ${createMeals().ingredients}`;


// accept data from the form and then add it to display data

module.exports = createMeals();
