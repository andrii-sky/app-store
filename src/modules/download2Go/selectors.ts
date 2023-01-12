import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const downloadAssetsByIdState = createSelector(moduleState, state => state.downloadAssetsById);

export const downloadAssets = createSelector(downloadAssetsByIdState, downloadAssetsById =>
  Object.values(downloadAssetsById),
);

export const getDownloadAsset = createSelector(
  downloadAssetsByIdState,
  downloadAssetsById => (assetId: string) => downloadAssetsById[assetId],
);

const downloadSettingsState = createSelector(moduleState, state => state.downloadSettings);

export const isWifiOnly = createSelector(
  downloadSettingsState,
  downloadSettings => !!downloadSettings.wifiOnly,
);

export const usedStorage = createSelector(
  downloadSettingsState,
  downloadSettings => downloadSettings.usedStorage || 0,
);

export const usedDiskspace = createSelector(
  downloadSettingsState,
  downloadSettings => downloadSettings.usedDiskspace || 0,
);

export const freeDiskspace = createSelector(
  downloadSettingsState,
  downloadSettings => downloadSettings.freeDiskspace || 0,
);
