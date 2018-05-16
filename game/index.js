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

export default function gameReducer(
  state = { board: board, turn: "X" },
  action
) {
  switch (action.type) {
    case MOVE:
      return Object.assign(
        {},
        { board: state.board.setIn([action.row, action.column], action.turn) },
        { turn: action.turn }
      );
    // if(action.turn==='X'){
    //   {turn : 'O'}
    // } else {
    //   {turn : 'X'}
    // }
    case START:
      return state;
    default:
      return state;
  }
}
