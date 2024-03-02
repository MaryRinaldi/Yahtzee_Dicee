var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( { title: 'Express' });
});

/* POST request for saving dice data */
router.post('/save-dice', function(req, res, next) {
  const { dice1, dice2, dice3, dice4, dice5, total_sum } = req.body;
  // Code to save dice data to the database
  console.log("Dice data:", dice1, dice2, dice3, dice4, dice5, total_sum);
  res.json({ message: 'Dice data saved successfully' });
});
module.exports = router;
