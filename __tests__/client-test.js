const $ = require('jquery');
const {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  sendMealToDbApi,
} = require('../src/client');

const {
  addingMealToDB,
} = require('../src/api');

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
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    };

    const appleStore = {
      meals: [],
    };

    const appleExpected = {
      meals: [{
        name: 'macaroni',
        ingredients: ['macaroni', 'salt', 'water'],
      }],
    };

    const appleResult = addToState(appleStore, appleCore);

    console.log(appleResult);

    expect(appleResult).toEqual(appleExpected);
  });

  it('sends data to Api', () => {
    const berryData = {
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    };

    const berryResult = sendMealToDbApi(berryData);

    const berryExpected = [{
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    }];

    expect(berryResult).toEqual(berryExpected);
  });
});
