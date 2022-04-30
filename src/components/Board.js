import React, { useContext } from "react"
import Row from "./Row"
import { BoardContext } from "../contexts/BoardContext"
import WORDS from "../assets/words"

function Board() {
  const { state, dispatch } = useContext(BoardContext)
  const {
    numberOfGuesses,
    guessesRemaining,
    rightGuessString,
    nextLetter,
    board,
  } = state

  function insertLetter(pressedKey) {
    // update view
    if (nextLetter === 5) return
    const lowerCaseKey = pressedKey.toLowerCase()
    const row =
      document.getElementsByClassName("letter-row")[
        numberOfGuesses - guessesRemaining
      ]
    const box = row.children[nextLetter]
    box.textContent = lowerCaseKey
    box.classList.add("filled-box")

    // update model
    const action = { type: "INSERT_LETTER", character: lowerCaseKey }
    dispatch(action)
  }

  function deleteLetter() {
    // update view
    const row =
      document.getElementsByClassName("letter-row")[
        numberOfGuesses - guessesRemaining
      ]
    const box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    // update model
    const action = { type: "DELETE_LETTER" }
    dispatch(action)
  }

  function checkGuess() {
    const row =
      document.getElementsByClassName("letter-row")[
        numberOfGuesses - guessesRemaining
      ]
    const guessString = board[numberOfGuesses - guessesRemaining].join("")
    const rightGuess = Array.from(rightGuessString)
    if (guessString.length !== 5) {
      alert("Not enough letters!")
      return
    }
    if (!WORDS.includes(guessString)) {
      alert("Word not in list!")
      return
    }
    for (let i = 0; i < guessString.length; i += 1) {
      const box = row.children[i]
      const letterPosition = rightGuess.indexOf(guessString[i])
      let letterColor = ""
      if (letterPosition === -1) letterColor = "grey"
      else if (guessString[i] === rightGuess[i]) letterColor = "green"
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
      const action = { type: "GAME_OVER" }
      dispatch(action)
    } else {
      const action = { type: "SUBMIT_WORD" }
      dispatch(action)
      if (guessesRemaining === 0) {
        alert(
          `You've run out of guesses! The correct word was: ${rightGuessString}`
        )
      }
    }
  }

  return (
    <div className="game-board">
      {Array(numberOfGuesses)
        .fill(0)
        .map((el, idx) => `row-${idx}`)
        .map((id, idx) => (
          <Row
            key={id}
            row={idx}
            cols={rightGuessString.length}
            activeRow={numberOfGuesses - guessesRemaining === idx}
          />
        ))}
    </div>
  )
}

export default Board
