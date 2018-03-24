const {
  MongoClient,
} = require('mongodb');

let connection;

let db;

beforeAll(async () => {
  connection = /* await */ MongoClient.connect(global.__MONGO_URI__);
  db = /* await */ connection.db(global.__MONGO_DB_NAME__);
});

xit('Kitten', () => {
  expect().toBe(true);
});

afterAll(async () => {
  /* await */
  connection.close();
  /* await */
  db.close();
});
