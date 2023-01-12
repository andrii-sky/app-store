import {
  devicesResponse,
  limitExceededResponse,
  limitNotExceededResponse,
  updateDeviceNameResponse,
} from '@/modules/devices/__tests__/testData';
import { DrmType } from '@/types/graph-ql';
import {
  devices,
  devicesError,
  devicesIsLoading,
  deviceRegistrationLimitExceeded,
  deviceRegistrationIsLoading,
  deviceRegistrationError,
  isNewlyRegisteredDevice,
  deactivateDeviceIsLoading,
  updateDeviceName,
  updateDeviceNameIsLoading,
  updateDeviceNameError,
  deactivateDeviceError,
  deviceDeactivationLimitExceeded,
  getPlaybackDeviceInfo,
  getSerialNumber,
} from '../selectors';

describe('register device', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      devices: {
        registerDevice: {
          data: null,
          isLoading: true,
          error: '',
        },
      },
    };
    const limitExceeded = deviceRegistrationLimitExceeded(defaultState);

    // Then
    expect(limitExceeded).toEqual(undefined);

    expect(deviceRegistrationIsLoading(defaultState)).toEqual(true);

    expect(deviceRegistrationError(defaultState)).toEqual('');

    expect(isNewlyRegisteredDevice(defaultState)).toEqual(false);
  });

  test('limit not exceeded', () => {
    // When limit not exceeded state
    const limitNotExceededState = {
      devices: {
        registerDevice: {
          data: limitNotExceededResponse.registerDevice,
          isLoading: false,
          error: null,
        },
      },
    };

    // Then
    expect(deviceRegistrationLimitExceeded(limitNotExceededState)).toEqual(false);
    expect(isNewlyRegisteredDevice(limitNotExceededState)).toEqual(true);
  });

  test('limit exceeded', () => {
    // When limit exceeded state
    const limitExceededState = {
      devices: {
        registerDevice: {
          data: limitExceededResponse.registerDevice,
          isLoading: false,
          error: null,
        },
      },
    };

    // Then
    expect(deviceRegistrationLimitExceeded(limitExceededState)).toEqual(true);
    expect(isNewlyRegisteredDevice(limitExceededState)).toEqual(false);
  });
});

describe('fetch devices', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      devices: {
        devices: {
          data: [],
          isLoading: true,
          error: '',
        },
      },
    };
    const limitExceeded = devices(defaultState);

    // Then
    expect(limitExceeded).toEqual([]);

    expect(devicesIsLoading(defaultState)).toEqual(true);

    expect(devicesError(defaultState)).toEqual('');
  });

  test('devices loaded', () => {
    // When default state
    const defaultState = {
      devices: {
        devices: {
          data: devicesResponse.user.devices,
          isLoading: false,
          error: null,
        },
      },
    };
    const devicesState = devices(defaultState);

    // Then
    expect(devicesState).toEqual(devicesResponse.user.devices);

    expect(devicesIsLoading(defaultState)).toEqual(false);

    expect(devicesError(defaultState)).toEqual(null);
  });
});

describe('deactivate device', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      devices: {
        deactivateDevice: {
          data: null,
          isLoading: true,
          error: '',
        },
      },
    };

    // Then
    expect(deactivateDeviceIsLoading(defaultState)).toEqual(true);

    expect(deactivateDeviceError(defaultState)).toEqual('');
  });

  test('deactivation limit exceeded ', () => {
    // When default state
    const defaultState = {
      devices: {
        deactivateDevice: {
          data: {
            __typename: 'DeviceDeactivationLimitExceeded',
          },
          isLoading: false,
          error: '',
        },
      },
    };

    // Then
    expect(deviceDeactivationLimitExceeded(defaultState)).toEqual(true);

    expect(deactivateDeviceError(defaultState)).toEqual('');
  });
});

describe('update device name', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      devices: {
        updateDeviceName: {
          data: null,
          isLoading: true,
          error: '',
        },
      },
    };

    // Then
    expect(updateDeviceName(defaultState)).toEqual(null);

    expect(updateDeviceNameIsLoading(defaultState)).toEqual(true);

    expect(updateDeviceNameError(defaultState)).toEqual('');
  });

  test('update device name', () => {
    // When default state
    const defaultState = {
      devices: {
        updateDeviceName: {
          data: updateDeviceNameResponse.updateDeviceName,
          isLoading: false,
          error: null,
        },
      },
    };
    const updateDeviceNameState = updateDeviceName(defaultState);

    // Then
    expect(updateDeviceNameState).toEqual(updateDeviceNameResponse.updateDeviceName);

    expect(updateDeviceNameIsLoading(defaultState)).toEqual(false);

    expect(updateDeviceNameError(defaultState)).toEqual(null);
  });
});

describe('playback deviceInfo', () => {
  test('get playbackDeviceInfo', () => {
    const deviceInfo = {
      platform: 'mac os',
      osVersion: '12.1',
      drmType: DrmType.Fairplay,
      drmLevel: null,
    };
    const defaultState = {
      devices: {
        playbackDevice: deviceInfo,
      },
    };

    const playbackDeviceState = getPlaybackDeviceInfo(defaultState);
    expect(playbackDeviceState).toEqual(deviceInfo);
  });
});

describe('serial number', () => {
  test('get serial number', () => {
    const defaultState = {
      devices: {
        serialNumber: '12345',
      },
    };

    const serialNumberState = getSerialNumber(defaultState);
    expect(serialNumberState).toEqual('12345');
  });
});
