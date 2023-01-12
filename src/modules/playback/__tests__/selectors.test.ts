import { Typename } from '@/types/enums/Typename';
/* eslint-disable @typescript-eslint/camelcase */
import {
  getOfflinePlaybackMeta,
  getOfflineSubscriptions,
  getPlaybackMeta,
  getSubscriptions,
  isConcurrentPlaybackError,
} from '../selectors';

test('playback reached concurrency limit', () => {
  // Given
  const playbackInfo = {
    __typename: Typename.ConcurrencyError,
  };

  const state = {
    playback: {
      playbackMetaByMediaAssetId: {
        data: {
          asse_da11bc1de2d14aa1b0df7f9cdf3f8226: playbackInfo,
        },
      },
    },
  };

  // when
  const playback = getPlaybackMeta(state)('asse_da11bc1de2d14aa1b0df7f9cdf3f8226');
  const isConcurrencyLimitReached = isConcurrentPlaybackError(state)(
    'asse_da11bc1de2d14aa1b0df7f9cdf3f8226',
  );

  // then
  expect(playback).toBe(undefined);
  expect(isConcurrencyLimitReached).toBeTruthy();
});

test('playback need upgrade package', () => {
  // Given
  const playbackInfo = {
    __typename: Typename.SubscriptionNeeded,
    subscriptions: [{ title: 'Soho' }],
  };

  const state = {
    playback: {
      playbackMetaByMediaAssetId: {
        data: {
          asse_da11bc1de2d14aa1b0df7f9cdf3f8226: playbackInfo,
        },
      },
    },
  };

  // when
  const playback = getPlaybackMeta(state)('asse_da11bc1de2d14aa1b0df7f9cdf3f8226');
  const subscriptions = getSubscriptions(state)('asse_da11bc1de2d14aa1b0df7f9cdf3f8226');

  // then
  expect(playback).toBe(undefined);
  expect(subscriptions).toEqual([{ title: 'Soho' }]);
});

test('select video playback', () => {
  // Given
  const playbackInfo = {
    typename: 'VodPlaybackSources',
    timeToNextHeartbeat: 'PT40S',
    playbackSource: {
      streamUri:
        'https://manifest.prod.boltdns.net/manifest/v1/hls/v5/fairplay/6021289036001/6288b0ae-81bf-4569-ae30-6c179518ecd5/10s/master.m3u8?fastly_token=NjAxZDBiYzJfYThiNTMxNzhmODVjMjA2NjE3YzFiZjdlODZkNjdhZmI4YzMzOTZkZmQ0ZTllOWY5ZTU5N2UyNDI4MjViMjg1Nw%3D%3D',
      drmLicense: {
        __typename: 'FairplayLicense',
        licenseUri:
          'https://manifest.prod.boltdns.net/license/v1/fairplay/6021289036001/6288b0ae-81bf-4569-ae30-6c179518ecd5/84eb85c1-b4ef-4299-8ace-69de2477e25b?fastly_token=NjAxZDBiYzJfY2ZkZDQ3ZWJmYjMyZTVjZmRmNzE0MmIzNTE1ZDRhOGRjMmI3MDBhMmY4NzNhNmNlNjhkMTEwNzRmMDE4ZWU3NA%3D%3D',
      },
      emeHeaders: [
        {
          name: 'bcov-auth',
          value:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJtYXhpcCI6NSwiaXNzIjoiZXhwLWFwaSIsImFjY2lkIjoiNjAyMTI4OTAzNjAwMSIsImNvbmlkIjoiNjExNDM2MDY5ODAwMSIsImV4cCI6MTYxMzA5MTA3MCwiaWF0IjoxNjEyNDg2MjcwfQ.l37iIEkverBYCELjXh9WfFf8w-4GaVlvfyYP4gdlyTHkxWUQmvriiMahs1Mn3Yv83KIWv7Xv0-417xqWSLloKW93og1gwL88YimvOyuZUzIiYiyIEChuZAcSVD3_ydz400PHzEEq0TAlFx56PdkBLbheK1ke1AI4bKxEd3of9OZ7pRlWN_u9hmFM_Dq1kR2sX4jUBAGSBykFDOgdLW107iADBDVq3OXCOq09q3CLDETo_PVe_Aa1RUSjkaDAwq6vv2-Bs1bO-Dt6GXh5Ivl4A1S459nRpbjPNTCnzU4M2ThyP-EdhXUVWun2kyb-ysJUEOX5nw_sjyzHE67c0L4mPA',
        },
      ],
    },
  };

  const state = {
    playback: {
      playbackMetaByMediaAssetId: {
        data: {
          asse_da11bc1de2d14aa1b0df7f9cdf3f8226: playbackInfo,
        },
      },
    },
  };

  // when
  const playback = getPlaybackMeta(state)('asse_da11bc1de2d14aa1b0df7f9cdf3f8226');

  // then
  expect(playback).toEqual(playbackInfo);
});

test('offline playback need upgrade package', () => {
  // Given
  const playbackInfo = {
    __typename: Typename.SubscriptionNeeded,
    subscriptions: [{ title: 'Soho' }],
  };

  const state = {
    playback: {
      offlinePlaybackMetaByMediaAssetId: {
        data: {
          asse_da11bc1de2d14aa1b0df7f9cdf3f8226: playbackInfo,
        },
      },
    },
  };

  // when
  const offlinePlayback = getOfflinePlaybackMeta(state)('asse_da11bc1de2d14aa1b0df7f9cdf3f8226');
  const offlineSubscriptions = getOfflineSubscriptions(state)(
    'asse_da11bc1de2d14aa1b0df7f9cdf3f8226',
  );

  // then
  expect(offlinePlayback).toBe(undefined);
  expect(offlineSubscriptions).toEqual([{ title: 'Soho' }]);
});

test('select offline playback', () => {
  // Given
  const playbackInfo = {
    typename: 'VodPlaybackSources',
    timeToNextHeartbeat: 'PT24H',
    playbackSource: {
      streamUri:
        'https://manifest.prod.boltdns.net/manifest/v1/hls/v5/fairplay/6021289036001/6288b0ae-81bf-4569-ae30-6c179518ecd5/10s/master.m3u8?fastly_token=NjAxZDBiYzJfYThiNTMxNzhmODVjMjA2NjE3YzFiZjdlODZkNjdhZmI4YzMzOTZkZmQ0ZTllOWY5ZTU5N2UyNDI4MjViMjg1Nw%3D%3D',
      drmLicense: {
        __typename: 'FairplayLicense',
        licenseUri:
          'https://manifest.prod.boltdns.net/license/v1/fairplay/6021289036001/6288b0ae-81bf-4569-ae30-6c179518ecd5/84eb85c1-b4ef-4299-8ace-69de2477e25b?fastly_token=NjAxZDBiYzJfY2ZkZDQ3ZWJmYjMyZTVjZmRmNzE0MmIzNTE1ZDRhOGRjMmI3MDBhMmY4NzNhNmNlNjhkMTEwNzRmMDE4ZWU3NA%3D%3D',
      },
      emeHeaders: [
        {
          name: 'bcov-auth',
          value:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJtYXhpcCI6NSwiaXNzIjoiZXhwLWFwaSIsImFjY2lkIjoiNjAyMTI4OTAzNjAwMSIsImNvbmlkIjoiNjExNDM2MDY5ODAwMSIsImV4cCI6MTYxMzA5MTA3MCwiaWF0IjoxNjEyNDg2MjcwfQ.l37iIEkverBYCELjXh9WfFf8w-4GaVlvfyYP4gdlyTHkxWUQmvriiMahs1Mn3Yv83KIWv7Xv0-417xqWSLloKW93og1gwL88YimvOyuZUzIiYiyIEChuZAcSVD3_ydz400PHzEEq0TAlFx56PdkBLbheK1ke1AI4bKxEd3of9OZ7pRlWN_u9hmFM_Dq1kR2sX4jUBAGSBykFDOgdLW107iADBDVq3OXCOq09q3CLDETo_PVe_Aa1RUSjkaDAwq6vv2-Bs1bO-Dt6GXh5Ivl4A1S459nRpbjPNTCnzU4M2ThyP-EdhXUVWun2kyb-ysJUEOX5nw_sjyzHE67c0L4mPA',
        },
      ],
    },
  };

  const state = {
    playback: {
      offlinePlaybackMetaByMediaAssetId: {
        data: {
          asse_da11bc1de2d14aa1b0df7f9cdf3f8226: playbackInfo,
        },
      },
    },
  };

  // when
  const offlinePlayback = getOfflinePlaybackMeta(state)('asse_da11bc1de2d14aa1b0df7f9cdf3f8226');

  // then
  expect(offlinePlayback).toBe(playbackInfo);
});
