import { createAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import throttle from 'lodash.throttle';

import { LinearChannel, LinearChannelGroup, Maybe } from '@/types/graph-ql';
import { HTTPMethod } from '@/middleware/api/types';

import {
  FETCH_CATEGORIES,
  FETCH_CHANNELS_BY_CATEGORY_ID,
  SET_SELECTED_CHANNEL_ID,
  SET_CHANNEL_BY_ID,
  SAVE_RECENT_CHANNEL,
  SET_SELECTED_CATEGORY_ID,
  FETCH_SELECTED_CHANNEL_SLOT,
  CLEAR_SELECTED_CHANNEL_SLOT,
} from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import { createApiAction } from '../../utils/api';
import CHANGE_CHANNEL from './queries/changeChannel';
import GET_CATEGORIES from './queries/getCategories';
import GET_CHANNEL_SLOTS from './queries/getChannelSlots';
import GET_CHANNELS_BY_CATEGORY_ID from './queries/getChannelsByCategoryId';
import { selectedChannelSlot, selectedChannelId, selectedChannelSlotIsLoading } from './selectors';

dayjs.extend(isBetween);

const SLOTS_UPDATE_FREQUENCY = 1000 * 60 * 10; // Currently 10 mins

export const setChannelById = (channels: Maybe<LinearChannel>[], override?: boolean) =>
  createAction<{ channels: Maybe<LinearChannel>[]; override?: boolean }>(SET_CHANNEL_BY_ID)({
    channels,
    override,
  });

export const fetchCategories = (needSlotDetail?, needChannelImage?, useAxios?, fetchFunc?) =>
  createApiAction<{ channelGroups: LinearChannelGroup[] }>(FETCH_CATEGORIES, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_CATEGORIES(needSlotDetail, needChannelImage),
    },
    graphQL: !useAxios,
    method: HTTPMethod.POST,
    fetchFunc,
    authenticated: true,
    onSuccess: (dispatch, { payload }) => {
      const channels: Maybe<LinearChannel>[] = [];
      payload?.channelGroups?.forEach(linearChannelGroup => {
        channels.push(...linearChannelGroup?.channels);
      });
      dispatch(setChannelById(channels, true)); // replace the channels in the store with the channels from the categories query
    },
  });

export const fetchChannelsByCategoryId = (categoryId: string) =>
  createApiAction<{ linearChannelGroup: { channels: LinearChannel[] } }>(
    FETCH_CHANNELS_BY_CATEGORY_ID,
    {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: GET_CHANNELS_BY_CATEGORY_ID,
        variables: { categoryId },
      },
      meta: { categoryId },
      authenticated: true,
      graphQL: true,
      onSuccess: (dispatch, { payload }) => {
        dispatch(setChannelById(payload?.linearChannelGroup?.channels));
      },
    },
  );

export const clearSelectedChannelSlot = () => createAction<any>(CLEAR_SELECTED_CHANNEL_SLOT)({});

export const fetchSelectedChannelSlot = (
  channelId: string,
  offset = 0,
  needChannelDetail = false,
) => {
  const now = dayjs();
  const rewindRealTime = offset > 0 ? now.subtract(offset, 'second') : now;

  return createApiAction<{ linearChannel: LinearChannel }>(FETCH_SELECTED_CHANNEL_SLOT, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    authenticated: true,
    params: {
      query: GET_CHANNEL_SLOTS(needChannelDetail),
      variables: {
        channelId,
        at: offset > 0 ? rewindRealTime : null,
      },
    },
    graphQL: true,
    onSuccess: (dispatch, { payload }) => {
      if (needChannelDetail) {
        dispatch(setChannelById([payload.linearChannel]));
      }
    },
  });
};

/**
 * calculate offset with a max offset of 2 hours, which is the most a user can go back.
 * currentTime / seekableEndTime can have weird values leading to excessive offset
 * values into the past and future.
 */
export const calculateOffset = (currentTime: number, seekableEndTime: number) => {
  const MAX_OFFSET_SECONDS = 7200;
  const offset = seekableEndTime - currentTime;

  if (offset > MAX_OFFSET_SECONDS) {
    return MAX_OFFSET_SECONDS;
  }

  if (offset < 0) {
    return 0;
  }
  return offset;
};

export const fetchSlotWithOffset = (currentTime: number, seekableEndTime: number) => (
  dispatch,
  getState,
) => {
  const channelId = selectedChannelId(getState());
  const offset = calculateOffset(currentTime, seekableEndTime);
  if (channelId && Number.isFinite(offset)) {
    dispatch(fetchSelectedChannelSlot(channelId, offset));
  }
};

const throttleFetchSlotWithOffset = throttle(
  (dispatch, currentTime: number, seekableEndTime: number) =>
    dispatch(fetchSlotWithOffset(currentTime, seekableEndTime)),
  SLOTS_UPDATE_FREQUENCY,
);
/**
 * Update slot when scrubbing playback or currentTime update
 * @param currentTime Playback current time or play head
 * @param seekableEndTime The newest linear endTime or LiveCurrentTime, different Player has different terms
 */
export const updateNewSlot = (currentTime: number, seekableEndTime: number) => (
  dispatch,
  getState,
) => {
  const state = getState();
  const selectedSlot = selectedChannelSlot(state);
  const selectedSlotIsLoading = selectedChannelSlotIsLoading(state);

  if (selectedSlot) {
    const now = dayjs();
    const offset = seekableEndTime - currentTime;
    const realTime = offset > 0 ? now.subtract(offset, 'second') : now;
    const isBetweenCurrentSlotRange = realTime.isBetween(
      dayjs(selectedSlot.start),
      dayjs(selectedSlot.end),
    );

    // If the current playback time is not between selected current Slot's time range
    if (!isBetweenCurrentSlotRange) {
      dispatch(fetchSlotWithOffset(currentTime, seekableEndTime));
    }
  }
  // If selectedSlot is loaded but still have no slot return
  // Fetch next slot in 10 mins later to avoid too many request
  else if (!selectedSlotIsLoading) {
    throttleFetchSlotWithOffset(dispatch, currentTime, seekableEndTime);
  }
};

export const setSelectedCategoryId = (categoryId: string) =>
  createAction<string>(SET_SELECTED_CATEGORY_ID)(categoryId);

export const setSelectedChannelId = (channelId: string) =>
  createAction<string>(SET_SELECTED_CHANNEL_ID)(channelId);

export const changeChannel = channelId =>
  createApiAction(SAVE_RECENT_CHANNEL, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: CHANGE_CHANNEL,
      variables: { channelId },
    },
    authenticated: true,
    graphQL: true,
    onRequest: dispatch => {
      dispatch(setSelectedChannelId(channelId));
    },
  });
