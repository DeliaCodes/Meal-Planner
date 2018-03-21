const express = require('express');

const {
  addMealToDB,
} = require('./api.js');

const router = express.Router();

router.post('/', (req, res) => {
  addMealToDB(req.body);
  return res.sendStatus(200);
});
module.exports = router;
