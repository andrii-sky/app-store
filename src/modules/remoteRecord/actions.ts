import { createApiAction } from '@/utils/api';
import GET_DECODERS_QUERY from '@/modules/remoteRecord/queries/getDecoders';
import RECORD_QUERY from '@/modules/remoteRecord/queries/record';
import { createAction } from '@reduxjs/toolkit';
import { FETCH_DECODERS, RECORD, RESET_REMOTE_RECORD } from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';

export const fetchDecoders = () =>
  createApiAction(FETCH_DECODERS, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_DECODERS_QUERY,
    },
    authenticated: true,
    graphQL: true,
  });

export const requestRemoteRecord = (recordSeries, startTime, channelId, skyDecoderBoxId) =>
  createApiAction(RECORD, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: RECORD_QUERY,
      variables: {
        record: {
          channelId,
          startTime,
          skyDecoderBoxId,
          recordSeries,
        },
      },
    },
    authenticated: true,
    graphQL: true,
  });

export const resetRemoteRecord = () => createAction(RESET_REMOTE_RECORD)();
