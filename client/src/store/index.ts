import { createReducer, createAction, configureStore } from '@reduxjs/toolkit';

const initialState = {
  Size: window.innerHeight,
  Width: window.innerHeight * .082,
  Height: window.innerHeight * .13
};

export const updateSize = createAction('size/update', (newSize: number) => {
  return { payload: { newSize } }
});

const reducer = createReducer(initialState, {
  [updateSize.type]: (state, action: ReturnType<typeof updateSize>) => {
    const newState = {...state};
    newState.Size = action.payload.newSize;
    newState.Width = action.payload.newSize * .082;
    newState.Height = action.payload.newSize * .13;
    return newState;
  }
});

export type State = typeof initialState;
export const store = configureStore({ reducer });
