const {addMeal,  initStore} = require('../public/store');
const addTestMeals = (store, numberOfMeals = 1) => {
  for(var i = 0; i < numberOfMeals; i++) {
    store = addMeal({name: 'whatever'
      , ingredients: []}, store)
  }
  return store;
}

describe("STORE#addMeal", () => {
  it('adds a meal to empty store', () => {
    const store = addTestMeals(initStore(), 1);

    expect(store.getNumberOfMeals()).toEqual(1);
  })
  it('adds a meal to store with something', () => {
    let store = addTestMeals(initStore(),1);

    store = addTestMeals(store, 1);

    expect(store.getNumberOfMeals()).toEqual(2);
  })
})

describe("STORE#getMeals", () => {
  it('gets all the meals', () => {
    const initialStore = initStore();

    let store = addTestMeals(initialStore, 3);

    const meals = store.getMeals();

    expect(meals.length).toEqual(3);
  })
})
