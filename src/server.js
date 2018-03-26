/* import {
  resolve
} from 'path'; */

// file for the application server

const {
  app,
} = require('./app.js');

let server;

/* const port = process.env.PORT || 8010; */

/* app.listen(port); */

/* console.log('Server running on ', port); */

const runServer = () => {
  const port = process.env.PORT || 8010;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const closeServer = () => {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close((err) => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
};

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {
  runServer,
  closeServer,
};
