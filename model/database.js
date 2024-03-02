require("dotenv").config();
const mysql = require("mysql");


const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "yahtzee_game",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})
  // Creation of the table for dice data
function insertDiceRolls(dice1, dice2, dice3, dice4, dice5, totalSum) {
  const sql = `
    INSERT INTO dice_rolls (dice1, dice2, dice3, dice4, dice5, total_sum)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [dice1, dice2, dice3, dice4, dice5, totalSum];

  console.log(values)

  con.query(sql, values, function(err, result) {
    if (err) {
      console.error(err)
      throw err;
    }
    console.log("Table creation `dice_rolls` was successful!");
    // After inserting data, close the connection
    con.end(function(err) {
      if (err) {
        console.error(err)
        throw err;}
      console.log("Connection closed.");
    });
  });
}


  module.exports = {
    con,
    insertDiceRolls
  };