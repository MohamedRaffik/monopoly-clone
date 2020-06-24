import { createReducer, configureStore } from '@reduxjs/toolkit';
import { createBoardCoordinateGrid, createPlayers } from './board';
import { updateSize, movePlayer, changePlayerPhase } from './actions';

const initialState = {
  ws: new WebSocket('ws://localhost:8000/game'),
  Size: window.innerHeight,
  Width: window.innerHeight * .082,
  Height: window.innerHeight * .13,
  Players : createPlayers(),
  Board: createBoardCoordinateGrid(window.innerHeight)
};

const reducer = createReducer(initialState, {
  [updateSize.type]: (state, action: ReturnType<typeof updateSize>) => {
    const newState = {...state};
    newState.Size = action.payload.newSize;
    newState.Width = action.payload.newSize * .082;
    newState.Height = action.payload.newSize * .13;
    newState.Board = createBoardCoordinateGrid(action.payload.newSize);
    return newState;
  },
  [movePlayer.type]: (state, action: ReturnType<typeof movePlayer>) => {
    const newState = {...state};
    newState.Players[action.payload.player - 1].move = 0;
    newState.Players[action.payload.player - 1].currentTile = action.payload.newTile
    newState.Players[action.payload.player - 1].phase = 'LANDED';
  },
  [changePlayerPhase.type]: (state, action: ReturnType<typeof changePlayerPhase>) => {
    const newState = {...state};
    newState.Players[action.payload.player - 1].phase = 'MOVING';
  }
});

export type State = typeof initialState;
export const store = configureStore({ reducer });
export * from './actions';