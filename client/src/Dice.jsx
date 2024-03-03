import React from 'react';

export const Dice = ({ style, onClick, value, diceNumber, setDiceStyles }) => (
  <div className="dice" style={style} onClick={() => onClick(diceNumber)}>
    <div className="face front"></div>
    <div className="face back"></div>
    <div className="face top"></div>
    <div className="face bottom"></div>
    <div className="face right"></div>
    <div className="face left"></div>
    <div className="value">{value}</div>
  </div>
);

export const rollDice = ({diceNumber, setDiceStyles, diceValues, keptDice}) => {
  const random = Math.floor(Math.random() * 6) + 1;
  if (random >= 1 && random <= 6) {
    //checking for the face style:
    setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], animation:"rolling 3s"}}));
  }
  setTimeout(() => {
    switch (random) {
      case 1:
        setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], transform: 'rotateX(0deg) rotateY(0deg)'}}));
        break;
      case 6:
        setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], transform: 'rotateX(180deg) rotateY(0deg)'}}));
        break;
      case 2:
        setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], transform: 'rotateX(-90deg) rotateY(0deg)'}}));
        break;
      case 5:
        setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], transform: 'rotateX(90deg) rotateY(0deg)'}}));
        break;
      case 3:
        setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], transform: 'rotateX(0deg) rotateY(90deg)'}}));
        break;
      case 4:
        setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], transform: 'rotateX(0deg) rotateY(-90deg)'}}));
        break;
      default:
        break;
    }
    setDiceStyles(prev => ({...prev, [`dice${diceNumber}Style`]: {...prev[`dice${diceNumber}Style`], animation: 'none'}}));
  }, 1050);
  return random;
};