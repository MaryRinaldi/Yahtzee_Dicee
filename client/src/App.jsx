import './App.css'
import './Dice.css'
// import { insertDiceRolls } from '../../model/database';
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


//functional component for the Yahtzee dice roller app
export default function App() {
//state var to manage dice styles and sum
  const [dice1Style, setDice1Style] = useState({});
  const [dice2Style, setDice2Style] = useState({});
  const [dice3Style, setDice3Style] = useState({});
  const [dice4Style, setDice4Style] = useState({});
  const [dice5Style, setDice5Style] = useState({});
  const [sum, setSum] = useState(0)
  const [showSum, setShowSum] = useState(false);
  const [keptDice, setKeptDice] = useState([]);
  const [diceStyles, setDiceStyles] = useState({
    dice1Style: {},
    dice2Style: {},
    dice3Style: {},
    dice4Style: {},
    dice5Style: {},
  });

//ref for the Roll button
const roll = useRef();

//function to generate random dice results
const randomDice = () => {
  setSum(0);
  setShowSum(false);
  const dice1Result = dice1Style.display !== 'none' ? rollDice(1, setDice1Style) : 0;
  const dice2Result = dice2Style.display !== 'none' ? rollDice(2, setDice2Style) : 0;
  const dice3Result = dice3Style.display !== 'none' ? rollDice(3, setDice3Style) : 0;
  const dice4Result = dice4Style.display !== 'none' ? rollDice(4, setDice4Style) : 0;
  const dice5Result = dice5Style.display !== 'none' ? rollDice(5, setDice5Style) : 0;
  console.log(dice1Result,dice2Result,dice3Result,dice4Result,dice5Result)
  // calculate sum of dice results
  const containerDiceSum = dice1Result + dice2Result + dice3Result + dice4Result + dice5Result;
  // calculate sum of kept dice
  const keptDiceSum = calculateKeptDiceSum();
  const totalSum = containerDiceSum + keptDiceSum;
  console.log(`Result: ${dice1Result}, ${dice2Result}, ${dice3Result}, ${dice4Result}, ${dice5Result}`);
  console.log(`Sum: ${totalSum}`);
  
};

//function to roll a single dice and update style
const rollDice = (diceNumber, setStyleObj) => {
  if (diceStyles[`dice${diceNumber}Style`].display === 'none') {
    return 0; // if dice in another sect
  }
  const random = Math.floor(Math.random() * 6) +1;
  console.log(random);
  if (random >= 1 && random <= 6) {
    setStyleObj(prev => ({...prev, animation:"rolling 3s"}));
   }
  setTimeout(() => {
    switch (random) {
      case 1:
        setStyleObj(prev => ({...prev, transform: 'rotateX(0deg) rotateY(0deg)'}));
        break;
      case 6:
        setStyleObj(prev => ({...prev, transform: 'rotateX(180deg) rotateY(0deg)'}));
        break;
      case 2:
        setStyleObj(prev => ({...prev, transform: 'rotateX(-90deg) rotateY(0deg)'}));
        break;
      case 5:
       setStyleObj(prev => ({...prev, transform: 'rotateX(90deg) rotateY(0deg)'}));
        break;
      case 3:
        setStyleObj(prev => ({...prev, transform: 'rotateX(0deg) rotateY(90deg)'}));
        break;
      case 4:
        setStyleObj(prev => ({...prev, transform: 'rotateX(0deg) rotateY(-90deg)'}));
        break;
      default:
        break;
    }
    setStyleObj(prev => ({...prev, animation: 'none'}));
    setSum(sum => sum + random)
    setShowSum(true);
  }, 1050);
  return random;
}

const calculateKeptDiceSum = () => {
  console.log(Dice.props);
  let keptDiceSum = 0;
  keptDice.forEach((dice) => { //using value from dice props
    keptDiceSum += dice.props.value;
  });
  console.log(keptDiceSum)
  return keptDiceSum
};



//function to click on specific dice
const handleDiceClick = (diceNumber) => {
  console.log(`Clicked on dice ${diceNumber}`);
  let newStyleObj = {};
  switch (diceNumber) {
    case 1:
      newStyleObj = { ...dice1Style };
      setDice1Style({ display: 'none' }); // Hide the dice in the container
      break;
    case 2:
      newStyleObj = { ...dice2Style };
      setDice2Style({ display: 'none' });
      break;
    case 3:
      newStyleObj = { ...dice3Style };
      setDice3Style({ display: 'none' });
      break;
    case 4:
      newStyleObj = { ...dice4Style };
      setDice4Style({ display: 'none' });
      break;
    case 5:
      newStyleObj = { ...dice5Style };
      setDice5Style({ display: 'none' });
      break;
    default:
      break;
  }
  // Add the clicked dice to keptDice
  setKeptDice((prevKeptDice) => [...prevKeptDice, <Dice key={diceNumber} style={newStyleObj} />]);
};
//JSX to render the app
  return (
    <div className='App'>
      <h2>Yahtzee Dice Roller</h2>
      <h4>Result: {showSum ? sum : ''}</h4>
      <div className='wrapper'>
      <div className="keptDice">
          <h3>You're keeping:</h3>
          {keptDice.map((dice, index) => (
            <React.Fragment key={index}>{dice}</React.Fragment>
          ))}
        </div>
     <div className="container">
        <Dice style={dice1Style} onClick={() => handleDiceClick(1)} />
        <Dice style={dice2Style} onClick={() => handleDiceClick(2)} />
        <Dice style={dice3Style} onClick={() => handleDiceClick(3)} />
        <Dice style={dice4Style} onClick={() => handleDiceClick(4)} />
        <Dice style={dice5Style} onClick={() => handleDiceClick(5)} />
       </div> 
       </div> 
      <button className='roll' ref={roll} onClick={randomDice}> Roll </button>
      </div>

   
   
  );
};

