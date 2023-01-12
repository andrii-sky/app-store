import { createReducer } from '@reduxjs/toolkit';
import { SET_NOTIFICATION_COUNT, SET_NOTIFICATIONS_SEEN } from './constants';

export const initialState = {
  notificationCount: 0,
  notificationsSeen: false,
};

const reducers = {
  [SET_NOTIFICATION_COUNT]: (state, action) => ({
    ...state,
    notificationCount: action.payload,
  }),
  [SET_NOTIFICATIONS_SEEN]: (state, action) => ({
    ...state,
    notificationsSeen: action.payload,
  }),
};

export default createReducer(initialState, reducers);
