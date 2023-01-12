import { createAction } from '@reduxjs/toolkit';
import reducer from '../reducer';
import {
  SET_DATE_STRING,
  SET_IS_DISABLED_RCU,
  SET_IS_MENU_OPEN,
  SET_IS_ON_SCREEN_GUIDE_VISIBLE,
  SET_KEYBOARD_OPEN,
  SET_LONG_PRESS_MODE_ID,
} from '../constants';

const initialState = {
  dateString: '',
  isMenuOpen: false,
  isDisabledRCU: false,
  isOnScreenGuideVisible: false,
  longPressModeId: '',
  isKeyBoardOpen: false,
};

test('SET_DATE_STRING', () => {
  const action = createAction<string>(SET_DATE_STRING)('6:30pm');
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    dateString: '6:30pm',
  });
});

test('SET_IS_DISABLED_RCU', () => {
  const action = createAction<boolean>(SET_IS_DISABLED_RCU)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isDisabledRCU: true,
  });
});

test('SET_IS_MENU_OPEN', () => {
  const action = createAction<boolean>(SET_IS_MENU_OPEN)(false);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isMenuOpen: false,
  });
});

test('SET_IS_ON_SCREEN_GUIDE_VISIBLE', () => {
  const action = createAction<boolean>(SET_IS_ON_SCREEN_GUIDE_VISIBLE)(false);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isOnScreenGuideVisible: false,
  });
});

test('SET_KEYBOARD_OPEN', () => {
  const action = createAction<boolean>(SET_KEYBOARD_OPEN)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isKeyBoardOpen: true,
  });
});

test('SET_LONG_PRESS_MODE_ID', () => {
  const action = createAction<string>(SET_LONG_PRESS_MODE_ID)('123');
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    longPressModeId: '123',
  });
});
