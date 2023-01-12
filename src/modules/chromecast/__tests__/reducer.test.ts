import { createAction } from '@reduxjs/toolkit';

import reducer from '@/modules/chromecast/reducer';

import {
  CASTING_ERROR,
  CONNECTING_ERROR,
  SET_CASTING_DATA,
  SET_CASTING_IS_LOADING,
  SET_CONNECTED_DEVICE,
  SET_DEVICES,
  SET_IS_READY_TO_CAST,
  SET_IS_CONNECTED,
  SET_IS_PLAYER_EXPANDED,
  SET_IS_PLAYER_SEASONS_SELECTOR_VISIBLE,
  SET_IS_ATTEMPTING_TO_CAST,
  SET_IS_DEVICE_MODAL_OPEN,
  SET_VOLUME_LEVEL,
} from '../constants';

const INITIAL_MOCK_STATE = {
  devices: [],
  isConnected: false,
  isReadyToCast: false,
  isAttemptingToCast: false,
  isDeviceModalOpen: false,
  isConnecting: false,
  connectingError: null,
  connectedDevice: null,
  isDevicesModalVisible: false,
  casting: {
    data: {},
    isLoading: false,
    error: null,
  },
  isPlayerExpanded: false,
  isPlayerSeasonsSelectorVisible: false,
  isPlayerDisconnectVisible: false,
  volume: null,
};

test('Set devices', () => {
  // Given
  const devices = [
    {
      id: '123456',
      deviceName: 'SpaceBar',
      isConnected: false,
    },
  ];
  const action = createAction<any[]>(SET_DEVICES)(devices);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    devices,
  });
});

test('Set connectedDevice', () => {
  // Given
  const connectedDevice = {
    id: '123456',
    deviceName: 'SpaceBar',
    isConnected: false,
  };
  const action = createAction<any>(SET_CONNECTED_DEVICE)(connectedDevice);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    connectedDevice,
  });
});

test('Set isConnected', () => {
  // Given
  const isConnected = true;
  const action = createAction<boolean>(SET_IS_CONNECTED)(isConnected);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    isConnected,
  });
});

test('Set isReadyToCast', () => {
  // Given
  const isReadyToCast = false;
  const action = createAction<boolean>(SET_IS_READY_TO_CAST)(isReadyToCast);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    isReadyToCast,
  });
});

test('Set isAttemptingToCast', () => {
  // Given
  const isAttemptingToCast = true;
  const action = createAction<boolean>(SET_IS_ATTEMPTING_TO_CAST)(isAttemptingToCast);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    isAttemptingToCast,
  });
});

test('Set isDeviceModalOpen', () => {
  // Given
  const isDeviceModalOpen = true;
  const action = createAction<boolean>(SET_IS_DEVICE_MODAL_OPEN)(isDeviceModalOpen);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    isDeviceModalOpen,
  });
});

test('Set connecting error', () => {
  // Given
  const error = new Error('connecting error');
  const action = createAction<any>(CONNECTING_ERROR)(error);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    connectingError: error,
  });
});

test('Set casting error', () => {
  // Given
  const error = new Error('casting error');
  const action = createAction<any>(CASTING_ERROR)(error);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    casting: {
      error,
      isLoading: false,
      data: {},
    },
  });
});
test('Set casting data', () => {
  // Given
  const data = {
    videoUri: 'https://somewhere.com/123',
    currentTime: 12345,
  };
  const action = createAction<any>(SET_CASTING_DATA)(data);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    casting: {
      error: null,
      isLoading: false,
      data,
    },
  });
});
test('Set casting is loading', () => {
  // Given
  const isLoading = true;
  const action = createAction<boolean>(SET_CASTING_IS_LOADING)(isLoading);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    casting: {
      error: null,
      isLoading,
      data: {},
    },
  });
});

test('Set chromecast is expanded player', () => {
  // Given
  const isPlayerExpanded = true;
  const action = createAction<boolean>(SET_IS_PLAYER_EXPANDED)(isPlayerExpanded);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    isPlayerExpanded: true,
  });
});

test('Set chromecast season selector is open', () => {
  // Given
  const isPlayerSeasonsSelectorVisible = true;
  const action = createAction<boolean>(SET_IS_PLAYER_SEASONS_SELECTOR_VISIBLE)(
    isPlayerSeasonsSelectorVisible,
  );
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    isPlayerSeasonsSelectorVisible: true,
  });
});

test('Set volume level', () => {
  // Given
  const volume = 10;
  const action = createAction<number>(SET_VOLUME_LEVEL)(volume);
  // when and Then
  expect(reducer(INITIAL_MOCK_STATE, action)).toEqual({
    ...INITIAL_MOCK_STATE,
    volume,
  });
});
