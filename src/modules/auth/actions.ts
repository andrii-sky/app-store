import { createAction } from '@reduxjs/toolkit';
import { AppId } from '@/types/graph-ql';
import { HTTPMethod } from '../../middleware/api/types';
import { createApiAction } from '../../utils/api';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import {
  LINK_ACCOUNT,
  OPT_OUT,
  SET_ACCESS_TOKEN,
  SET_USER,
  UNAUTHORIZED_ERROR,
  FETCH_CONFIG,
  SET_AUTH_LOADING,
} from './constants';
import FETCH_CONFIG_QUERY from './queries/getConfig';

export const setAccessToken = accessToken => createAction<string>(SET_ACCESS_TOKEN)(accessToken);
export const setUser = user => createAction<any>(SET_USER)(user);
export const unauthorizedError = error => createAction<any>(UNAUTHORIZED_ERROR)(error);

export const linkAccount = idToken =>
  createApiAction(LINK_ACCOUNT, {
    baseURL: STORE_CONFIG.EXP_API_URL,
    method: HTTPMethod.PUT,
    path: '/auth/linkAccount',
    data: { secondaryUserIdToken: idToken },
    authenticated: true,
  });

export const optOut = accountId => {
  return createApiAction(OPT_OUT, {
    baseURL: STORE_CONFIG.EXP_API_URL,
    method: HTTPMethod.DELETE,
    // need to escape the | character here otherwise cors preflight request will fail in Firefox:
    path: `/auth/newSkyGo/${encodeURIComponent(accountId)}`,
    data: null,
    authenticated: true,
  });
};

export const fetchConfig = (appId: AppId) =>
  createApiAction(FETCH_CONFIG, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: FETCH_CONFIG_QUERY,
      variables: { appId },
    },
    graphQL: true,
  });

export const setAuthLoading = (isLoading: boolean) =>
  createAction<boolean>(SET_AUTH_LOADING)(isLoading);
