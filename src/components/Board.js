import React, { useContext } from "react"
import Row from "./Row"
import { BoardContext } from "../contexts/BoardContext"

/**
 * TODO:
 * Material UI for alerts
 * Chinese/English language toggle
 * Fill last character slot w/ 4 letter inpu
 */

function Board() {
  const { state, getZodiacAnimal } = useContext(BoardContext)
  const { board } = state
  const zodiacAnimal = getZodiacAnimal()
  return (
    <div className="game-board">
      <h1>Wordle Clone</h1>
      {`Year of the ${zodiacAnimal}`}
      {board.map((rowArray) => (
        <Row column={rowArray} key={`row-${rowArray.id}`} />
      ))}
    </div>
  )
}

export default Board
