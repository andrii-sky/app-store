import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createFailureAPIActions, createSuccessAPIActions } from '@/testUtils/api';
import APIError from '@/errors/APIError';
import { clone } from 'ramda';
import { VideoQualityType } from '@/types/enums/VideoQualityType';
import { fetchMyList, setDeviceVideoQuality } from '../actions';
import { FETCH_MY_LIST, SET_DEVICE_VIDEO_QUALITY } from '../constants';
import { myListResponse, deviceVideoQualityResponse } from './testData';

const initState = {
  myStuff: {
    myList: {
      data: [],
      error: null,
      loading: false,
    },
  },
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('fetch my list', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch my list success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(myListResponse);
    const expectedActions = createSuccessAPIActions(FETCH_MY_LIST, myListResponse);

    await store.dispatch(fetchMyList());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch my list failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      FETCH_MY_LIST,
      new APIError(error.message, error.status),
    );

    await store.dispatch(fetchMyList());

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('set device video quality', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });
  test('set video quality', async () => {
    const accountId = '1234567890123456789';
    const response = clone(deviceVideoQualityResponse);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(response);
    const expectedActions = [
      {
        type: SET_DEVICE_VIDEO_QUALITY,
        payload: {
          accountId: '1234567890123456789',
          videoQuality: VideoQualityType.SAVE_MOBILE_DATA,
        },
      },
    ];

    await store.dispatch(setDeviceVideoQuality(accountId, VideoQualityType.SAVE_MOBILE_DATA));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
