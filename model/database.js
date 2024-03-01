require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "Yahtzee game",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // Creation of the table for dice data
  let sql = `
    CREATE TABLE IF NOT EXISTS dice_rolls (
      id INT AUTO_INCREMENT PRIMARY KEY,
      roll1 INT NOT NULL,
      roll2 INT NOT NULL,
      roll3 INT NOT NULL,
      roll4 INT NOT NULL,
      roll5 INT NOT NULL,
      total_sum INT NOT NULL
    );
  `;

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `dice_rolls` was successful!");

    console.log("Closing connection...");
    con.end();
  });
});