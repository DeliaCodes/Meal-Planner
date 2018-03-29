/* import {
  resolve
} from 'path'; */

// file for the application server

const {
  app,
} = require('./app.js');

let server;

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  DATABASE_URL,
} = require('../config');

/* const port = process.env.PORT || 8010; */

/* app.listen(port); */

/* console.log('Server running on ', port); */

const connectMongo = mongoose.connect.bind(mongoose);
const startNodeServer = port => new Promise((resolve, reject) => {
  server = app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
    resolve();
  })
    .on('error', (err) => {
      reject(err);
    });
});
const disconnectMongo = mongoose.disconnect.bind(mongoose);

function runServer(databaseUrl = DATABASE_URL, port = 8010) {
  return connectMongo(databaseUrl)
    .then(startNodeServer(port))
    .catch((e) => {
      disconnectMongo();
      throw e;
    });
}

const closeNodeServer = () => new Promise((resolve, reject) => {
  console.log('Closing server');
  server.close(err => (err ? reject(err) : resolve()));
});

const closeServer = () => disconnectMongo().then(closeNodeServer);
/* return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
  console.log('Closing server');
  server.close((err) => {
    if (err) {
      return reject(err);
    }
    resolve();
  });
})); */


if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {
  runServer,
  closeServer,
};
