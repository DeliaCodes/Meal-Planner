class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }
  async setup() {
    console.log('Setup MongoDB Test Environment');

    this.global.__MONGO_URI__ = await global.__MONGOD__.getConnectionString();

    this.global.__MONGO_DB_FAKE__ = global.__MONGO_DB_FAKE__;

    await super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}
