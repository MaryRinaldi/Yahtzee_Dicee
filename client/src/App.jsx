import React, { useState, useRef, useEffect } from "react";
import { Dice, rollDice } from './Dice.jsx';
import './App.css'
import './dice.css'
import './media.css'

export default function App() {
  
  const [diceValues, setDiceValues] = useState([1, 2, 3, 4, 5]);
  const [diceStyles, setDiceStyles] = useState({
    dice1Style: {},
    dice2Style: {},
    dice3Style: {},
    dice4Style: {},
    dice5Style: {},
  });
  const [diceRolls, setDiceRolls] = useState([]);
  const [sum, setSum] = useState(0);
  const [showSum, setShowSum] = useState(false);
  const [keptDice, setKeptDice] = useState([false, false, false, false, false]);
  const roll = useRef();
  const [totalSum, setTotalSum] = useState(0);
  const hasDiceInContainer = keptDice.includes(false)
  const [throwCount, setThrowCount] = useState(0);
  const [selectedRollId, setSelectedRollId] = useState(null);

  const randomDice = () => {
    setThrowCount(prevCount => prevCount +1);
    setSum(0);
    const newDiceValues = diceValues.map((value, index) => 
      !keptDice[index] ? rollDice({diceNumber: index + 1, setDiceStyles, diceValues, keptDice}) : value
    );
    setDiceValues(newDiceValues);
    const totalSum = newDiceValues.reduce((a, b) => a + b, 0);
      setTimeout(() => {
      setTotalSum(totalSum);
      setShowSum(true);
    fetchDiceRolls();
  }, 1200); 
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

  useEffect(() => {
    fetchDiceRolls();
  }, []);

  const fetchDiceRolls = () => {
    fetch('http://localhost:5000/api/dice-rolls')
      .then(response => {
        if (!response.ok) {
          throw new Error (`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setDiceRolls(data.data); // Assicurati che la struttura dei dati sia appropriata
      })
      .catch((error) => console.error('Error:', error));
  };

  const startNewTurn = () => {
    setThrowCount(0);
    setKeptDice([false, false, false, false, false,]);
    setDiceValues([1, 2, 3, 4, 5]);
    setTotalSum(0);
    setShowSum(false);
  };
  
  const handleDiceClick = (diceNumber) => {
      setKeptDice(prev => {
      const newKeptDice = [...prev];
      newKeptDice[diceNumber - 1] = true;
      return newKeptDice;
    });
    setSum(sum => sum - diceValues[diceNumber - 1]);
    };
  
  const handleKeptDiceClick = (diceNumber) => {
      setKeptDice(prev => {
      const newKeptDice = [...prev];
      newKeptDice[diceNumber - 1] = false;
      return newKeptDice;
    });
    setSum(sum => sum + diceValues[diceNumber - 1]);
   };

   const handleRollSelect = (rollId) => {
    setSelectedRollId(rollId);
  };  

  return (
    <div className='App'>
      <h2>Yahtzee Dice Roller</h2>
      <h3 className='result'> Total sum: {showSum ? totalSum : ''}</h3>
      <p className="counts">Count your rolls: {throwCount}</p>
      <div className='wrapper'>
      <div className="keptDice">
  <h3>You're keeping:</h3>
  {keptDice.map((isKept, index) => (
    isKept && (
      <div key={index} onClick={() => handleKeptDiceClick(index + 1)}>
        <Dice
        style={diceStyles[`dice${index + 1}Style`]}
        value={diceValues[index]}
        diceValues={diceValues}
        keptDice={keptDice}
        setDiceStyles={setDiceStyles}
        onClick={() => handleKeptDiceClick(index + 1)}
        />
      </div>
    )
  ))}
</div>
<div className="container">
  <h3>You found: </h3>
  {diceValues.map((value, index) => (
    !keptDice[index] && (
      <Dice
      key={index}
      style={diceStyles[`dice${index + 1}Style`]}
      value={value}
      onClick={() => handleDiceClick(index + 1)}
      diceNumber={index + 1} 
      setDiceStyles={setDiceStyles} 
       />
    )
  ))}
</div> 
      </div> 
      <button className='roll' ref={roll} onClick={randomDice} disabled={!hasDiceInContainer}> Roll </button>
      <button className='newTurn' onClick={startNewTurn}>Start New Turn</button>
      <h4>History of your rolls</h4>
<select onChange={(e) => handleRollSelect(e.target.value)}>
  {diceRolls.length > 0 && (
    <>
    <option value="lastThrow">Select a roll</option>
  {diceRolls.map((roll, index) => (
    <option key={index} value={roll.id}>Roll N. {roll.id}</option> 
  ))}
    </>
  )}
</select>
<ul>
  {selectedRollId === "lastThrow" || !selectedRollId ? ( //checking throw ID 
    diceRolls.length > 0 && (
      <li className="lastThrow">
        {/* <p>Roll N. {diceRolls[diceRolls.length - 1].id}</p> */}
        <p>Die 1: {diceRolls[diceRolls.length - 1].dice1}</p>
        <p>Die 2: {diceRolls[diceRolls.length - 1].dice2}</p>
        <p>Die 3: {diceRolls[diceRolls.length - 1].dice3}</p>
        <p>Die 4: {diceRolls[diceRolls.length - 1].dice4}</p>
        <p>Die 5: {diceRolls[diceRolls.length - 1].dice5}</p>
        <p>Total Sum: {diceRolls[diceRolls.length - 1].total_sum}</p>
      </li>
    )
  ) : (
    diceRolls.filter(roll => roll.id === Number(selectedRollId))  //filter array diceRoll to find ID corresponding to selected one (must be a num)
    .map((roll, index) => ( 
      <li className="throws" key={index}>
        <p>Throw {roll.id}</p>
        <p>Die 1: {roll.dice1}</p>
        <p>Die 2: {roll.dice2}</p>
        <p>Die 3: {roll.dice3}</p>
        <p>Die 4: {roll.dice4}</p>
        <p>Die 5: {roll.dice5}</p>
        <p>Total Sum: {roll.total_sum}</p>
      </li>
    ))
  )}
</ul>


<p className="Note">After rolling, click on the dice you want to store; click on it again if you want to roll that dice again.</p>
</div>
  );
};
