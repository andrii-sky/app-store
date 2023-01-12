import { createReducer } from '@reduxjs/toolkit';
import {
  SET_IS_FULL_SCREEN,
  SET_IS_CHROMECAST_DEVICES_VISIBLE,
  SET_IS_CONTENT_RESTRICTED,
  SET_LAST_CHECKED_CONTENT,
} from './constants';

const initialState = {
  isFullScreen: false,
  isChromecastDevicesVisible: false,
  isContentRestricted: false,
  lastCheckedContent: null,
};

const reducers = {
  [SET_IS_FULL_SCREEN]: (state, action) => ({
    ...state,
    isFullScreen: action.payload,
  }),
  [SET_IS_CHROMECAST_DEVICES_VISIBLE]: (state, action) => ({
    ...state,
    isChromecastDevicesVisible: action.payload,
  }),
  [SET_IS_CONTENT_RESTRICTED]: (state, action) => ({
    ...state,
    isContentRestricted: action.payload,
  }),
  [SET_LAST_CHECKED_CONTENT]: (state, action) => ({
    ...state,
    lastCheckedContent: action.payload,
  }),
};

export default createReducer(initialState, reducers);
