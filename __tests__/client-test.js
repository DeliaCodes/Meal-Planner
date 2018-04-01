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
        ingredients: ['Tea', 'water'],
      };
      // const result;
      expect(result.status).toBe(200);
      expect(result.body).toContain(input);
    });
  });

  it('template returns - template function', () => {
    expect(template({
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    })).toContain('macaroni');
  });

  it('mappingMeals is correct - mappingMealsIntoTemplate function', () => {
    const data = [{
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    }];

    const result = mappingMealsIntoTemplate(data);

    expect(result).toContain('macaroni');
  });

  it('It renders - render function', () => {
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

  it('modifies store - addToState function', () => {
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

    expect(appleResult).toEqual(appleExpected);
  });
});
