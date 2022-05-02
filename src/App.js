import React from "react"
import "./App.css"
import Board from "./components/Board"
import BoardProviderWrapper from "./contexts/BoardContext"

function App() {
  return (
    <div className="App">
      <BoardProviderWrapper>
        <Board />
      </BoardProviderWrapper>
    </div>
  )
}

export default App
