import { createAction } from '@reduxjs/toolkit';
import { pluck, isNil, unnest, pipe, filter, not, lte } from 'ramda';
import { fromSeconds } from 'pomeranian-durations';

import { isNilOrEmpty } from '@/utils/utils';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import { createApiAction } from '../../utils/api';
import {
  MY_LIST,
  FETCH_BRAND,
  SAVE_PLAYBACK_POSITION,
  SELECT_SEASON,
  SET_BRAND,
  FETCH_SHOW_HIGHLIGHTS,
} from './constants';
import SAVE_PLAYBACK_POSITION_QUERY from './queries/savePlaybackPosition';
import { GET_SHOW, GET_SHOW_HIGHLIGHTS } from './queries/getShow';
import GET_MOVIE from './queries/getMovie';
import ADD_TO_MY_LIST_QUERY from './queries/addTitleBookmark';
import REMOVE_FROM_MY_LIST_QUERY from './queries/removeTitleBookmark';
import { showHighlights } from './selectors';

export const getEpisodesFromSeasons = pipe(pluck('episodes'), filter(pipe(isNil, not)), unnest);

export const fetchBrand = (
  brandId: string,
  isShow?: boolean,
  initialRailSize?: number,
  // TODO the following params are not being used anymore, due to https://github.com/skytvnz/sky-app-store/pull/469
  needSchedule = true,
  needEpisodes = true,
  needSlots = true,
) => {
  return createApiAction(FETCH_BRAND, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: isShow
        ? GET_SHOW(needEpisodes, needSlots, needSchedule, undefined, initialRailSize)
        : GET_MOVIE(needSchedule),
      variables: { brandId },
    },
    meta: { isShow, brandId },
    authenticated: true,
    graphQL: true,
  });
};

export const fetchShowHighlights = (brandId: string, nextPageSize?: number) => (
  dispatch,
  getState,
) => {
  const highlights = showHighlights(getState())(brandId);
  const endCursor = highlights?.pageInfo?.endCursor;
  return dispatch(
    createApiAction(FETCH_SHOW_HIGHLIGHTS, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: GET_SHOW_HIGHLIGHTS(nextPageSize, endCursor),
        variables: { brandId },
      },
      meta: { brandId },
      authenticated: true,
      graphQL: true,
    }),
  );
};

export const savePlaybackPosition = (assetId: string, position: number) => {
  return createApiAction(SAVE_PLAYBACK_POSITION, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: SAVE_PLAYBACK_POSITION_QUERY,
      variables: {
        assetId,
        position: isNilOrEmpty(position) || lte(position, 0) ? 'PT0S' : fromSeconds(position),
      },
    },
    meta: { assetId },
    authenticated: true,
    graphQL: true,
  });
};

export const selectSeason = (brandId: string, selectedSeasonId: string) =>
  createAction<any>(SELECT_SEASON)({
    brandId,
    selectedSeasonId,
  });

export const addToMyList = (brandId: string) =>
  createApiAction(MY_LIST, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: ADD_TO_MY_LIST_QUERY,
      variables: { titleId: brandId },
    },
    meta: { brandId, isAdded: true },
    authenticated: true,
    graphQL: true,
  });

export const removeFromMyList = (brandId: string) =>
  createApiAction(MY_LIST, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: REMOVE_FROM_MY_LIST_QUERY,
      variables: { titleId: brandId },
    },
    meta: { brandId, isAdded: false },
    authenticated: true,
    graphQL: true,
  });

// for downloads
export const setBrand = (brand: any) => createAction<any>(SET_BRAND)(brand);
