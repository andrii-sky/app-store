import { createAction } from '@reduxjs/toolkit';
import { SET_INTERNET_CONNECTED, SET_INTERNET_SOURCE } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const setIsInternetConnected = isConnected =>
  createAction<string>(SET_INTERNET_CONNECTED)(isConnected);

export const setInternetSource = source => createAction<string>(SET_INTERNET_SOURCE)(source);
