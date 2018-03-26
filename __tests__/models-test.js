const {
  mealModel,
} = require('../src/models');
const mongoose = require('mongoose');

const {
  TEST_DATABASE_URL,
} = require('../config');

/* const {
  MongoClient,
} = require('mongodb'); */


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
    })
    .then(() =>
      mealModel.findOne().then((model) => {
        expect(model.name).toEqual('burger');
      })));
});