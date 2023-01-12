import { createAction } from '@reduxjs/toolkit';
import { HTTPMethod } from '@/middleware/api/types';
import {
  FETCH_SLOTS_BY_TIME_RANGE,
  FETCH_SLOT_BY_START_TIME,
  CLEAR_SELECTED_SLOT,
} from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import { createApiAction } from '../../utils/api';
import GET_SLOTS_BY_TIME_RANGE from './queries/getSlotsByTimeRange';
import GET_SLOT_BY_START_TIME from './queries/getSlotByStartTime';

type FetchSlotFetchOptions = {
  enableCache?: boolean;
  needDetail?: boolean;
  needReverseEPG?: boolean;
  useAxios?: boolean;
  isOverride?: boolean;
  fetchFunc?: Function;
};
export const fetchSlotsByTimeRange = (
  from: string,
  to: string,
  fetchOptions: FetchSlotFetchOptions = {},
) =>
  createApiAction(FETCH_SLOTS_BY_TIME_RANGE, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    method: fetchOptions?.enableCache ? HTTPMethod.GET : HTTPMethod.POST,
    params: {
      query: GET_SLOTS_BY_TIME_RANGE(fetchOptions?.needDetail, fetchOptions?.needReverseEPG),
      variables: { from, to },
    },
    authenticated: true,
    fetchFunc: fetchOptions?.fetchFunc,
    graphQL: !fetchOptions?.useAxios,
    meta: { isOverride: fetchOptions?.isOverride },
  });

export const fetchSlotByStartTime = (channelId: string, at: string, needReverseEPG: boolean) =>
  createApiAction(FETCH_SLOT_BY_START_TIME, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_SLOT_BY_START_TIME(needReverseEPG),
      variables: { channelId, at },
    },
    authenticated: true,
    graphQL: true,
  });

export const clearSelectedSlot = () => createAction<any>(CLEAR_SELECTED_SLOT)({});
