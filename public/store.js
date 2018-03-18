const addMeal = (meal, store) => {
  return  {
    ...store, 
    ...{ meals: store.meals.concat([meal])} }
};


const initStore = () => ({
  meals: [],
  // readonly
  getNumberOfMeals() {
    return this.meals.length;
  },
  getMeals() { 
    return this.meals;
  }

});
if(typeof exports !== "undefined") {
  module.exports = {addMeal,  initStore};
}
