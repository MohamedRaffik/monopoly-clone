import { createReducer, configureStore } from '@reduxjs/toolkit';
import { createBoardCoordinateGrid } from './board';
import { updateSize, movePlayer } from './actions';

const initialState = {
  Size: window.innerHeight,
  Width: window.innerHeight * .082,
  Height: window.innerHeight * .13,
  Players : [
    { currentTile: 0, move: 0 }, 
    { currentTile: 0, move: 0 },
    { currentTile: 0, move: 0 },
    { currentTile: 0, move: 0 },
    { currentTile: 0, move: 0 },
    { currentTile: 0, move: 0 },
    { currentTile: 0, move: 0 },
    { currentTile: 0, move: 0 },
  ], // TILE PLAYER IS ON
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
    newState.Players[action.payload.player - 1].move -= 1;
    newState.Players[action.payload.player - 1].currentTile = action.payload.newTile
  }
});

export type State = typeof initialState;
export const store = configureStore({ reducer });
export * from './actions';