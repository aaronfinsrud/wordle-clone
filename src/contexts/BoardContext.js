import React, { useState, useEffect, useReducer, createContext } from "react"
import { boardReducer, initialState } from "./BoardReducer"

export const BoardContext = createContext(null)

function BoardProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(boardReducer, initialState)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {!loading && children}
    </BoardContext.Provider>
  )
}

export default BoardProvider
