"use strict";

const express = require('express');

const app = express();

app.use(express.static('public'));
app.listen(process.env.PORT || 8060);


function getSomething() {
  return true;
}

module.exports = getSomething;
