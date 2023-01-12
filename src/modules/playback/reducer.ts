/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { fromPairs } from 'ramda';
import { APIModuleState } from '../../utils/api/types';
import { PlaybackMeta } from '../../types/models/PlaybackMeta';
import { PlaybackPosition } from '../../types/models/PlaybackPosition';

import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

import {
  FETCH_OFFLINE_PLAYBACK_META,
  FETCH_PLAYBACK_META,
  REMOVE_PLAYBACK_META,
  SET_PLAYBACK_HEARTBEAT,
  SET_PLAYBACK_META,
  STOP_PLAYBACK,
} from './constants';

export function getPlaybackPositionMap(obj) {
  return fromPairs(
    PlaybackPosition.createInstances(Object.values(obj)).map(item => [item.contentId, item]),
  );
}

const reducers = {
  playbackMetaByMediaAssetId: createCustomModuleReducer<
    APIModuleState<{ [mediaAssetId: string]: PlaybackMeta | any }>
  >(
    {
      ...createApiReducer({
        actionType: FETCH_PLAYBACK_META,
        onSuccess: (state, action) => {
          if (action.meta?.isLive) {
            state.data[action.meta.mediaAssetId] = {
              id: action.meta.mediaAssetId,
              ...action.payload.startLinearPlayback,
            };
          } else {
            state.data[action.meta.mediaAssetId] = {
              mediaAssetId: action.meta.mediaAssetId,
              ...action.payload.startVodPlayback,
            };
          }
        },
      }),

      [REMOVE_PLAYBACK_META]: (state, action) => {
        const mediaAssetId = action.payload;
        delete state.data[mediaAssetId];
        delete state.error;
      },

      [SET_PLAYBACK_META]: (state, action) => {
        state.data[action.payload.mediaAssetId] = action.payload.playback;
      },
    },
    createApiInitialState({}),
  ),

  playbackConcurrencyById: createCustomModuleReducer<
    APIModuleState<{ [mediaAssetId: string]: any }>
  >(
    {
      ...createApiReducer({
        actionType: STOP_PLAYBACK,
        onSuccess: (draftState, action) => {
          const { mediaAssetId } = action.meta;
          const heartbeatTimeout = draftState.data[mediaAssetId];

          if (heartbeatTimeout) {
            clearTimeout(heartbeatTimeout);
            delete draftState.data[mediaAssetId];
          }
        },
      }),

      [SET_PLAYBACK_HEARTBEAT]: (state, action) => {
        const { mediaAssetId, heartBeatInterval } = action.payload;
        state.data[mediaAssetId] = heartBeatInterval;
      },
    },
    createApiInitialState({}),
  ),

  offlinePlaybackMetaByMediaAssetId: createCustomModuleReducer<
    APIModuleState<{ [mediaAssetId: string]: PlaybackMeta | any }>
  >(
    {
      ...createApiReducer({
        actionType: FETCH_OFFLINE_PLAYBACK_META,
        onSuccess: (state, action) => {
          state.data[action.meta.mediaAssetId] = {
            mediaAssetId: action.meta.mediaAssetId,
            ...action.payload.getOfflineVodPlayback,
          };
        },
      }),
    },
    createApiInitialState({}),
  ),
};

export default combineReducers(reducers);
