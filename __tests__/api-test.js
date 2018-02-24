const api = require('../public/api');

xdescribe('Kitten!!!!', () => {
  test('Data is created as expected', () => {
    expect(api).toEqual({
      name: 'Macaroni and Cheese',
      ingredients: ['macaroni', 'cheese', 'water', 'seasoning', 'salt', 'oil'],

    });
  });
});

// test
