const MongodbMemoryServer = require('mongodb-memory-server');

//should this be named something else? 
const MONGO_DB_FAKE = 'jest';

const mongod = new MongodbMemoryServer.default({
  instance: {
    dbName: MONGO_DB_FAKE,
  },
  binary: {
    version: '3.2.19',
  },
});


module.exports = () => {
  global.__MONGOD__ = mongod;
  global.__MONGO_DB_FAKE__ = MONGO_DB_FAKE;
};
