import { MockStore } from 'redux-mock-store';
import { init } from '@/index';
import { downloadAsset, downloadSettings } from './testData';
import {
  REMOVE_DOWNLOAD_ASSET,
  SET_ALL_DOWNLOAD_ASSETS,
  SET_DOWNLOAD_ASSET,
  SET_DOWNLOAD_SETTINGS,
  SET_WIFI_ONLY,
} from '../constants';
import {
  removeDownloadAsset,
  setAllDownloadAssets,
  setDownloadAsset,
  setDownloadSettings,
  setWifiOnly,
} from '../actions';

const initState = {
  download2Go: {
    downloadAssetsById: {},
    downloadSettings: {
      wifiOnly: true,
      usedStorage: 0,
      usedDiskspace: 0,
      freeDiskspace: 0,
    },
  },
};

jest.mock('../../..');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('download 2 go actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('set download asset', () => {
    const expectedActions = [
      {
        type: SET_DOWNLOAD_ASSET,
        payload: downloadAsset,
      },
    ];

    store.dispatch(setDownloadAsset(downloadAsset));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set all download assets', () => {
    const expectedActions = [
      {
        type: SET_ALL_DOWNLOAD_ASSETS,
        payload: [downloadAsset],
      },
    ];

    store.dispatch(setAllDownloadAssets([downloadAsset]));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('remove download asset', () => {
    const expectedActions = [
      {
        type: REMOVE_DOWNLOAD_ASSET,
        payload: downloadAsset.assetId,
      },
    ];

    store.dispatch(removeDownloadAsset(downloadAsset.assetId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set download settings', () => {
    const expectedActions = [
      {
        type: SET_DOWNLOAD_SETTINGS,
        payload: downloadSettings,
      },
    ];

    store.dispatch(setDownloadSettings(downloadSettings));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set wifi only', () => {
    const expectedActions = [
      {
        type: SET_WIFI_ONLY,
        payload: downloadSettings.wifiOnly,
      },
    ];

    store.dispatch(setWifiOnly(downloadSettings.wifiOnly));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
