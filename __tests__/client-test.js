const $ = require('jquery');
const {
  render,
  template,
  mappingMealsIntoTemplate,
} = require('../src/client');
// const getAllMealsFromDB =

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
  it('mappingMeals is correct', () => {
    expect(mappingMealsIntoTemplate([{
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    }])).toContain('macaroni');
  });
  it('templates returns', () => {
    expect(template({
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    })).toContain('macaroni');
  });
});
