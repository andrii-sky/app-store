import { rail } from '@/modules/myApps/selectors';
import { getActions } from '@/utils/Section';
import {
  SET_FAVOURITE_APP,
  namespace,
  SET_INSTALLED_APPS,
  SET_LAST_OPENED_APP,
  FETCH_ALL_APPS,
} from '@/modules/myApps/constants';
import { createAction } from '@reduxjs/toolkit';
import { InstalledApp } from '@/types/interfaces/InstalledApp';
import { createApiAction } from '@/utils/api';
import STORE_CONFIG, { GRAPH_QL_PATH } from '@/config';
import FAVOURITE_BOX_APP from '@/modules/myApps/queries/favouriteBoxApp';
import UNFAVOURITE_BOX_APP from '@/modules/myApps/queries/unfavouriteBoxApp';
import BOX_APP_OPENED from '@/modules/myApps/queries/boxAppOpened';
import FETCH_ALL_APPS_QUERY from '@/modules/myApps/queries/fetchAllApps';

export const { fetchContent, fetchRailById } = getActions(namespace, rail);

export const setInstalledApps = (installedApps: InstalledApp[]) =>
  createAction<InstalledApp[]>(SET_INSTALLED_APPS)(installedApps);

export const addToFavourites = (appId: string) =>
  createApiAction(SET_FAVOURITE_APP, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: FAVOURITE_BOX_APP,
      variables: { appId },
    },
    meta: { appId, isFavourite: true },
    authenticated: true,
    graphQL: true,
  });

export const fetchAllApps = () =>
  createApiAction(FETCH_ALL_APPS, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: FETCH_ALL_APPS_QUERY,
    },
    authenticated: true,
    graphQL: true,
  });

export const removeFromFavourites = (appId: string, removeFromList = false) =>
  createApiAction(SET_FAVOURITE_APP, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: UNFAVOURITE_BOX_APP,
      variables: { appId },
    },
    meta: { appId, isFavourite: false, removeFromList },
    authenticated: true,
    graphQL: true,
  });

export const setLastOpenedApp = (appId: string) =>
  createApiAction(SET_LAST_OPENED_APP, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: BOX_APP_OPENED,
      variables: { appId },
    },
    meta: { appId },
    authenticated: true,
    graphQL: true,
  });
