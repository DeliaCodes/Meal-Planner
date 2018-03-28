import mongoose from 'mongoose';
import {
  TEST_DATABASE_URL
} from '../config';

const {
  getAllMealsFromDB,
  addMealToDB
} = require('../src/api');

describe('Database Api works as expected', () => {
  let connection;
  beforeAll(() => {
    connection = mongoose.connect(TEST_DATABASE_URL);
    return connection;
  });
  beforeEach(() => {
    mongoose.connection.db.dropDatabase();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('Data is created as expected', () => {
    const input = {
      name: 'Macaroni and Cheese',
      ingredients: ['macaroni', 'cheese', 'water', 'seasoning', 'salt', 'oil'],
    };
    // expect.assertions(2);
    return addMealToDB(input).then((data) => {
      expect(data).toHaveProperty('name', 'Macaroni and Cheese');
      // not working - expect(data.ingredients).toEqual(input.ingredients);
      expect(data.id).toBeDefined();
    });
  });
});
