import { createAction } from '@reduxjs/toolkit';
import {
  SPOTIFY_UNAUTHORIZED_ERROR,
  FETCH_IS_SAVED_ALBUM,
  SAVE_ALBUM,
  PLAYBACK_PAUSE,
  PLAYBACK_PLAY,
  TRANSFER_PLAYBACK,
  FETCH_PLAYER_STATE,
  FETCH_PROFILE,
  FETCH_BRAND_ALBUMS,
  PLAYBACK_SEEK,
  SET_PLAYBACK_SEEK_TIME,
  SET_ACCESS_TOKEN,
  REMOVE_ALBUM,
} from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import { accessToken } from './selectors';
import { createApiAction } from '../../utils/api';
import { HTTPMethod } from '../../middleware/api/types';
import GET_SHOW_ALBUMS from './queries/getShowAlbums';
import GET_MOVIE_ALBUMS from './queries/getMovieAlbums';

// returns the data we're interested in from the json response
const getResponseData = json => json.data;

const baseSpotifyApiAction = {
  authenticated: true,
  includeSkyHeaders: false,
  includeProfileId: false,
  auth: {
    tokenSelector: accessToken,
    errorActionType: SPOTIFY_UNAUTHORIZED_ERROR,
  },
  hasResponseData: false,
  getResponseData,
};

export const setAccessToken = spotifyAccessToken =>
  createAction<string>(SET_ACCESS_TOKEN)(spotifyAccessToken);

export const fetchBrandAlbums = (brandId: string, isShow?: boolean) =>
  createApiAction(FETCH_BRAND_ALBUMS, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: isShow ? GET_SHOW_ALBUMS : GET_MOVIE_ALBUMS,
      variables: { brandId },
    },
    meta: { isShow },
    authenticated: true,
    graphQL: true,
  });

export const fetchPlayerState = () =>
  createApiAction(FETCH_PLAYER_STATE, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    path: '/me/player',
    ...baseSpotifyApiAction,
  });

export const transferPlayback = device =>
  createApiAction(TRANSFER_PLAYBACK, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    method: HTTPMethod.PUT,
    path: '/me/player',
    // eslint-disable-next-line @typescript-eslint/camelcase
    data: { device_ids: [device], play: false },
    ...baseSpotifyApiAction,
  });

export const play = data =>
  createApiAction(PLAYBACK_PLAY, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    method: HTTPMethod.PUT,
    path: '/me/player/play',
    data,
    ...baseSpotifyApiAction,
  });

export const pause = () =>
  createApiAction(PLAYBACK_PAUSE, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    method: HTTPMethod.PUT,
    path: '/me/player/pause',
    ...baseSpotifyApiAction,
  });

export const setLastSeekTime = timestamp => createAction<number>(SET_PLAYBACK_SEEK_TIME)(timestamp);

export const seek = positionMs =>
  createApiAction(PLAYBACK_SEEK, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    method: HTTPMethod.PUT,
    path: '/me/player/seek',
    params: { position_ms: positionMs },
    ...baseSpotifyApiAction,
    onRequest: dispatch => {
      dispatch(setLastSeekTime(positionMs));
    },
  });

export const saveAlbum = albumId =>
  createApiAction(SAVE_ALBUM, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    method: HTTPMethod.PUT,
    path: '/me/albums',
    data: { ids: [albumId] },
    ...baseSpotifyApiAction,
  });

export const removeAlbum = albumId =>
  createApiAction(REMOVE_ALBUM, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    method: HTTPMethod.DELETE,
    path: '/me/albums',
    data: { ids: [albumId] },
    ...baseSpotifyApiAction,
  });

export const fetchIsSavedAlbum = albumId =>
  createApiAction(FETCH_IS_SAVED_ALBUM, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    path: '/me/albums/contains',
    params: { ids: albumId },
    meta: { albumId },
    ...baseSpotifyApiAction,
  });

export const fetchProfile = () =>
  createApiAction(FETCH_PROFILE, {
    baseURL: STORE_CONFIG.SPOTIFY_API_URL,
    path: '/me',
    ...baseSpotifyApiAction,
  });
