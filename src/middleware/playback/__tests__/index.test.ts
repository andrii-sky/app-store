/**
 * Mock a time break
 * @param timeout waiting time
 */
import { MockStore } from 'redux-mock-store';
import {
  REFRESH_PLAYBACK_HEARTBEAT,
  SET_PLAYBACK_HEARTBEAT,
} from '../../../modules/playback/constants';
import { init } from '../../../index';
import playbackMiddlware from '../index';
import { createSuccessAPIAction } from '../../../testUtils/api';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');
const mediaAssetId = 'test-video-assetId';

const initState = {
  playback: {
    playbackMetaByMediaAssetId: {
      data: {},
    },
  },
};
initState.playback.playbackMetaByMediaAssetId.data[mediaAssetId] = {
  mediaAssetId,
  __typename: 'VodPlaybackSources',
  streamUri: 'https://live-streams.skyone.co.nz/sky.mpd',
  drmLicense: {
    licenseUri: 'http://fp.service.expressplay.com/hms/fp/rights/?ExpressPlayToken=ZZZZ',
    certificateUri: 'https://expressplay.com/fairplay.cer',
  },
  heartBeatInterval: 123,
};

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

test('when call refresh playback heartbeat', async () => {
  const response = {
    vodPlaybackHeartbeat: {
      timeToNextHeartbeat: 'PT40S',
    },
  };
  const next = jest.fn();
  // refreshPlaybackHeartbeat(mediaAssetId, false, undefined)
  const refreshAction = createSuccessAPIAction(REFRESH_PLAYBACK_HEARTBEAT, response, {
    mediaAssetId,
    isLive: false,
    deviceId: '',
  });
  playbackMiddlware(store)(next)(refreshAction);
  expect(next).toBeCalled();

  const setPlaybackHeartbeatAction = [
    {
      type: SET_PLAYBACK_HEARTBEAT,
      payload: {
        mediaAssetId,
        heartBeatInterval: 2,
      },
    },
  ];
  expect(store.getActions()).toEqual(setPlaybackHeartbeatAction);
});
