// why does this need to be in a separare file?

module.exports = async function () {
  await global.__MONGOD__.stop();
};
