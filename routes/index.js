var express = require('express');
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( { title: 'Express' });
});


/* POST request for saving dice data */
router.post('/save-dice', function(req, res, next) {
    const { dice1, dice2, dice3, dice4, dice5, total_sum } = req.body;
    if (![dice1, dice2, dice3, dice4, dice5].every(dice => dice >= 1 && dice <= 6)) {
      return res.status(400).json({ error: "Values must be between 1 and 6" });
  };
    const query = 'INSERT INTO dice_rolls (dice1, dice2, dice3, dice4, dice5, total_sum) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [dice1, dice2, dice3, dice4, dice5, total_sum];
    db(query, values)
      .then(result => res.json(result))
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "error in inserting dice data" });
       });
  });

  
/* GET data from database */ 
router.get('/dice-rolls', function(req, res, next) {
  const query = 'SELECT * FROM dice_rolls';
  db(query)
    .then(result => res.json(result))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Error fetching dice rolls from the database" });
    });
});

module.exports = router;
