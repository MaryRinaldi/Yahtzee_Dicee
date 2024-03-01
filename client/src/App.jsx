import './App.css'
import './Dice.css'
import { useState, useRef } from "react";


export default function App() {
  const [dice1Style, setDice1Style] = useState({});
  const [dice2Style, setDice2Style] = useState({});
  const [dice3Style, setDice3Style] = useState({});
  const [dice4Style, setDice4Style] = useState({});
  const [dice5Style, setDice5Style] = useState({});
  const [sum, setSum] = useState(0)
  const [showSum, setShowSum] = useState(false);

const roll = useRef();


const randomDice = () => {
  setSum(0);
  setShowSum(false);
  const dice1Result = rollDice(1, setDice1Style);
  const dice2Result = rollDice(2, setDice2Style);
  const dice3Result = rollDice(3, setDice3Style);
  const dice4Result = rollDice(4, setDice4Style);
  const dice5Result = rollDice(5, setDice5Style);

  // Calcolare la somma dei risultati dei dadi
  const sum = dice1Result + dice2Result + dice3Result + dice4Result + dice5Result;
  console.log(`Result: ${dice1Result}, ${dice2Result}, ${dice3Result}, ${dice4Result}, ${dice5Result}`);
  console.log(`Sum: ${sum}`);
};

const rollDice = (diceNumber, setStyleObj) => {
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


  return (
    <div className='App'>
      <h2>Yahtzee Dice Roller</h2>
      <h3>Result: {showSum ? sum : ''}</h3>
     <div className="container">
        <div className="dice" style={dice1Style}>  
        <div className="face front" ></div>
        <div className="face back" ></div>
        <div className="face top"></div>
        <div className="face bottom" ></div>
        <div className="face right" ></div>
        <div className="face left" ></div>        
      </div>
      <div className="dice2" style={dice2Style}>  
        <div className="face front" ></div>
        <div className="face back" ></div>
        <div className="face top"></div>
        <div className="face bottom" ></div>
        <div className="face right" ></div>
        <div className="face left" ></div>        
      </div><div className="dice3" style={dice3Style}>  
        <div className="face front" ></div>
        <div className="face back" ></div>
        <div className="face top"></div>
        <div className="face bottom" ></div>
        <div className="face right" ></div>
        <div className="face left" ></div>        
      </div><div className="dice4" style={dice4Style}>  
        <div className="face front" ></div>
        <div className="face back" ></div>
        <div className="face top"></div>
        <div className="face bottom" ></div>
        <div className="face right" ></div>
        <div className="face left" ></div>        
      </div><div className="dice5" style={dice5Style}>  
        <div className="face front" ></div>
        <div className="face back" ></div>
        <div className="face top"></div>
        <div className="face bottom" ></div>
        <div className="face right" ></div>
        <div className="face left" ></div>        
      </div>

       </div>  
      
      <button className='roll' ref={roll} onClick={randomDice}> Roll </button>
    </div>

   
   
  );
};