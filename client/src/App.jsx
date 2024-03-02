import './App.css'
import './dice.css'
import './media.css'
import { Dice, rollDice } from './Dice.jsx';
import React, { useState, useRef } from "react";


export default function App() {
  
  const [diceValues, setDiceValues] = useState([1, 2, 3, 4, 5]);
  const [diceStyles, setDiceStyles] = useState({
    dice1Style: {},
    dice2Style: {},
    dice3Style: {},
    dice4Style: {},
    dice5Style: {},
  });
  const [sum, setSum] = useState(0);
  const [showSum, setShowSum] = useState(false);
  const [keptDice, setKeptDice] = useState([false, false, false, false, false]);
  const roll = useRef();
  const [totalSum, setTotalSum] = useState(0);
  const hasDiceInContainer = keptDice.includes(false)

  const randomDice = () => {
    setSum(0);
    setShowSum(false);
    const newDiceValues = diceValues.map((value, index) => {
      if (!keptDice[index]) {
        return rollDice(index + 1, `setDice${index + 1}Style`);
      }
      return value;
    });
    setDiceValues(newDiceValues);
    const totalSum = newDiceValues.reduce((a, b) => a + b, 0);
    console.log(`Result: ${newDiceValues.join(', ')}`);
    console.log(`Sum: ${totalSum}`);
    setTotalSum(totalSum);
    fetch('http://localhost:5000/api/save-dice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dice1: newDiceValues[0],
        dice2: newDiceValues[1],
        dice3: newDiceValues[2],
        dice4: newDiceValues[3],
        dice5: newDiceValues[4],
        total_sum: totalSum,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error (`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  };

  const rollDice = (diceNumber) => {
    const random = Math.floor(Math.random() * 6) + 1;
    if (random >= 1 && random <= 6) {
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
      setSum(sum => sum + random);
      setShowSum(true);
    }, 1050);
    return random;
  };
  
  const handleDiceClick = (diceNumber) => {
    console.log(`Clicked on die ${diceNumber}, which displays num ${diceValues[diceNumber - 1]}`);
    setKeptDice(prev => {
      const newKeptDice = [...prev];
      newKeptDice[diceNumber - 1] = true;
      return newKeptDice;
    });
    setSum(sum => sum - diceValues[diceNumber - 1]);
    };
  
  const handleKeptDiceClick = (diceNumber) => {
    console.log(`Clicked on stored number ${diceValues[diceNumber - 1]}`);
    setKeptDice(prev => {
      const newKeptDice = [...prev];
      newKeptDice[diceNumber - 1] = false;
      return newKeptDice;
    });
    setSum(sum => sum + diceValues[diceNumber - 1]);
   };
  

  return (
    <div className='App'>
      <h2>Yahtzee Dice Roller</h2>
      <h3 className='result'> Total sum: {showSum ? totalSum : ''}</h3>
      <div className='wrapper'>
      <div className="keptDice">
  <h3>You're keeping:</h3>
  {keptDice.map((isKept, index) => (
    isKept && (
      <div key={index} onClick={() => handleKeptDiceClick(index + 1)}>
        <Dice style={diceStyles[`dice${index + 1}Style`]} value={diceValues[index]} />
      </div>
    )
  ))}
</div>
<div className="container">
  <h3>You found: </h3>
  {diceValues.map((value, index) => (
    !keptDice[index] && (
      <Dice key={index} style={diceStyles[`dice${index + 1}Style`]} value={value} onClick={() => handleDiceClick(index + 1)} />
    )
  ))}
</div> 
      </div> 
      <button className='roll' ref={roll} onClick={randomDice} disabled={!hasDiceInContainer}> Roll </button>
<p className="Note">After rolling, click on the dice you want to store; click on it again if you want to roll that dice again.</p>

</div>
 
  );
};
