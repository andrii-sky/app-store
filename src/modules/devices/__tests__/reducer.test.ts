import { createAction } from '@reduxjs/toolkit';
import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { DrmType } from '@/types/graph-ql';
import {
  devicesResponse,
  limitExceededResponse,
  limitNotExceededResponse,
  updateDeviceNameResponse,
  deactivateDeviceSuccessResponse,
} from '@/modules/devices/__tests__/testData';
import {
  FETCH_DEVICES,
  REGISTER_DEVICE,
  UPDATE_DEVICE_NAME,
  DEACTIVATE_DEVICE,
  SET_PLAYBACK_DEVICE,
  SET_SERIAL_NUMBER,
} from '../constants';
import reducer from '../reducer';

const initialState = {
  registerDevice: createApiInitialState(null),
  devices: createApiInitialState([]),
  updateDeviceName: createApiInitialState(null),
  deactivateDevice: createApiInitialState(null),
  playbackDevice: createApiInitialState(null),
  serialNumber: null,
};

describe('register device', () => {
  test('limit not exceeded', () => {
    // Given

    const registerDeviceAction = createSuccessAPIAction(REGISTER_DEVICE, limitNotExceededResponse);
    const expectedRegisterDeviceState = createApiSuccessState(
      limitNotExceededResponse.registerDevice,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, registerDeviceAction)).toEqual({
      ...initialState,
      registerDevice: expectedRegisterDeviceState,
    });
  });

  test('limit exceeded', () => {
    // Given

    const registerDeviceAction = createSuccessAPIAction(REGISTER_DEVICE, limitExceededResponse);
    const expectedRegisterDeviceState = createApiSuccessState(limitExceededResponse.registerDevice);

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, registerDeviceAction)).toEqual({
      ...initialState,
      registerDevice: expectedRegisterDeviceState,
    });
  });
});

describe('fetch devices', () => {
  test('fetch devices ', () => {
    const fetchDevicesAction = createSuccessAPIAction(FETCH_DEVICES, devicesResponse);

    const expectedDevicesState = createApiSuccessState(devicesResponse.user.devices);

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, fetchDevicesAction)).toEqual({
      ...initialState,
      devices: expectedDevicesState,
    });
  });
});

describe('deactivate device', () => {
  test('deactivate devices ', () => {
    const deactivateDeviceAction = createSuccessAPIAction(
      DEACTIVATE_DEVICE,
      deactivateDeviceSuccessResponse,
    );

    const expectedDeactivateDeviceState = createApiSuccessState(
      deactivateDeviceSuccessResponse.deactivateDevice,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, deactivateDeviceAction)).toEqual({
      ...initialState,
      deactivateDevice: expectedDeactivateDeviceState,
    });
  });
});

describe('update device name', () => {
  test('update device name ', () => {
    const updateDeviceNameAction = createSuccessAPIAction(
      UPDATE_DEVICE_NAME,
      updateDeviceNameResponse,
    );

    const expectedUpdateDeviceNameState = createApiSuccessState(
      updateDeviceNameResponse.updateDeviceName,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, updateDeviceNameAction)).toEqual({
      ...initialState,
      updateDeviceName: expectedUpdateDeviceNameState,
    });
  });
});

describe('set playback device', () => {
  test('set playback device', () => {
    const playbackDevice = {
      platform: 'mac os',
      osVersion: '12.1',
      drmType: DrmType.Fairplay,
      drmLevel: undefined,
    };

    const setPlaybackDevice = createAction<any>(SET_PLAYBACK_DEVICE)(playbackDevice);

    expect(reducer(initialState, setPlaybackDevice)).toEqual({
      ...initialState,
      playbackDevice,
    });
  });
});

describe('set serial number', () => {
  test('set serial number', () => {
    const setSerialNumber = createAction<any>(SET_SERIAL_NUMBER)('12345');

    expect(reducer(initialState, setSerialNumber)).toEqual({
      ...initialState,
      serialNumber: '12345',
    });
  });
});
