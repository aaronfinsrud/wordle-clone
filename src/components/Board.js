import { useState, useEffect } from 'react';
import { WORDS } from '../assets/words.js';
import Row from './Row';

function Board() {
  const NUMBER_OF_GUESSES = 6;
  const rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
  let [guessesRemaining, setGuessesRemaining] = useState(NUMBER_OF_GUESSES);
  let [currentGuess, setCurrentGuess] = useState([]);
  let [nextLetter, setNextLetter] = useState(0);

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
    let row = document.getElementsByClassName('letter-row')[NUMBER_OF_GUESSES - guessesRemaining];
    let box = row.children[nextLetter];
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

  }


  return (
    <div className='game-board'>
      {Array(NUMBER_OF_GUESSES).fill(0).map(el =>
      <Row cols={rightGuessString.length}/>)}
    </div>
  );
}

export default Board;


