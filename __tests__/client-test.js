const $ = require('jquery');
const {
  render,
  template,
} = require('../src/client');
// const getAllMealsFromDB =
describe('template', () => {
  it('templates returns', () => {
    /* template({
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    }); */
    // is this expect correct?
    expect(template({
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    })).toContain('macaroni');
  });
});

describe('Client', () => {
  it('It renders', () => {
    // console.log(render);
    document.body.innerHTML =
      '<div><div id=\'currentMeals\'></div>';
    render({
      meals: [{
        name: 'macaroni',
        ingredients: ['macaroni', 'salt', 'water'],
      }],
    });
    expect($('div').html()).toContain('macaroni');
  });
});
