import { createAction } from '@reduxjs/toolkit';

import { SET_AIRPLAY_AVAILABLE, SET_AIRPLAY_CONNECTED } from '../constants';
import reducer from '../reducer';

const initialState = {
  isConnected: false,
  isAvailable: false,
};

test('Set airplay connected', () => {
  // Given
  const isConnected = true;
  const assetAction = createAction<any>(SET_AIRPLAY_CONNECTED)(isConnected);
  // when and Then
  expect(reducer(initialState, assetAction)).toEqual({
    ...initialState,
    isConnected,
  });
});

test('Set airplay available', () => {
  // Given
  const isAvailable = true;
  const assetAction = createAction<any>(SET_AIRPLAY_AVAILABLE)(isAvailable);
  // when and Then
  expect(reducer(initialState, assetAction)).toEqual({
    ...initialState,
    isAvailable,
  });
});
