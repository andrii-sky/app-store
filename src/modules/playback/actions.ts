import { createAction } from '@reduxjs/toolkit';

import { Typename } from '@/types/enums/Typename';
import { equals } from 'ramda';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import { createApiAction } from '../../utils/api';
import {
  FETCH_PLAYBACK_META,
  REMOVE_PLAYBACK_META,
  STOP_PLAYBACK,
  REFRESH_PLAYBACK_HEARTBEAT,
  SET_PLAYBACK_HEARTBEAT,
  SET_PLAYBACK_META,
  FETCH_OFFLINE_PLAYBACK_META,
} from './constants';
import GET_VOD_PLAYBACK_METADATA from './queries/getVodPlaybackMetadata';
import GET_LIVE_PLAYBACK_METADATA from './queries/getLivePlaybackMetadata';
import STOP_VOD_PLAYBACK from './queries/stopVodPlaybackMetadata';
import STOP_LIVE_PLAYBACK from './queries/stopLivePlaybackMetadata';
import REFRESH_LINEAR_PLAYBACK_HEARTBEAT from './queries/refreshLinearPlaybackHeartbeat';
import REFRESH_VOD_PLAYBACK_HEARTBEAT from './queries/refreshVodPlaybackHeartbeat';
import GET_OFFLINE_PLAYBACK_METADATA from './queries/getOfflinePlaybackMetadata';
import { getPlaybackDeviceInfo } from '../devices/selectors';

export const refreshPlaybackHeartbeat = (mediaAssetId, isLive, deviceId) =>
  createApiAction(REFRESH_PLAYBACK_HEARTBEAT, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: isLive ? REFRESH_LINEAR_PLAYBACK_HEARTBEAT() : REFRESH_VOD_PLAYBACK_HEARTBEAT(),
      variables: { assetId: mediaAssetId, deviceId, channelId: mediaAssetId },
    },
    meta: { mediaAssetId, isLive, deviceId },
    authenticated: true,
    graphQL: true,
  });

// Making playbackDevice optional beacuse we will be remving this in future
export const fetchPlaybackMeta = (mediaAssetId, isLive, drmType, deviceId) => (
  dispatch,
  getState,
) => {
  const playbackDevice = getPlaybackDeviceInfo(getState());

  return dispatch(
    createApiAction(FETCH_PLAYBACK_META, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: isLive ? GET_LIVE_PLAYBACK_METADATA(drmType) : GET_VOD_PLAYBACK_METADATA(drmType),
        variables: {
          assetId: mediaAssetId,
          deviceId,
          channelId: mediaAssetId, // applicable only for Live Playback
          ...(playbackDevice && { playbackDevice }), // Optional paramater applicable only for vod playback
        },
      },
      meta: { mediaAssetId, isLive },
      authenticated: true,
      graphQL: true,
      onSuccess: (playbackDispatch, { payload }) => {
        if (
          equals(payload?.startVodPlayback?.__typename, Typename.ConcurrencyError) ||
          equals(payload?.startLinearPlayback?.__typename, Typename.ConcurrencyError) ||
          equals(payload?.startVodPlayback?.__typename, Typename.SubscriptionNeeded) ||
          equals(payload?.startLinearPlayback?.__typename, Typename.SubscriptionNeeded)
        ) {
          return;
        }
        playbackDispatch(refreshPlaybackHeartbeat(mediaAssetId, isLive, deviceId));
      },
    }),
  );
};

export const fetchOfflinePlaybackMeta = (
  mediaAssetId,
  drmType,
  deviceId,
  usePlaybackDevice = false,
) => (dispatch, getState) => {
  const playbackDevice = usePlaybackDevice ? getPlaybackDeviceInfo(getState()) : null;
  return dispatch(
    createApiAction(FETCH_OFFLINE_PLAYBACK_META, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: GET_OFFLINE_PLAYBACK_METADATA(drmType),
        variables: {
          assetId: mediaAssetId,
          deviceId,
          ...(playbackDevice && { playbackDevice }),
        },
      },
      meta: { mediaAssetId },
      authenticated: true,
      graphQL: true,
    }),
  );
};

export const stopPlayback = (mediaAssetId, isLive, deviceId, isKeepalive = false) =>
  createApiAction(STOP_PLAYBACK, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: isLive ? STOP_LIVE_PLAYBACK() : STOP_VOD_PLAYBACK(),
      variables: { assetId: mediaAssetId, channelId: mediaAssetId, deviceId },
    },
    meta: { mediaAssetId },
    authenticated: true,
    graphQL: true,
    fetchOptions: isKeepalive ? { keepalive: true } : undefined,
  });

export const removePlaybackMeta = (mediaAssetId: string) =>
  createAction<string>(REMOVE_PLAYBACK_META)(mediaAssetId);

// for downloads
export const setPlaybackMeta = (mediaAssetId: string, playback: any) =>
  createAction<any>(SET_PLAYBACK_META)({ mediaAssetId, playback });

export const setPlaybackHeartbeat = (mediaAssetId: string, heartBeatInterval: any) =>
  createAction<any>(SET_PLAYBACK_HEARTBEAT)({ mediaAssetId, heartBeatInterval });
