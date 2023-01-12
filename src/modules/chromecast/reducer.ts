import { createReducer } from '@reduxjs/toolkit';

import {
  SET_DEVICES,
  SET_IS_CONNECTED,
  SET_CONNECTED_DEVICE,
  CONNECTING_ERROR,
  CASTING_ERROR,
  SET_CASTING_IS_LOADING,
  SET_CASTING_DATA,
  SET_IS_CONNECTING,
  SET_IS_PLAYER_EXPANDED,
  SET_IS_PLAYER_SEASONS_SELECTOR_VISIBLE,
  SET_IS_READY_TO_CAST,
  SET_IS_ATTEMPTING_TO_CAST,
  SET_IS_DEVICE_MODAL_OPEN,
  SET_VOLUME_LEVEL,
} from './constants';

const initialState = {
  devices: [],
  isConnected: false,
  isReadyToCast: false,
  isAttemptingToCast: false,
  isDeviceModalOpen: false,
  isConnecting: false,
  connectingError: null,
  connectedDevice: null,
  casting: {
    data: {},
    isLoading: false,
    error: null,
  },
  isPlayerExpanded: false,
  isPlayerSeasonsSelectorVisible: false,
  volume: null,
};

const reducers = {
  [SET_DEVICES]: (state, action) => ({
    ...state,
    devices: action.payload,
  }),
  [SET_CONNECTED_DEVICE]: (state, action) => ({
    ...state,
    connectedDevice: action.payload,
  }),
  [SET_CASTING_IS_LOADING]: (state, action) => ({
    ...state,
    casting: {
      ...state.casting,
      isLoading: action.payload,
    },
  }),
  [SET_CASTING_DATA]: (state, action) => ({
    ...state,
    casting: {
      data: action.payload,
      isLoading: false,
      error: null,
    },
  }),
  [SET_IS_CONNECTED]: (state, action) => ({
    ...state,
    isConnected: action.payload,
    isConnecting: action.payload ? false : state.isConnecting,
  }),
  [SET_IS_READY_TO_CAST]: (state, action) => ({
    ...state,
    isReadyToCast: action.payload,
  }),
  [SET_IS_ATTEMPTING_TO_CAST]: (state, action) => ({
    ...state,
    isAttemptingToCast: action.payload,
  }),
  [SET_IS_DEVICE_MODAL_OPEN]: (state, action) => ({
    ...state,
    isDeviceModalOpen: action.payload,
  }),
  [SET_IS_CONNECTING]: (state, action) => ({
    ...state,
    isConnecting: action.payload,
    isConnected: action.payload ? false : state.isConnected,
  }),
  [SET_IS_PLAYER_EXPANDED]: (state, action) => ({
    ...state,
    isPlayerExpanded: action.payload,
    isPlayerSeasonsSelectorVisible: false,
    isPlayerDisconnectVisible: false,
  }),
  [SET_IS_PLAYER_SEASONS_SELECTOR_VISIBLE]: (state, action) => ({
    ...state,
    isPlayerSeasonsSelectorVisible: action.payload,
  }),
  [CONNECTING_ERROR]: (state, action) => ({
    ...state,
    connectingError: action.payload,
  }),
  [CASTING_ERROR]: (state, action) => ({
    ...state,
    casting: {
      ...state.casting,
      isLoading: false,
      error: action.payload,
    },
  }),
  [SET_VOLUME_LEVEL]: (state, action) => ({
    ...state,
    volume: action.payload,
  }),
};

export default createReducer(initialState, reducers);
