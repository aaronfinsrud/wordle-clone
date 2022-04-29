import React, { useState, useEffect } from "react"
import { WORDS } from "../assets/words"
import Row from "./Row"

function Board() {
  const NUMBER_OF_GUESSES = 6
  const [guessesRemaining, setGuessesRemaining] = useState(NUMBER_OF_GUESSES)
  const [currentGuess, setCurrentGuess] = useState([])
  const [nextLetter, setNextLetter] = useState(0)
  const [rightGuessString, setRightGuessString] = useState("")

  useEffect(() => {
    setRightGuessString(WORDS[Math.floor(Math.random() * WORDS.length)])
  }, [])

  function deleteLetter() {
    const row =
      document.getElementsByClassName("letter-row")[
        NUMBER_OF_GUESSES - guessesRemaining
      ]
    const box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    setNextLetter(nextLetter - 1)
  }

  function insertLetter(pressedKey) {
    if (nextLetter === 5) return
    const lowerCaseKey = pressedKey.toLowerCase()
    const row =
      document.getElementsByClassName("letter-row")[
        NUMBER_OF_GUESSES - guessesRemaining
      ]
    const box = row.children[nextLetter]
    box.textContent = lowerCaseKey
    box.classList.add("filled-box")
    setCurrentGuess([...currentGuess, lowerCaseKey])
    setNextLetter(nextLetter + 1)
  }

  function checkGuess() {
    const row =
      document.getElementsByClassName("letter-row")[
        NUMBER_OF_GUESSES - guessesRemaining
      ]
    const guessString = currentGuess.join("")
    const rightGuess = Array.from(rightGuessString)
    if (guessString.length !== 5) {
      alert("Not enough letters!")
      return
    }
    if (!WORDS.includes(guessString)) {
      alert("Word not in list!")
      return
    }
    for (let i = 0; i < currentGuess.length; i += 1) {
      const box = row.children[i]
      const letterPosition = rightGuess.indexOf(currentGuess[i])
      let letterColor = ""
      if (letterPosition === -1) letterColor = "grey"
      else if (currentGuess[i] === rightGuess[i]) letterColor = "green"
      else letterColor = "yellow"
      rightGuess[letterPosition] = "#"

      const delay = 250 * i
      setTimeout(() => {
        box.style.backgroundColor = letterColor
        // shadeKeyBoard(letter, letterColor);
      }, delay)
    }
    if (guessString === rightGuessString) {
      alert("You guessed right!")
      setGuessesRemaining(0)
    } else {
      setGuessesRemaining(guessesRemaining - 1)
      setCurrentGuess([])
      setNextLetter(0)
      if (guessesRemaining === 0) {
        alert(
          `You've run out of guesses! The correct word was: ${rightGuessString}`
        )
      }
    }
  }

  useEffect(() => {
    function handleKeyboardInput(e) {
      if (guessesRemaining === 0) return
      const pressedKey = String(e.key)
      const found = pressedKey.match(/[a-z]/gi)
      if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
      } else if (pressedKey === "Enter") {
        checkGuess()
      } else if (found && found.length === 1) {
        insertLetter(pressedKey)
      }
    }

    document.addEventListener("keyup", handleKeyboardInput)
    return () => document.removeEventListener("keyup", handleKeyboardInput)
  }, [nextLetter])

  // function shadeKeyBoard(letter, color) {
  //   // TODO
  // }

  return (
    <div className="game-board">
      {Array(NUMBER_OF_GUESSES)
        .fill(0)
        .map((el, idx) => `row-${idx}`)
        .map((id, idx) => (
          <Row key={id} row={idx} cols={rightGuessString.length} />
        ))}
    </div>
  )
}

export default Board
