const $ = require('jquery');
const {
  render,
  template,
  mappingMealsIntoTemplate,
} = require('../src/client');
// const getAllMealsFromDB =

describe('Testing', () => {
  it('mappingMeals is correct', () => {
    const data = [{
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    }];

    const result = mappingMealsIntoTemplate(data);
    console.log(result);

    expect(result).toContain('macaroni');
  });
});

describe('Client', () => {
  it('It renders', () => {
    // console.log(render);
    document.body.innerHTML =
      '<div><div id="currentMeals"/></div>';
    render({
      meals: [{
        name: 'macaroni',
        ingredients: ['macaroni', 'salt', 'water'],
      }],
    });

    expect($('#currentMeals').html()).toContain('macaroni');
  });

  it('templates returns', () => {
    expect(template({
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    })).toContain('macaroni');
  });
});
