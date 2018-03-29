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

function runServer(databaseUrl = DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {
  runServer,
  closeServer,
};
