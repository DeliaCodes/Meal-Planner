/**
 * @jest-environment jsdom
 */

const $ = require('jquery');
const {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  getMealsFromEndpoint,
  displayInOrder,
} = require('../src/client');

jest.mock('../src/api');

describe('Client Side tests', () => {
  describe('client-side to server tests', () => {
    xit('successfully return data from meals endpoint', () => {
      const result = getMealsFromEndpoint();
      console.log('getting results', result);
      expect(result.status).toBe(200);
      expect(result.response.body).toBeDefined();
    });

    xit('adds a meal to the meals endpoint', () => {
      const input = {
        name: 'Tea',
        description: 'Tea and water',
      };
      // const result;
      expect(result.status).toBe(200);
      expect(result.body).toContain(input);
    });
  });

  it('template returns - template function', () => {
    expect(template({
      name: 'macaroni',
      description: 'macaroni, salt, and water',
    })).toContain('macaroni');
  });

  it('mappingMeals is correct - mappingMealsIntoTemplate function', () => {
    const data = [{
      name: 'macaroni',
      description: 'macaroni, pepper, salt, and water',
    }];

    const result = mappingMealsIntoTemplate(data);

    expect(result).toContain('macaroni');
  });

  it('It renders - render function', () => {
    document.body.innerHTML =
      '<div><div id="currentMeals"/></div>';
    const duck = {
      meals: [{
        name: 'ravioli',
        description: 'ravioli, salt, and water',
      }],
    };

    render(duck);

    expect($('#currentMeals').html()).toContain('ravioli');
  });

  it('modifies store - addToState function', () => {
    const appleCore = {
      name: 'macaroni',
      description: 'macaroni, cayenne, salt, and water',
    };

    const appleStore = {
      meals: [],
    };

    const appleExpected = {
      meals: [{
        name: 'macaroni',
        description: 'macaroni, cayenne, salt, and water',
      }],
    };

    const appleResult = addToState(appleStore, appleCore);

    expect(appleResult).toEqual(appleExpected);
  });

  it('sorts data into proper order', () => {
    const mealsOfWeek = {
      0: ['Thing', 'other thing'],
      3: ['Gestae'],
      5: ['Res'],
    };

    const result = [
      ['Gestae'],
      ['Res'],
      ['Thing', 'other thing'],
    ];

    expect(displayInOrder(mealsOfWeek, 3)).toEqual(result);
  });
});
