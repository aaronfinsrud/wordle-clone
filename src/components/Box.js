import React, { useContext, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { BoardContext } from "../contexts/BoardContext"

function Box({ cell }) {
  const { dispatch, submitWord, state } = useContext(BoardContext)
  const inputRef = useRef(null)
  const { guessesRemaining, nextLetter, numberOfGuesses } = state
  const { backgroundColor, id, character } = cell
  const [ownRow, ownCol] = id.split(".").map((str) => Number(str))
  const activeRow = numberOfGuesses - guessesRemaining
  const activeCol = nextLetter
  const isActive = activeRow === ownRow && activeCol === ownCol

  useEffect(() => {
    if (isActive) {
      inputRef.current.focus()
    }
  }, [isActive])

  function handleInput(e) {
    const { value } = e.target
    if (!value) return
    const queue = value.split("")
    while (queue.length > 0) {
      const action = { type: "INSERT_LETTER", character: queue.shift() }
      dispatch(action)
    }
  }
  function handleKeyDown(e) {
    const { keyCode, target } = e
    if (keyCode === 8 && target.value === "") {
      const action = { type: "DELETE_LETTER" }
      dispatch(action)
    }
    if (keyCode === 13) {
      submitWord()
    }
  }

  return (
    <div style={{ backgroundColor }} className="letter-box">
      {isActive ? (
        <input
          onCompositionEnd={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          name={id}
          maxLength={state.rightGuessString.length - ownCol}
          ref={inputRef}
        />
      ) : (
        character
      )}
    </div>
  )
}

Box.propTypes = {
  cell: PropTypes.shape({
    character: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired,
}

export default Box
