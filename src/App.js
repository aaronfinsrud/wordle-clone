import React from "react"
import "./App.css"
import Board from "./components/Board"
import BoardProviderWrapper from "./contexts/BoardContext";

function App() {
  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      <BoardProviderWrapper>
        <Board />
      </BoardProviderWrapper>
    </div>
  )
}

export default App
