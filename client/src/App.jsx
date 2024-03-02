import './App.css'
import './Dice.css'
import React, { useState, useRef } from "react";

const Dice = ({ style, onClick, value }) => (
  <div className="dice" style={style} onClick={onClick}>
    <div className="face front"></div>
    <div className="face back"></div>
    <div className="face top"></div>
    <div className="face bottom"></div>
    <div className="face right"></div>
    <div className="face left"></div>
    <div className="value">{value}</div>
  </div>
);

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
  const [keptDice, setKeptDice] = useState([]);
  const roll = useRef();
  const [totalSum, setTotalSum] = useState(0);

  const randomDice = () => {
    setSum(0);
    setShowSum(false);
    const newDiceValues = diceValues.map((value, index) => {
      if (diceStyles[`dice${index + 1}Style`].display !== 'none') {
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
    console.log(`Clicked on dice ${diceNumber}:${diceValues[diceNumber - 1]}`);
    let newDiceObj = {};
    switch (diceNumber) {
      case 1:
        newDiceObj = { style: diceStyles.dice1Style, value: diceValues[0] };
        setDiceStyles(prev => ({...prev, dice1Style: { display: 'none' }}));
        break;
      case 2:
        newDiceObj = { style: diceStyles.dice2Style, value: diceValues[1] };
        setDiceStyles(prev => ({...prev, dice2Style: { display: 'none' }}));
        break;
      case 3:
        newDiceObj = { style: diceStyles.dice3Style, value: diceValues[2] };
        setDiceStyles(prev => ({...prev, dice3Style: { display: 'none' }}));
        break;
      case 4:
        newDiceObj = { style: diceStyles.dice4Style, value: diceValues[3] };
        setDiceStyles(prev => ({...prev, dice4Style: { display: 'none' }}));
        break;
      case 5:
        newDiceObj = { style: diceStyles.dice5Style, value: diceValues[4] };
        setDiceStyles(prev => ({...prev, dice5Style: { display: 'none' }}));
        break;
      default:
        break;
    }
    setKeptDice((prevKeptDice) => [...prevKeptDice, <Dice key={diceNumber} style={newDiceObj.style} value={newDiceObj.value} />]);
  };
  const handleKeptDiceClick = (diceNumber) => {
  console.log(`Clicked on kept dice ${diceNumber}:${keptDice[diceNumber - 1].props.value}`);
  let newDiceObj = { style: keptDice[diceNumber - 1].props.style, value: keptDice[diceNumber - 1].props.value };
  setDiceStyles(prev => {
    let newDiceStyles = {...prev};
    switch (diceNumber) {
      case 0:
        newDiceStyles.dice1Style = {...newDiceObj.style, display: 'block'};
        diceValues[0] = newDiceObj.value;
        break;
      case 1:
        newDiceStyles.dice2Style = {...newDiceObj.style, display: 'block'};
        diceValues[1] = newDiceObj.value;
        break;
      case 2:
        newDiceStyles.dice3Style = {...newDiceObj.style, display: 'block'};
        diceValues[2] = newDiceObj.value;
        break;
      case 3:
        newDiceStyles.dice4Style = {...newDiceObj.style, display: 'block'};
        diceValues[3] = newDiceObj.value;
        break;
      case 4:
        newDiceStyles.dice5Style = {...newDiceObj.style, display: 'block'};
        diceValues[4] = newDiceObj.value;
        break;
      default:
        break;
    }
    return newDiceStyles;
  });
  setKeptDice((prevKeptDice) => prevKeptDice.filter((dice, index) => index !== diceNumber));
};

  

  return (
    <div className='App'>
      <h2>Yahtzee Dice Roller</h2>
      <h4>Result: {showSum ? totalSum : ''}</h4>
      <div className='wrapper'>
        <div className="keptDice">
        <h3>You're keeping:</h3>
        {keptDice.map((dice, index) => (
          <div key={index} onClick={() => handleKeptDiceClick(index)}>
            {dice}
          </div>
        ))}
        </div>
        <div className="container">
          <h3>You got: {showSum ? sum : ''}</h3>
          <Dice style={diceStyles.dice1Style} value={diceValues[0]} onClick={() => handleDiceClick(1)} />
          <Dice style={diceStyles.dice2Style} value={diceValues[1]} onClick={() => handleDiceClick(2)} />
          <Dice style={diceStyles.dice3Style} value={diceValues[2]} onClick={() => handleDiceClick(3)} />
          <Dice style={diceStyles.dice4Style} value={diceValues[3]} onClick={() => handleDiceClick(4)} />
          <Dice style={diceStyles.dice5Style} value={diceValues[4]} onClick={() => handleDiceClick(5)} />
         </div> 
      </div> 
      <button className='roll' ref={roll} onClick={randomDice}> Roll </button>
    </div>
  );
};
