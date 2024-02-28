import './App.css'
import { useState, useRef } from "react";


export default function App()
{
const dice = useRef();
const roll = useRef();

const randomDice = () => {
  const random = Math.floor(Math.random() * 10);
  if (random >= 1 && random <= 6) {
    rollDice(random);
   } else {
    randomDice()
  }
};

const rollDice = random => {
  dice.style={animation: 'rolling 4s'};
  setTimeout(() => {
    switch (random) {
      case 1:
        dice.style={transform: 'rotateX(0deg) rotateY(0deg)'};
        break;
      case 6:
        dice.style={transform: 'rotateX(180deg) rotateY(0deg)'};
        break;
      case 2:
        dice.style={transform: 'rotateX(-90deg) rotateY(0deg)'};
        break;
      case 5:
        dice.style={transform: 'rotateX(90deg) rotateY(0deg)'};
        break;
      case 3:
        dice.style={transform: 'rotateX(0deg) rotateY(90deg)'};
        break;
      case 4:
        dice.style={transform: 'rotateX(0deg) rotateY(-90deg)'};
        break;
      default:
        break;
    }
    dice.style={animation: 'none'};
  }, 4050);
}


  return (
    <div className='App'>
      <h2>Yahtzee Dice Roller</h2>
     <div className="container">
        <div className="dice" ref={dice}>  
        <div className="face front" ></div>
        <div className="face back" ></div>
        <div className="face top"></div>
        <div className="face bottom" ></div>
        <div className="face right" ></div>
        <div className="face left" ></div>        
      </div>
      <button className='roll' ref={roll} onClick={randomDice}> Roll </button>
    </div>

    </div>
   
  );
};