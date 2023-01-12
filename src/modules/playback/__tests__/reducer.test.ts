import { createAction } from '@reduxjs/toolkit';
import { clone } from 'ramda';
import { PlaybackMeta } from '@/types/models/PlaybackMeta';

import { createSuccessAPIAction } from '../../../testUtils/api';
import { createApiInitialState } from '../../../utils/api';
import reducer from '../reducer';
import {
  REMOVE_PLAYBACK_META,
  FETCH_PLAYBACK_META,
  SET_PLAYBACK_HEARTBEAT,
  STOP_PLAYBACK,
  FETCH_OFFLINE_PLAYBACK_META,
} from '../constants';

const linearPlaybackMetaResponse = {
  startLinearPlayback: {
    __typename: 'LinearPlaybackSources',
    playbackSource: {
      streamUri: 'https://live-streams.skyone.co.nz/sky.mpd',
      drmLicense: {
        __typename: 'FairplayLicense',
        licenseUri: 'http://fp.service.expressplay.com/hms/fp/rights/?ExpressPlayToken=ZZZZ',
        certificateUri: 'https://expressplay.com/fairplay.cer',
      },
      emeHeaders: [],
    },
  },
};

const liveSubscriptionNeededResponse = {
  startLinearPlayback: {
    __typename: 'SubscriptionNeeded',
    subscriptions: [
      {
        id: 'SOHO',
        title: 'Soho',
      },
    ],
  },
};

const vodPlaybackMetaResponse = {
  startVodPlayback: {
    __typename: 'VodPlaybackSources',
    playbackSource: {
      streamUri: 'https://live-streams.skyone.co.nz/sky.mpd',
      drmLicense: {
        licenseUri: 'http://fp.service.expressplay.com/hms/fp/rights/?ExpressPlayToken=ZZZZ',
        certificateUri: 'https://expressplay.com/fairplay.cer',
      },
      emeHeaders: [
        {
          name: 'bcov-auth',
          value:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjcnQiOiJleUp3Y205bWFXeGxJanA3SW5KbGJuUmhiQ0k2ZXlKeVpXeGhkR2wyWlVWNGNHbHlZWFJwYjI0aU9pSlFNekJFSWl3aWNHeGhlVVIxY21GMGFXOXVJam9pTVRjeU9EQXdNREF3SW4xOUxDSnpkRzl5WlV4cFkyVnVjMlVpT25SeWRXVjkiLCJtYXhpcCI6MjAsImlzcyI6InRlc3QtYmFja2VuZCIsImFjY2lkIjoiNjAyMTI4OTAzNjAwMSIsImNvbmlkIjoiNjExNDM2MDY5ODAwMSIsImV4cCI6MTYxMTk3ODczNywiaWF0IjoxNjExNTQ2NzM3fQ.cXzT95ugOKedJ1lxMe1jmt8Y-yM2PQizZXSSLqRIU2M8xP9ZJj5o4ah8kf2lsLRkfOcQnvYp2Ij8hWY4XqUK6AcfmVD8gItV10S5HxsmDkHXqPNd4xSp0rr7iNSakzb_imBa73mrCa2REYbTWCdQGsXjn5ZzVuQpAA648ehpH1c',
        },
      ],
    },
  },
};

const vodSubscriptionNeededResponse = {
  startVodPlayback: {
    __typename: 'SubscriptionNeeded',
    subscriptions: [
      {
        id: 'SOHO',
        title: 'Soho',
      },
    ],
  },
};

const offlinePlaybackResponse = {
  getOfflineVodPlayback: {
    __typename: 'VodPlaybackSources',
    playbackSource: {
      streamUri: 'https://live-streams.skyone.co.nz/sky.mpd',
      drmLicense: {
        licenseUri: 'http://fp.service.expressplay.com/hms/fp/rights/?ExpressPlayToken=ZZZZ',
        certificateUri: 'https://expressplay.com/fairplay.cer',
      },
      emeHeaders: [
        {
          name: 'bcov-auth',
          value:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjcnQiOiJleUp3Y205bWFXeGxJanA3SW5KbGJuUmhiQ0k2ZXlKeVpXeGhkR2wyWlVWNGNHbHlZWFJwYjI0aU9pSlFNekJFSWl3aWNHeGhlVVIxY21GMGFXOXVJam9pTVRjeU9EQXdNREF3SW4xOUxDSnpkRzl5WlV4cFkyVnVjMlVpT25SeWRXVjkiLCJtYXhpcCI6MjAsImlzcyI6InRlc3QtYmFja2VuZCIsImFjY2lkIjoiNjAyMTI4OTAzNjAwMSIsImNvbmlkIjoiNjExNDM2MDY5ODAwMSIsImV4cCI6MTYxMTk3ODczNywiaWF0IjoxNjExNTQ2NzM3fQ.cXzT95ugOKedJ1lxMe1jmt8Y-yM2PQizZXSSLqRIU2M8xP9ZJj5o4ah8kf2lsLRkfOcQnvYp2Ij8hWY4XqUK6AcfmVD8gItV10S5HxsmDkHXqPNd4xSp0rr7iNSakzb_imBa73mrCa2REYbTWCdQGsXjn5ZzVuQpAA648ehpH1c',
        },
      ],
    },
  },
};

const offlineSubscriptionNeededResponse = {
  getOfflineVodPlayback: {
    __typename: 'SubscriptionNeeded',
    subscriptions: [
      {
        id: 'SOHO',
        title: 'Soho',
      },
    ],
  },
};

const playbackInitialState = {
  playbackMetaByMediaAssetId: createApiInitialState({}),
  playbackConcurrencyById: createApiInitialState({}),
  offlinePlaybackMetaByMediaAssetId: createApiInitialState({}),
};

test('stop playback success', () => {
  const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';
  const initState = clone(playbackInitialState);
  initState.playbackConcurrencyById.data[mediaAssetId] = 'timeout_123';
  // Given
  const stopPlayback = createSuccessAPIAction(
    STOP_PLAYBACK,
    {},
    {
      mediaAssetId,
    },
  );

  // when and Then
  const newState = reducer(initState, stopPlayback);
  expect(newState.playbackConcurrencyById.data[mediaAssetId]).toBeUndefined();
});

test('remove playback meta', () => {
  const mediaAssetId = 'chan_c7928e0a07ab47118fdc0eed4eeaac66';
  const initialState = {
    ...playbackInitialState,
    playbackMetaByMediaAssetId: {
      ...createApiInitialState({
        [mediaAssetId]: PlaybackMeta.createInstance({
          ...linearPlaybackMetaResponse.startLinearPlayback,
        }),
      }),
      error: { code: 504 },
    },
  };

  // Given
  const action = createAction<string>(REMOVE_PLAYBACK_META)(mediaAssetId);
  // when and Then
  const newState = reducer(initialState, action);
  expect(newState.playbackMetaByMediaAssetId.data[mediaAssetId]).toBeUndefined();
  expect(newState.playbackMetaByMediaAssetId.error).toBeUndefined();
});

test('request playback meta', () => {
  const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

  // Given
  const fetchPlaybackMetaAction = createSuccessAPIAction(
    FETCH_PLAYBACK_META,
    vodPlaybackMetaResponse,
    { mediaAssetId, isLive: false },
  );

  // when and Then
  const newState = reducer(playbackInitialState, fetchPlaybackMetaAction);
  expect(newState.playbackMetaByMediaAssetId.data[mediaAssetId]).toEqual({
    mediaAssetId,
    ...vodPlaybackMetaResponse.startVodPlayback,
  });
});

test('request playback subscription needed', () => {
  const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

  // Given
  const fetchPlaybackMetaAction = createSuccessAPIAction(
    FETCH_PLAYBACK_META,
    vodSubscriptionNeededResponse,
    { mediaAssetId, isLive: false },
  );

  // when and Then
  const newState = reducer(playbackInitialState, fetchPlaybackMetaAction);
  expect(newState.playbackMetaByMediaAssetId.data[mediaAssetId]).toEqual({
    mediaAssetId,
    ...vodSubscriptionNeededResponse.startVodPlayback,
  });
});

test('request live playback meta', () => {
  const mediaAssetId = 'chan_e461d91467db40f5b3ed29746a36aa27';

  // Given
  const fetchPlaybackMetaAction = createSuccessAPIAction(
    FETCH_PLAYBACK_META,
    linearPlaybackMetaResponse,
    { mediaAssetId, isLive: true },
  );

  // when and Then
  const newState = reducer(playbackInitialState, fetchPlaybackMetaAction);
  expect(newState.playbackMetaByMediaAssetId.data[mediaAssetId]).toEqual({
    id: mediaAssetId,
    ...linearPlaybackMetaResponse.startLinearPlayback,
  });
});

test('request live playback subscription needed', () => {
  const mediaAssetId = 'chan_e461d91467db40f5b3ed29746a36aa27';

  // Given
  const fetchPlaybackMetaAction = createSuccessAPIAction(
    FETCH_PLAYBACK_META,
    liveSubscriptionNeededResponse,
    { mediaAssetId, isLive: true },
  );

  // when and Then
  const newState = reducer(playbackInitialState, fetchPlaybackMetaAction);
  expect(newState.playbackMetaByMediaAssetId.data[mediaAssetId]).toEqual({
    id: mediaAssetId,
    ...liveSubscriptionNeededResponse.startLinearPlayback,
  });
});

test('set playback heartbeat', () => {
  const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';
  // Given
  const setPlaybackHeartbeat = createAction<any>(SET_PLAYBACK_HEARTBEAT)({
    mediaAssetId,
    heartBeatInterval: 123,
  });

  // when and Then
  const newState = reducer(playbackInitialState, setPlaybackHeartbeat);
  expect(newState.playbackConcurrencyById.data[mediaAssetId]).toBe(123);
});

test('request offline playback meta', () => {
  const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

  // Given
  const fetchOfflinePlaybackMetaAction = createSuccessAPIAction(
    FETCH_OFFLINE_PLAYBACK_META,
    offlinePlaybackResponse,
    { mediaAssetId },
  );

  // when and Then
  const newState = reducer(playbackInitialState, fetchOfflinePlaybackMetaAction);
  expect(newState.offlinePlaybackMetaByMediaAssetId.data[mediaAssetId]).toEqual({
    mediaAssetId,
    ...offlinePlaybackResponse.getOfflineVodPlayback,
  });
});

test('request offline playback subscription needed', () => {
  const mediaAssetId = 'asse_da11bc1de2d14aa1b0df7f9cdf3f8226';

  // Given
  const fetchOfflinePlaybackMetaAction = createSuccessAPIAction(
    FETCH_OFFLINE_PLAYBACK_META,
    offlineSubscriptionNeededResponse,
    { mediaAssetId },
  );

  // when and Then
  const newState = reducer(playbackInitialState, fetchOfflinePlaybackMetaAction);
  expect(newState.offlinePlaybackMetaByMediaAssetId.data[mediaAssetId]).toEqual({
    mediaAssetId,
    ...offlineSubscriptionNeededResponse.getOfflineVodPlayback,
  });
});
