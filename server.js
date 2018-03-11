const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, 'public');

// use this or the thing below
// app.use(express.static(publicPath));
// app.use(express.static('dist'));

app.use(express.static(__dirname + '/dist'));
app.get('*',
  function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

const runServer = () => {
  app.listen(process.env.PORT || 8020);
  console.log('Server running.');
};

function getSomething() {
  return true;
}

module.exports = getSomething;

runServer();
