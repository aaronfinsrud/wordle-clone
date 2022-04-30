import WORDS from "../assets/words"

const NUMBER_OF_GUESSES = 6
const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]

const initialState = {
  board: new Array(NUMBER_OF_GUESSES)
    .fill(0)
    .map(() => new Array(randomWord.length).fill("")),
  nextLetter: 0,
  rightGuessString: randomWord,
  guessesRemaining: NUMBER_OF_GUESSES,
  numberOfGuesses: NUMBER_OF_GUESSES,
}

const boardReducer = (state, action) => {
  const { numberOfGuesses, guessesRemaining, nextLetter } = state
  const boardCopy = state.board.slice()
  switch (action.type) {
    case "RESET_BOARD":
      return { initialState }
    case "GAME_OVER":
      return {
        ...state,
        guessesRemaining: 0,
      }
    case "INSERT_LETTER":
      boardCopy[numberOfGuesses - guessesRemaining][nextLetter] =
        action.character
      return {
        ...state,
        board: boardCopy,
        nextLetter: nextLetter + 1,
      }
    case "DELETE_LETTER":
      boardCopy[numberOfGuesses - guessesRemaining][nextLetter - 1] = ""
      return {
        ...state,
        board: boardCopy,
        nextLetter: nextLetter - 1,
      }
    case "SUBMIT_WORD":
      return {
        ...state,
        nextLetter: 0,
        guessesRemaining: guessesRemaining - 1,
      }
    default:
      return state
  }
}

export default { initialState, boardReducer }
