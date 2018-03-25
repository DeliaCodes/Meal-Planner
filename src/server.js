// file for the application server

const {
  app,
} = require('./app.js');

const port = process.env.PORT || 8010;

app.listen(port);

console.log('Server running on ', port);
