import { createAction } from '@reduxjs/toolkit';

import { SET_INTERNET_CONNECTED, SET_INTERNET_SOURCE } from '../constants';
import reducer from '../reducer';

const initialState = {
  isInternetConnected: false,
  internetSource: '',
};

test('Set internet connected', () => {
  // Given
  const isConnected = true;
  const assetAction = createAction<any>(SET_INTERNET_CONNECTED)(isConnected);
  // when and Then
  expect(reducer(initialState, assetAction)).toEqual({
    ...initialState,
    isInternetConnected: isConnected,
  });
});

test('Set internet source', () => {
  // Given
  const source = 'wifi';
  const assetAction = createAction<any>(SET_INTERNET_SOURCE)(source);
  // when and Then
  expect(reducer(initialState, assetAction)).toEqual({
    ...initialState,
    internetSource: source,
  });
});
