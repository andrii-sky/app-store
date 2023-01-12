import { createAction } from '@reduxjs/toolkit';
import reducer from '../reducer';
import { SET_NOTIFICATION_COUNT, SET_NOTIFICATIONS_SEEN } from '../constants';

const initialState = {
  notificationCount: 0,
  notificationsSeen: false,
};

test('set notifications count', () => {
  const action = createAction<number>(SET_NOTIFICATION_COUNT)(4);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    notificationCount: 4,
  });
});

test('set notifications seen', () => {
  const action = createAction<boolean>(SET_NOTIFICATIONS_SEEN)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    notificationsSeen: true,
  });
});
