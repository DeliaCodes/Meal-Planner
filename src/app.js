const moment = require('moment');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

const { mealModel } = require('./meals/meal-models');

moment().format();

app.use(bodyParser.json());
app.use(morgan('common'));

const { router: usersRouter } = require('./users');
const { router: authRouter } = require('./auth');

const { localStrategy, jwtStrategy } = require('./auth/strategies.js');

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.use(express.static('dist'));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// normally this is your express static
app.get('/', jwtAuth, (req, res) => {
  res.sendStatus(200);
});

// create meals folder and stick router into it

module.exports = {
  app,
};
