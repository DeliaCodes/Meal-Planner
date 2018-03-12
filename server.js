const {
  app,
  express,
} = require('./app.js');

app.use(express.static('dist'));

const runServer = (port) => {
  app.listen(process.env.PORT || port);
  console.log('Server running on ', port);
};

function getSomething() {
  return true;
}

module.exports = getSomething;

runServer(8010);
