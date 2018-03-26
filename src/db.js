// this file is for all of your monogodb and mongoose code
// should this be combined with server.js?

const mongoose = require('mongoose');

/* global SECRET_DB_USER */
const dbAddress = `mongodb://${process.env.SECRET_DB_USER}:${process.env.SECRET_DB_PS}@ds113849.mlab.com:13849/mplannerdb`;

mongoose.connect(dbAddress);

const db = mongoose.connection;

// is there a way to do this without a console statement?
db.on('error', console.error.bind(console, 'MongoDB econnection error:'));

// what do we need to export?
module.exports = {
  db,
  dbAddress,
};
