import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createFailureAPIActions, createSuccessAPIActions } from '@/testUtils/api';
import APIError from '@/errors/APIError';
import {
  alreadyActivatedSuccess,
  activationSuccess,
  accountMismatch,
  decoderNotFound,
} from './testData';
import { ACTIVATE_STB_DEVICE, SET_INITIATE_DEVICE_ACTIVATION } from '../constants';
import { activateStbDevice, initiateDeviceActivation } from '../actions';

const initState = {
  decoder: {
    activateStbDevice: {
      data: null,
    },
    deviceActivationInitiated: null,
  },
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('decoder activation', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('activation success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(activationSuccess);
    const expectedActions = createSuccessAPIActions(ACTIVATE_STB_DEVICE, activationSuccess);

    await store.dispatch(activateStbDevice('xxx', 'yyy'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('already activated success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(alreadyActivatedSuccess);
    const expectedActions = createSuccessAPIActions(ACTIVATE_STB_DEVICE, alreadyActivatedSuccess);

    await store.dispatch(activateStbDevice('xxx', 'yyy'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('decoder not found but success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(decoderNotFound);
    const expectedActions = createSuccessAPIActions(ACTIVATE_STB_DEVICE, decoderNotFound);

    await store.dispatch(activateStbDevice('xxx', 'yyy'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('account mismatch but success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(accountMismatch);
    const expectedActions = createSuccessAPIActions(ACTIVATE_STB_DEVICE, accountMismatch);

    await store.dispatch(activateStbDevice('xxx', 'yyy'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('device activation failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      ACTIVATE_STB_DEVICE,
      new APIError(error.message, error.status),
    );

    await store.dispatch(activateStbDevice('xxx', 'yyy'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set device activation initiated value', async () => {
    const defaultValue = true;
    const expectedActions = [{ payload: { value: true }, type: SET_INITIATE_DEVICE_ACTIVATION }];

    store.dispatch(initiateDeviceActivation(defaultValue) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
