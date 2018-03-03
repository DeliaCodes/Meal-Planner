const $ = require('jquery');
const {
  render,
} = require('../src/client');
// const getAllMealsFromDB =

describe('Client', () => {
  it('It renders', () => {
    // console.log(render);
    document.body.innerHTML =
      `<div id='currentMeals'></div>`;
    render();
    expect($('body').html()).toContain('macaroni');
  });
});
