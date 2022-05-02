import React, { useContext } from "react"
import Row from "./Row"
import { BoardContext } from "../contexts/BoardContext"

/**
 * TODO:
 * MaterialUI for alerts
 * allow input of 4 characters via one input
 * Chinese/English language toggle
 */

function Board() {
  const { state } = useContext(BoardContext)
  const { board } = state
  return (
    <div className="game-board">
      {board.map((rowArray) => (
        <Row column={rowArray} key={`row-${rowArray.id}`} />
      ))}
    </div>
  )
}

export default Board
