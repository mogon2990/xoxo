import { Map } from "immutable";
const board = Map();

const MOVE = "MOVE";
const START = "START";

export const move = (turn, [row, column]) => ({
  type: MOVE,
  turn,
  row,
  column
});


//streak
const streak = (board, firstCoord, ...remainingCoords) => {
  //arugments - all but first
  let valToCompare = board.getIn(firstCoord)
  let args = [...arguments]
  const argsToCheck = args.slice(1)
  for (let i = 0; i < argsToCheck.length; i++) {
    let value = board.getIn(argsToCheck[i])
    if (value === undefined) {
      return undefined
    } else {
      if  (value !== valToCompare) {
        return undefined
      }
    }
  }
    return valToCompare
  // console.log('in streak func ', value)
}

//winner
const winner = (board) => {
  for (let i = 0; i <= 2; i++) {
    const result = streak(board, [i, 0], [i,1], [i,2])
    if ( result !== undefined) {
      return result
    }
  }
  for (let k = 0; k <=2; k++) {
    const result = streak(board, [0, k], [1, k], [2, k])
    if ( result !== undefined) {
      return result
    }
  }
  const diag1 = streak(board, [0,0], [1,1], [2,2])
  if ( diag1 !== undefined) {
    return diag1
  }
  const diag2 = streak(board, [0,2], [1,1], [2,0])
  if ( diag2 !== undefined) {
    return diag2
  }

  for (let a = 0; a <=2; a++) {
    for (let b = 0; b <= 2; b++) {
      if (!board.hasIn([a,b])) {
        return null
      }
    }
  }

  return 'draw'
}

const turnReducer = (turn='X', action) => {
  if (action.type === MOVE){
    return turn === 'X' ? 'O' : 'X'
   }
  return turn
}

const boardReducer = (board=Map(), action) => {
  if (action.type === MOVE) {
    return board.setIn([action.row, action.column], action.turn)
  }

}

export default function gameReducer(state = {board: board}, action) {
  return {
    board: boardReducer(state.board, action),
    turn: turnReducer(state.turn, action)
  }
}


// export default function gameReducer(
//   state = { board: board, turn: "O" },
//   action
// ) {
//   switch (action.type) {
//     case MOVE:
//       let turnObj = {}
//       turnReducer()

//       // if(action.turn==='X'){
//       //   turnObj = {turn : 'O'}
//       // } else if (action.turn === 'O') {
//       //   turnObj = {turn : 'X'}
//       //  }
//       return Object.assign(
//         {},
//         { board: state.board.setIn([action.row, action.column], action.turn) },
//         turnObj
//       );

//     case START:
//       return state;
//     default:
//       return state;
//   }
// }
