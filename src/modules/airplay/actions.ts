import { createAction } from '@reduxjs/toolkit';
import { SET_AIRPLAY_AVAILABLE, SET_AIRPLAY_CONNECTED } from './constants';

export const setIsConnected = isConnected =>
  createAction<string>(SET_AIRPLAY_CONNECTED)(isConnected);

export const setIsAvailable = isAvailable =>
  createAction<string>(SET_AIRPLAY_AVAILABLE)(isAvailable);
