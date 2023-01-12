import { createAction } from '@reduxjs/toolkit';
import { SET_NOTIFICATION_COUNT, SET_NOTIFICATIONS_SEEN } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const setNotificationCount = (count: number) =>
  createAction<any>(SET_NOTIFICATION_COUNT)(count);

export const setNotificationsSeen = (seen: boolean) =>
  createAction<any>(SET_NOTIFICATIONS_SEEN)(seen);
