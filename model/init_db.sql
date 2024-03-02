-- Drop Tables
DROP TABLE IF EXISTS dice_rolls;

-- Create Tables
CREATE TABLE dice_rolls (
    id INT NOT NULL AUTO_INCREMENT,
    dice1 INT NOT NULL,
    dice2 INT NOT NULL,
    dice3 INT NOT NULL,
    dice4 INT NOT NULL,
    dice5 INT NOT NULL,
    total_sum INT NOT NULL,
    PRIMARY KEY (id)
);
