import getIdioms from "../assets/words"

const NUMBER_OF_GUESSES = 6
const idioms = getIdioms()
const randomWord = idioms[Math.floor(Math.random() * idioms.length)]

export const initialState = {
  board: new Array(NUMBER_OF_GUESSES).fill(0).map((outerEl, rowIdx) => {
    const rowArray = new Array(randomWord.length)
      .fill(0)
      .map((innerEl, colIdx) => ({
        character: "",
        id: `${rowIdx}.${colIdx}`,
        backgroundColor: "",
      }))
    rowArray.id = rowIdx
    return rowArray
  }),
  nextLetter: 0,
  rightGuessString: randomWord,
  guessesRemaining: NUMBER_OF_GUESSES,
  numberOfGuesses: NUMBER_OF_GUESSES,
}

export const boardReducer = (state, action) => {
  const { numberOfGuesses, guessesRemaining, nextLetter, rightGuessString } =
    state
  const boardCopy = state.board.slice()
  switch (action.type) {
    case "RESET_BOARD":
      return { initialState }
    case "WINNER":
      return {
        ...state,
        guessesRemaining: 0,
      }
    case "INSERT_LETTER":
      boardCopy[numberOfGuesses - guessesRemaining][nextLetter].character =
        action.character
      return {
        ...state,
        board: boardCopy,
        nextLetter: Math.min(nextLetter + 1, rightGuessString.length - 1),
      }
    case "DELETE_LETTER":
      boardCopy[numberOfGuesses - guessesRemaining][nextLetter].character = ""
      return {
        ...state,
        board: boardCopy,
        nextLetter: Math.max(nextLetter - 1, 0),
      }
    case "SUBMIT_WORD":
      return {
        ...state,
        nextLetter: 0,
        guessesRemaining: guessesRemaining - 1,
      }
    case "UPDATE_BOX_COLOR":
      boardCopy[action.row][action.col].backgroundColor = action.backgroundColor
      return {
        ...state,
        board: boardCopy,
      }
    default:
      return state
  }
}
