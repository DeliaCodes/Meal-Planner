const {
  mealModel,
} = require('../src/meals/meal-models');
const mongoose = require('mongoose');

const {
  TEST_DATABASE_URL,
} = require('../config');

describe('Testing Meal Models', () => {
  let connection;
  beforeAll(() => {
    connection = mongoose.connect(TEST_DATABASE_URL);
    return connection;
  });
  // is this not clearing the test db?
  beforeEach(() => mongoose.connection.db.dropDatabase());

  afterAll(() => {
    mongoose.disconnect();
  });

  xit('data can be created', () => mealModel.create({
    name: 'cheeseburger',
    description: 'burger, cheese',
    dayOfWeek: 2,
  })
    .then(() =>
      mealModel.findOne().then((model) => {
        expect(model.name).toEqual('cheeseburger');
        expect(model.description).toContain('burger');
        expect(model.dayOfWeek).toEqual('2');
      })));

  xit('data can be found', () => mealModel.create({
    name: 'pretzel',
    description: 'salt, dough',
    dayOfWeek: 1,
  })
    .then(() =>
      mealModel.find().then((model) => {
        const [data] = model;
        expect(data.name).toEqual('pretzel');
        expect(data.description).toContain('salt');
        expect(data.dayOfWeek).toEqual('1');
      })));
});
