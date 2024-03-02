const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
const db = require('./model/helper.js') 

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.post('/api/save-dice', function(req, res) {
    const { dice1, dice2, dice3, dice4, dice5, total_sum } = req.body;
    if (![dice1, dice2, dice3, dice4, dice5].every(dice => dice >= 1 && dice <= 6)) {
      return res.status(400).json({ error: "I valori dei dadi devono essere compresi tra 1 e 6" });
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


module.exports = app;
