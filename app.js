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
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.post('/api/save-dice', function(req, res) {
    const { dice1, dice2, dice3, dice4, dice5, total_sum } = req.body;
    const query = 'INSERT INTO dice_rolls (roll1, roll2, roll3, roll4, roll5, total_sum) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [dice1, dice2, dice3, dice4, dice5, total_sum];
    db(query, values)
      .then(result => res.json(result))
      .catch(error => {
        console.error(error);
         res.json({ error })
      });
  });


module.exports = app;
