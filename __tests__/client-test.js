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

  it('sends data to Api', () => {
    const berryData = {
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    };

    // const addingMealToDb = require('../src/api');

    // console.log(addingMealToDb);

    /*   addingMealToDb.mockImplementation((data) => {
        const result = [];
        return result.push(data);
      }); */

    const mockApi = jest.fn();

    // console.log(addingMealToDb.mockImplementation);

    const berryResult = sendMealToDbApi(berryData, mockApi);

    const berryExpected = [{
      name: 'macaroni',
      ingredients: ['macaroni', 'salt', 'water'],
    }];

    mockApi.mockImplementationOnce((data) => {
      const result = [];
      return result.push(data);
    });

    // console.log(mockApi());

    expect(mockApi).toBeCalled();
    expect(berryResult).toEqual(berryExpected);
  });
});
