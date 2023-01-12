import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createFailureAPIActions, createSuccessAPIActions } from '@/testUtils/api';
import APIError from '@/errors/APIError';
import dayjs from 'dayjs';
import { decodersResponse } from './testData';
import { FETCH_DECODERS, RECORD, RESET_REMOTE_RECORD } from '../constants';
import { fetchDecoders, requestRemoteRecord, resetRemoteRecord } from '../actions';

const initState = {
  decoders: [],
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('fetch decoders', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch decoders success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(decodersResponse);
    const expectedActions = createSuccessAPIActions(FETCH_DECODERS, decodersResponse);

    await store.dispatch(fetchDecoders());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch decoders failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      FETCH_DECODERS,
      new APIError(error.message, error.status),
    );

    await store.dispatch(fetchDecoders());

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('request record', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('request record success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue('ok');
    const expectedActions = createSuccessAPIActions(RECORD, 'ok');

    await store.dispatch(
      requestRemoteRecord('EPISODE', dayjs(), 'chan_2384712987403', '19872342iu3g4h23g45'),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('request record failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      RECORD,
      new APIError(error.message, error.status),
    );

    await store.dispatch(
      requestRemoteRecord(false, dayjs(), 'chan_2384712987403', '19872342iu3g4h23g45'),
    );

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('reset record', async () => {
    store.dispatch(resetRemoteRecord());
    expect(store.getActions()).toEqual([{ type: RESET_REMOTE_RECORD, payload: undefined }]);
  });
});
