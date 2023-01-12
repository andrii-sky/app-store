/* eslint-disable @typescript-eslint/camelcase */
import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { find, propEq } from 'ramda';
import { init } from '../../..';
import { DrmType } from '../../../types/graph-ql';
import {
  fetchPlaybackMeta,
  removePlaybackMeta,
  stopPlayback,
  refreshPlaybackHeartbeat,
  setPlaybackHeartbeat,
  fetchOfflinePlaybackMeta,
} from '../actions';
import {
  FETCH_PLAYBACK_META,
  REMOVE_PLAYBACK_META,
  STOP_PLAYBACK,
  REFRESH_PLAYBACK_HEARTBEAT,
  SET_PLAYBACK_HEARTBEAT,
  FETCH_OFFLINE_PLAYBACK_META,
} from '../constants';

import { createRequestAPIAction, createSuccessAPIActions } from '../../../testUtils/api';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const initState = {
  devices: {
    playbackDevice: {
      platform: 'macos',
      osVersion: '12',
      DrmType: DrmType.Fairplay,
      drmLevel: null,
    },
  },
  playback: {
    playbackMetaByMediaAssetId: {
      data: {},
    },
  },
};

const store = (createStore(initState) as unknown) as MockStore;

const testDevice = 'testDeviceId';

const vodPlaybackResponse = {
  startVodPlayback: {
    typename: 'VodPlaybackSources',
    playbackSource: {
      streamUri: 'https://manifest.prod.boltdns.net/manifest/v1/dash/live-baseurl/',
      drmLicense: {
        __typeName: 'WidevineLicense',
        licenseUri: 'https://manifest.prod.boltdns.net/license/v1/1',
      },
      emeHeaders: [
        {
          name: 'bcov-auth',
          value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NpZCI6IjYwM',
        },
      ],
    },
  },
};

// Given
const liveResponseData = {
  startLinearPlayback: {
    __typename: 'LinearPlaybackSources',
    streamUri: 'https://live-streams.media-preprod.skyone.co.nz/sky-sport-1.mpd',
    drmLicense: {
      __typename: 'FairplayLicense',
      licenseUri:
        'http://fp.service.expressplay.com/hms/fp/rights/?ExpressPlayToken=BgAutsOzKcoAJGNlNDk3NDc3LThjZDMtNGE2Ny1hYThmLTk1ZTQwNDE1Mjg5MAAAAIDFjKHkVpQ-6RtTK1n8_rj3eKSMJrhiDGyVZDpJTm5y3QrB-2IaOvy1wiraDhH-sizr0PGpsm9YmEon1R5jSRLJp4W9B1czCtbsE_xltxQssU5sbTkrCnE9gQim1qbUH9ZX-DCSJ5tkWfpPr-wAfb5ybk_O_Yy3Um8IHQZA2VxJlmAX-Q3_9rmdD2U2AnDsZxNnzsW4',
      certificateUri:
        'https://expressplay-fps-cert-for-live.s3-ap-southeast-2.amazonaws.com/fairplay.cer',
    },
  },
};

const offlinePlaybackResponse = {
  getOfflineVodPlayback: {
    typename: 'VodPlaybackSources',
    playbackSource: {
      streamUri: 'https://manifest.prod.boltdns.net/manifest/v1/dash/live-baseurl/',
      drmLicense: {
        __typeName: 'WidevineLicense',
        licenseUri: 'https://manifest.prod.boltdns.net/license/v1/1',
      },
      emeHeaders: [
        {
          name: 'bcov-Auth',
          value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NpZCI6IjYwM',
        },
      ],
    },
  },
};

describe('video playback actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('fetch playback from api with success', async () => {
    // Given
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(vodPlaybackResponse);

    const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

    const expectedActions = createSuccessAPIActions(FETCH_PLAYBACK_META, vodPlaybackResponse, {
      mediaAssetId,
      isLive: false,
    });
    expectedActions.push(
      createRequestAPIAction(REFRESH_PLAYBACK_HEARTBEAT, {
        mediaAssetId,
        isLive: false,
        deviceId: testDevice,
      }),
    );

    // when
    await store.dispatch(
      fetchPlaybackMeta(mediaAssetId, false, DrmType.Fairplay, testDevice) as any,
    );

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch live playback from api with success', async () => {
    (graphQLClient as jest.Mock).mockResolvedValue(liveResponseData);

    const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

    const expectedActions = createSuccessAPIActions(FETCH_PLAYBACK_META, liveResponseData, {
      mediaAssetId,
      isLive: true,
    });

    expectedActions.push(
      createRequestAPIAction(REFRESH_PLAYBACK_HEARTBEAT, {
        mediaAssetId,
        isLive: true,
        deviceId: testDevice,
      }),
    );

    // when
    await store.dispatch(
      fetchPlaybackMeta(mediaAssetId, true, DrmType.Fairplay, testDevice) as any,
    );

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('test stop vod playback', async () => {
    // given
    const response = {
      stopVodPlayback: null,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(response);

    const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

    const deviceId = '9q90890wq8-qoiwuiou-qowiowq-aklsnjk';

    const expectedActions = createSuccessAPIActions(STOP_PLAYBACK, response, {
      mediaAssetId,
    });

    // when
    await store.dispatch(stopPlayback(mediaAssetId, false, deviceId));

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('test stop live playback', async () => {
    // given
    const response = {
      stopLivePlayback: null,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(response);

    const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

    const deviceId = '9q90890wq8-qoiwuiou-qowiowq-aklsnjk';

    const expectedActions = createSuccessAPIActions(STOP_PLAYBACK, response, {
      mediaAssetId,
    });

    // when
    await store.dispatch(stopPlayback(mediaAssetId, true, deviceId));

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('clear playback', () => {
    const mediaAssetId = 'OT070655_HD';

    const expectedActions = [
      {
        type: REMOVE_PLAYBACK_META,
        payload: mediaAssetId,
      },
    ];

    // when
    store.dispatch(removePlaybackMeta(mediaAssetId));

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch playback from api with concurrency limit response', async () => {
    const mediaAssetId = 'test-video-assetId';
    const error = {
      startVodPlayback: {
        __typename: 'ConcurrentStreamsExceeded',
      },
    };

    (graphQLClient as jest.Mock).mockResolvedValue(error);
    const expectedActions = createSuccessAPIActions(FETCH_PLAYBACK_META, error, {
      mediaAssetId,
      isLive: true,
    });

    // when
    await store.dispatch(
      fetchPlaybackMeta(mediaAssetId, true, DrmType.Fairplay, testDevice) as any,
    );

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch playback heartbeat from api', async () => {
    const mediaAssetId = 'test-video-assetId';
    const response = {
      vodPlaybackHeartbeat: {
        timeToNextHeartbeat: 'PT40S',
      },
    };

    (graphQLClient as jest.Mock).mockResolvedValue(response);

    // when
    await store.dispatch(refreshPlaybackHeartbeat(mediaAssetId, false, undefined));

    // then
    expect(
      find(propEq('type', 'REFRESH_PLAYBACK_HEARTBEAT_SUCCESS'), store.getActions()),
    ).not.toBeNull();
  });

  test('set playback heartbeat from api', async () => {
    const mediaAssetId = 'test-video-assetId';

    const expectedActions = [
      {
        type: SET_PLAYBACK_HEARTBEAT,
        payload: {
          mediaAssetId,
          heartBeatInterval: 123,
        },
      },
    ];
    // when
    await store.dispatch(setPlaybackHeartbeat(mediaAssetId, 123));

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch offline playback metadata', async () => {
    // Given
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(offlinePlaybackResponse);

    const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

    const expectedActions = createSuccessAPIActions(
      FETCH_OFFLINE_PLAYBACK_META,
      offlinePlaybackResponse,
      {
        mediaAssetId,
      },
    );

    // when
    await store.dispatch(
      fetchOfflinePlaybackMeta(mediaAssetId, DrmType.Fairplay, testDevice) as any,
    );

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });
});
