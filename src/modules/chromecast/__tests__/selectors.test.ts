/* eslint-disable @typescript-eslint/camelcase */
import {
  castingData,
  castingError,
  castingIsLoading,
  connectedDevice,
  connectingError,
  devices,
  isReadyToCast,
  isAttemptingToCast,
  isConnected,
  isPlayerExpanded,
  isPlayerSeasonsSelectorVisible,
  isDeviceModalOpen,
  volume,
} from '../selectors';

const MOCK_STATE = {
  chromecast: {
    devices: [
      {
        id: '123456',
        deviceName: 'SpaceBar',
        isConnected: false,
      },
    ],
    isConnected: false,
    isReadyToCast: true,
    isAttemptingToCast: false,
    connectedDevice: null,
    casting: {
      data: {},
      error: null,
      isLoading: false,
    },
    isPlayerExpanded: false,
    isPlayerSeasonsSelectorVisible: false,
  },
};

describe('selectors', () => {
  test('select devices', () => {
    // When
    const result = devices(MOCK_STATE);

    // Then
    expect(result).toEqual(MOCK_STATE.chromecast.devices);
  });
  test('select isConnected', () => {
    // Given
    const state = { chromecast: { ...MOCK_STATE.chromecast, isConnected: true } };
    // When
    const result = isConnected(state);

    // Then
    expect(result).toEqual(true);
  });
  test('select isReadyToCast', () => {
    // Given
    const state = { chromecast: { ...MOCK_STATE.chromecast, isReadyToCast: false } };
    // When
    const result = isReadyToCast(state);

    // Then
    expect(result).toEqual(false);
  });
  test('select isAttemptingToCast', () => {
    // Given
    const state = { chromecast: { ...MOCK_STATE.chromecast, isAttemptingToCast: false } };
    // When
    const result = isAttemptingToCast(state);

    // Then
    expect(result).toEqual(false);
  });
  test('select isDeviceModalOpen', () => {
    // Given
    const state = { chromecast: { ...MOCK_STATE.chromecast, isDeviceModalOpen: false } };
    // When
    const result = isDeviceModalOpen(state);

    // Then
    expect(result).toEqual(false);
  });
  test('select connectedDevice', () => {
    // Given
    const device = { id: '123', deviceName: 'VIP', isConnected: false };
    const state = { chromecast: { ...MOCK_STATE.chromecast, connectedDevice: device } };

    // When
    const result = connectedDevice(state);

    // Then
    expect(result).toEqual(device);
  });

  test('select castingError', () => {
    // Given
    const error = new Error('casting error');
    const state = { chromecast: { ...MOCK_STATE.chromecast, casting: { error } } };

    // When
    const result = castingError(state);

    // Then
    expect(result).toEqual(error);
  });
  test('select castingIsLoading', () => {
    // Given
    const state = { chromecast: { ...MOCK_STATE.chromecast, casting: { isLoading: true } } };

    // When
    const result = castingIsLoading(state);

    // Then
    expect(result).toEqual(true);
  });
  test('select castingData', () => {
    // Given
    const data = {
      playerState: 'correct',
      streamPosition: 3498,
      connected: true,
      contentID: 'content-id',
      streamDuration: 0,
    };
    const state = { chromecast: { ...MOCK_STATE.chromecast, casting: { data } } };

    // When
    const result = castingData(state);

    // Then
    expect(result).toEqual(data);
  });

  test('select connectingError', () => {
    // Given
    const error = new Error('connecting error');
    const state = { chromecast: { ...MOCK_STATE.chromecast, connectingError: error } };

    // When
    const result = connectingError(state);

    // Then
    expect(result).toEqual(error);
  });

  test('select isPlayerExpanded', () => {
    // Given
    const state = { chromecast: { ...MOCK_STATE.chromecast, isPlayerExpanded: true } };

    // When
    const result = isPlayerExpanded(state);

    // Then
    expect(result).toEqual(true);
  });

  test('select isSeasonsSelectorOpen', () => {
    // Given
    const state = {
      chromecast: { ...MOCK_STATE.chromecast, isPlayerSeasonsSelectorVisible: true },
    };

    // When
    const result = isPlayerSeasonsSelectorVisible(state);

    // Then
    expect(result).toEqual(true);
  });

  test('select volume', () => {
    // Given
    const state = {
      chromecast: { ...MOCK_STATE.chromecast, volume: 10 },
    };

    // When
    const result = volume(state);

    // Then
    expect(result).toEqual(10);
  });
});
