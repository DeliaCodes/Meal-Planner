const {
  TEST_DATABASE_URL
} = require('./config');

const NodeEnvironment = require('jest-environment-node');

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  };

  async setup() {
    console.log('Setup MongoDB Test Environment');

    this.global.__MONGO_URI__ =
      TEST_DATABASE_URL
    // global.__MONGOD__
    /* await */
    super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');

    /* await */
    super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
