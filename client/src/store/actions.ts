import { createAction } from '@reduxjs/toolkit';

export const updateSize = createAction('size/update', (newSize: number) => {
  return { payload: { newSize } };
});

export const movePlayer = createAction('player/move', (player: number, newTile: number) => {
  return { payload: { player, newTile } };
});

export const changePlayerPhase = createAction('player/phase/update', (player: number, newPhase: PlayerPhases) => {
  return { payload: { player, newPhase } };
})