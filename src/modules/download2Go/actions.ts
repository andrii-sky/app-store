import { createAction } from '@reduxjs/toolkit';
import {
  SET_DOWNLOAD_ASSET,
  SET_ALL_DOWNLOAD_ASSETS,
  REMOVE_DOWNLOAD_ASSET,
  SET_DOWNLOAD_SETTINGS,
  SET_WIFI_ONLY,
} from './constants';

export const setDownloadAsset = (downloadAsset: any) =>
  createAction<any>(SET_DOWNLOAD_ASSET)(downloadAsset);

export const setAllDownloadAssets = (downloadAssets: any) =>
  createAction<any>(SET_ALL_DOWNLOAD_ASSETS)(downloadAssets);

export const removeDownloadAsset = (assetId: any) =>
  createAction<any>(REMOVE_DOWNLOAD_ASSET)(assetId);

export const setDownloadSettings = (downloadSettings: any) =>
  createAction<any>(SET_DOWNLOAD_SETTINGS)(downloadSettings);

export const setWifiOnly = (wifiOnly: boolean) => createAction<any>(SET_WIFI_ONLY)(wifiOnly);
