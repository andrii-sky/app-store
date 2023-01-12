import { createApiAction } from '@/utils/api';
import MY_LIST_QUERY from '@/modules/myStuff/queries/myList';
import { createAction } from '@reduxjs/toolkit';
import { VideoQualityType } from '@/types/enums/VideoQualityType';
import { FETCH_MY_LIST, SET_DEVICE_VIDEO_QUALITY } from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';

// eslint-disable-next-line import/prefer-default-export
export const fetchMyList = () =>
  createApiAction(FETCH_MY_LIST, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: MY_LIST_QUERY,
    },
    authenticated: true,
    graphQL: true,
  });

export const setDeviceVideoQuality = (accountId: string, videoQuality: VideoQualityType) =>
  createAction<any>(SET_DEVICE_VIDEO_QUALITY)({ accountId, videoQuality });
