import { createAction } from '@reduxjs/toolkit';

import reducer from '@/modules/tilesFocusTV/reducer';

import {
  SET_FOCUSED_ELEMENT,
  SET_FOCUSED_ROW,
  SET_FOCUSED_STATE,
  SET_IS_FOCUSED,
} from '../constants';

const initialState = {
  focusedRow: 0,
  focusedElement: 0,
  isFocused: false,
};

test('Set focused row', () => {
  // Given
  const focusedRow = 3;
  const action = createAction<any>(SET_FOCUSED_ROW)(focusedRow);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    focusedRow,
  });
});

test('Set focused element', () => {
  // Given
  const focusedElement = 5;
  const action = createAction<any>(SET_FOCUSED_ELEMENT)(focusedElement);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    focusedElement,
  });
});

test('Set is focused', () => {
  // Given
  const isFocused = true;
  const action = createAction<any>(SET_IS_FOCUSED)(isFocused);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isFocused,
  });
});

test('Set focused state', () => {
  // Given
  const isFocused = true;
  const rowIndex = 3;
  const elementIndex = 5;
  const action = createAction<any>(SET_FOCUSED_STATE)({ isFocused, rowIndex, elementIndex });
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isFocused,
    focusedRow: rowIndex,
    focusedElement: elementIndex,
  });
});
