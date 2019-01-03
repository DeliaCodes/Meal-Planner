// file for the application server
require('dotenv').config();

const { app } = require('./app.js');

let server;

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('../config');

const connectMongo = mongoose.connect.bind(mongoose);
const startNodeServer = port =>
  new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
const disconnectMongo = mongoose.disconnect.bind(mongoose);

function runServer(
  databaseUrl = DATABASE_URL,
  port = process.env.PORT || 5000,
) {
  // console.log(databaseUrl);
  return connectMongo(databaseUrl, {
    useNewUrlParser: true,
  })
    .then(startNodeServer(port))
    .catch((e) => {
      disconnectMongo();
      throw e;
    });
}

const closeNodeServer = () =>
  new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => (err ? reject(err) : resolve()));
  });

const closeServer = () => disconnectMongo().then(closeNodeServer);

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {
  runServer,
  closeServer,
};
