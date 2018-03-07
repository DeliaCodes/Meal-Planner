const $ = require('jquery');
const {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  sendMealToDbApi,
} = require('../src/client');

describe('Client', () => {
  it('template returns', () => {
    expect(template({
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    })).toContain('macaroni');
  });

  it('mappingMeals is correct', () => {
    const data = [{
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    }];

    const result = mappingMealsIntoTemplate(data);

    expect(result).toContain('macaroni');
  });

  it('It renders', () => {
    // console.log(render);
    document.body.innerHTML =
      '<div><div id="currentMeals"/></div>';
    const duck = {
      meals: [{
        name: 'macaroni',
        ingredients: ['macaroni', 'salt', 'water'],
      }],
    };

    render(duck);

    expect($('#currentMeals').html()).toContain('macaroni');
  });

  it('modifies store', () => {
    const appleCore = {
      meals: [{
        name: 'macaroni',
        ingredients: ['macaroni', 'salt', 'water'],
      }],
    };

    const appleResult = addToState(appleCore);

    console.log(appleResult);

    expect(appleResult).toEqual(appleCore);
  });

  it('sends data to Api', () => {
    const berryResult = sendMealToDbApi();
    expect(berryResult).toBeFalsy();
  });
});
