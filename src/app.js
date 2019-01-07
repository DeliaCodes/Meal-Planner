const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

const { mealModel } = require('./meals/meal-models');

app.use(bodyParser.json());
app.use(morgan('common'));

const { router: usersRouter } = require('./users');
const { router: authRouter } = require('./auth');
const { router: mealsRouter } = require('./meals/meals-router.js');

const { localStrategy, jwtStrategy } = require('./auth/strategies.js');

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.use(express.static('dist'));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api', mealsRouter);

// normally this is your express static
app.get('/', jwtAuth, (req, res) => {
  res.sendStatus(200);
});

module.exports = {
  app,
};
