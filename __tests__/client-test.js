const $ = require('jquery');
const {
  render,
  template,
  mappingMealsIntoTemplate,
  addToState,
  sendMealToDbApi,
} = require('../src/client');

/* const {
  addingMealToDB,
} = require('../src/api'); */

jest.mock('../src/api');

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

        expect(appleResult).toEqual(appleExpected);
      });
