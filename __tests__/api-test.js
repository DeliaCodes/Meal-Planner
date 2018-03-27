const {
  getAllMealsFromDB,
  addMealToDB,
} = require('../src/api');

describe('Database Api works as expected', () => {
  test('Data is created as expected', () => {
    const input = {
      name: 'Macaroni and Cheese',
      ingredients: ['macaroni', 'cheese', 'water', 'seasoning', 'salt', 'oil'],
    };
    expect.assertions(1);
    return addMealToDB(input).then((data) => {
      expect(data).toBe(input);
    });
  });
});
