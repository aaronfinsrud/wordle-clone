import React, { useState, useEffect, useReducer, createContext } from "react"
import PropTypes from "prop-types"
import { initialState, boardReducer } from "./BoardReducer"
import getIdioms from "../assets/words"

export const BoardContext = createContext(null)

function BoardProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(boardReducer, initialState)

  useEffect(() => {
    setLoading(false)
  }, [])

  function submitWord() {
    const { board, guessesRemaining, numberOfGuesses, rightGuessString } = state
    const currentRow = numberOfGuesses - guessesRemaining
    const guessString = board[currentRow].map((el) => el.character).join("")
    if (guessString.length < rightGuessString.length) {
      alert("Not enough letters!")
      return
    }
    const idioms = getIdioms()
    if (!idioms.includes(guessString)) {
      alert("Word not in list!")
      return
    }

    if (guessString === rightGuessString) {
      alert("You guessed right!")
      const action = { type: "WINNER" }
      dispatch(action)
    }

    // update model
    dispatch({ type: "SUBMIT_WORD" })
    for (let i = 0; i < guessString.length; i += 1) {
      const letterPosition = rightGuessString.indexOf(guessString[i])
      let letterColor = ""
      if (letterPosition === -1) letterColor = "grey"
      else if (guessString[i] === rightGuessString[i]) letterColor = "green"
      else letterColor = "yellow"
      const delay = 250 * i
      setTimeout(() => {
        dispatch({
          type: "UPDATE_BOX_COLOR",
          row: currentRow,
          col: i,
          backgroundColor: letterColor,
        })
      }, delay)
    }

    // verify guesses remaining
    if (guessesRemaining === 0) {
      alert(
        `You've run out of guesses! The correct word was: ${rightGuessString}`
      )
    }
  }

  return (
    <BoardContext.Provider value={{ state, dispatch, submitWord }}>
      {!loading && children}
    </BoardContext.Provider>
  )
}

BoardProvider.propTypes = {
  children: PropTypes.element,
}

BoardProvider.defaultProps = {
  children: null,
}

export default BoardProvider
