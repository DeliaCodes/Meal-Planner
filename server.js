const express = require('express');

const path = require('path');

const app = express();

// const publicPath = path.resolve(__dirname, 'dist');

// use this or the thing below
// app.use(express.static(publicPath));
// app.use(express.static('dist'));

app.use(express.static(__dirname + '/dist'));

/* eslint-disable */
app.get('*',
  function response(req, res) {
    const options = {
      headers: {
        'content-type': 'application/javascript'
      }
    };
    // res.sendFile(path.join(__dirname, 'dist/main.css'));
    res.sendFile(path.join(__dirname, '/dist/bundle.js'), options);
    //res.sendFile(path.join(__dirname, '/dist/index.html'));
    // res.sendFile(publicPath);

  });
const runServer = (port) => {
  app.listen(process.env.PORT || port);
  console.log('Server running on ', port);
};

function getSomething() {
  return true;
}

module.exports = getSomething;

runServer(8010);
