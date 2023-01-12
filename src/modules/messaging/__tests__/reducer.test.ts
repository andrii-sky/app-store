import { createAction } from '@reduxjs/toolkit';

import { SET_GLOBAL_MESSAGE } from '../constants';
import reducer from '../reducer';

const initialState = {
  globalMessage: null,
};

test('Set global message', () => {
  // Given
  const globalMessage = 'We all gonna die!';
  const assetAction = createAction<any>(SET_GLOBAL_MESSAGE)(globalMessage);
  // when and Then
  expect(reducer(initialState, assetAction)).toEqual({
    ...initialState,
    globalMessage,
  });
});
