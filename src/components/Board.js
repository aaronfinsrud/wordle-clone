import { useState, useEffect } from 'react';
import { WORDS } from '../assets/words.js';
import Row from './Row';

function Board() {
  const NUMBER_OF_GUESSES = 6;
  const [guessesRemaining, setGuessesRemaining] = useState(NUMBER_OF_GUESSES);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [nextLetter, setNextLetter] = useState(0);
  const [rightGuessString, setRightGuessString] = useState('');


  useEffect(() => {
    setRightGuessString(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, [])

  useEffect(() => {
    function handleKeyboardInput(e) {
      if (guessesRemaining === 0) return;
      const pressedKey = String(e.key);
      const found = pressedKey.match(/[a-z]/gi)
      if (pressedKey === "Backspace" && nextLetter !== 0) {
          deleteLetter()
          return
      } else if (pressedKey === "Enter") {
          checkGuess()
          return
      } else if (!found || found.length > 1) {
          return;
      } else {
          insertLetter(pressedKey)
      }
    }

    document.addEventListener("keyup", handleKeyboardInput)
    return () => document.removeEventListener("keyup", handleKeyboardInput)
  }, [nextLetter])

  function insertLetter (pressedKey) {
    if (nextLetter === 5) return;
    pressedKey = pressedKey.toLowerCase();
    const row = document.getElementsByClassName('letter-row')[NUMBER_OF_GUESSES - guessesRemaining];
    const box = row.children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add('filled-box');
    setCurrentGuess([...currentGuess, pressedKey]);
    setNextLetter(nextLetter+1);
  }

  function deleteLetter() {
    const row = document.getElementsByClassName('letter-row')[NUMBER_OF_GUESSES - guessesRemaining];
    const box = row.children[nextLetter-1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    setNextLetter(nextLetter - 1);
  }

  function checkGuess() {
    const row = document.getElementsByClassName('letter-row')[NUMBER_OF_GUESSES - guessesRemaining];
    const guessString = currentGuess.join('');
    const rightGuess = Array.from(rightGuessString);
    if (guessString.length !== 5) {
      alert('Not enough letters!');
      return;
    } else if (!WORDS.includes(guessString)) {
      alert("Word not in list!");
      return;
    }
    for (var i = 0; i < currentGuess.length; i++) {
      const box = row.children[i];
      const letter = currentGuess[i];
      const letterPosition = rightGuess.indexOf(currentGuess[i]);
      let letterColor = '';
      if (letterPosition === -1) letterColor = 'grey';
      else {
        if (currentGuess[i] === rightGuess[i]) letterColor = 'green';
        else letterColor = 'yellow';
      }
      rightGuess[letterPosition] = '#';

      const delay = 250 * i;
      setTimeout(()=>{
        box.style.backgroundColor = letterColor;
        //shadeKeyBoard(letter, letterColor);
      }, delay)
    }
    if (guessString === rightGuessString) {
      alert("You guessed right!");
      setGuessesRemaining(0);
      return;
    } else {
      setGuessesRemaining(guessesRemaining-1);
      setCurrentGuess([]);
      setNextLetter(0);
      if (guessesRemaining === 0) {
        alert(`You've run out of guesses! The correct word was: ${rightGuessString}`)
      }
    }

  }

  function shadeKeyBoard(letter, color) {
   //TODO
  }


  return (
    <div className='game-board'>
      {Array(NUMBER_OF_GUESSES).fill(0).map(el =>
      <Row cols={rightGuessString.length}/>)}
    </div>
  );
}

export default Board;


