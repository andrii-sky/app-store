import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import {
  createFailureAPIActions,
  createRequestAPIAction,
  createSuccessAPIActions,
} from '@/testUtils/api';
import APIError from '@/errors/APIError';
import { DrmType } from '@/types/graph-ql';
import {
  deactivateDeviceSuccessResponse,
  updateDeviceNameResponse,
  devicesResponse,
  limitExceededResponse,
  limitNotExceededResponse,
} from './testData';
import {
  REGISTER_DEVICE,
  FETCH_DEVICES,
  DEACTIVATE_DEVICE,
  UPDATE_DEVICE_NAME,
  SET_PLAYBACK_DEVICE,
  SET_SERIAL_NUMBER,
} from '../constants';
import {
  registerDevice,
  fetchDevices,
  deactivateDevice,
  updateDeviceName,
  setPlaybackDevice,
  setSerialNumber,
} from '../actions';

const initState = {
  devices: {
    registerDevice: {
      data: null,
    },
  },
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('register device', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('limit not exceeded', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(limitNotExceededResponse);
    const expectedActions = createSuccessAPIActions(REGISTER_DEVICE, limitNotExceededResponse);

    await store.dispatch(
      registerDevice({
        deviceId: '1234567890123456789',
        model: 'Sd',
        name: 'nick-name 3',
      }),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('limit exceeded', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(limitExceededResponse);
    const expectedActions = createSuccessAPIActions(REGISTER_DEVICE, limitExceededResponse);

    await store.dispatch(
      registerDevice({
        deviceId: '1234567890123456789',
        model: 'Sd',
        name: 'nick-name 3',
      }),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('register device failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      REGISTER_DEVICE,
      new APIError(error.message, error.status),
    );

    await store.dispatch(
      registerDevice({
        deviceId: '1234567890123456789',
        model: 'Sd',
        name: 'nick-name 3',
      }),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('fetch devices', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch devices success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(devicesResponse);
    const expectedActions = createSuccessAPIActions(FETCH_DEVICES, devicesResponse);

    await store.dispatch(fetchDevices());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch devices failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      FETCH_DEVICES,
      new APIError(error.message, error.status),
    );

    await store.dispatch(fetchDevices());

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('deactivate device', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('deactivate device', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(deactivateDeviceSuccessResponse);
    const expectedActions = createSuccessAPIActions(
      DEACTIVATE_DEVICE,
      deactivateDeviceSuccessResponse,
    );
    expectedActions.push(createRequestAPIAction(FETCH_DEVICES));

    await store.dispatch(deactivateDevice('deviceId'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('update device name', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('update device name success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(updateDeviceNameResponse);
    const expectedActions = createSuccessAPIActions(UPDATE_DEVICE_NAME, updateDeviceNameResponse);

    await store.dispatch(
      updateDeviceName(
        updateDeviceNameResponse.updateDeviceName.deviceId,
        updateDeviceNameResponse.updateDeviceName.name,
      ),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('update device name failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      UPDATE_DEVICE_NAME,
      new APIError(error.message, error.status),
    );

    await store.dispatch(
      updateDeviceName(
        updateDeviceNameResponse.updateDeviceName.deviceId,
        updateDeviceNameResponse.updateDeviceName.name,
      ),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set playback device', async () => {
    // setup
    const playbackDevice = {
      platform: 'mac os',
      osVersion: '12.1',
      drmType: DrmType.Fairplay,
      drmLevel: undefined,
    };

    const expectedActions = [
      {
        type: SET_PLAYBACK_DEVICE,
        payload: playbackDevice,
      },
    ];

    store.dispatch(setPlaybackDevice(playbackDevice));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set serial number', async () => {
    const expectedActions = [
      {
        type: SET_SERIAL_NUMBER,
        payload: '12345',
      },
    ];

    store.dispatch(setSerialNumber('12345'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
