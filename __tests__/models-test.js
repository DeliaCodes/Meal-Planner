const {
  mealModel,
} = require('../src/models');
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
  beforeEach(() => {
    mongoose.connection.db.dropDatabase();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it('data can be created', () => mealModel.create({
      name: 'burger',
      ingredients: ['burger'],
    })
    .then(() =>
      mealModel.findOne().then((model) => {
        expect(model.name).toEqual('burger');
        expect(model.ingredients).toContain('burger');
      })));

  it('data can be found', () => mealModel.create({
      name: 'pretzel',
      ingredients: ['salt', 'dough'],
    })
    .then(() =>
      mealModel.find().then((model) => {
        const [data] = model;
        expect(data.name).toEqual('pretzel');
        expect(data.ingredients).toContain('salt');
      })));
});
