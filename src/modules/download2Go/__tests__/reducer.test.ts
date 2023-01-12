import { downloadAsset, downloadSettings } from '@/modules/download2Go/__tests__/testData';
import { createAction } from '@reduxjs/toolkit';
import {
  SET_DOWNLOAD_ASSET,
  REMOVE_DOWNLOAD_ASSET,
  SET_ALL_DOWNLOAD_ASSETS,
  SET_DOWNLOAD_SETTINGS,
  SET_WIFI_ONLY,
} from '../constants';
import reducer from '../reducer';

const contentState = {
  downloadAssetsById: {},
  downloadSettings: {},
};

describe('download 2 go reducer', () => {
  test('set download asset', () => {
    const action = createAction<any>(SET_DOWNLOAD_ASSET)(downloadAsset);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      downloadAssetsById: { [downloadAsset.assetId]: downloadAsset },
    });
  });

  test('set all download assets', () => {
    const action = createAction<any>(SET_ALL_DOWNLOAD_ASSETS)([downloadAsset]);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      downloadAssetsById: { [downloadAsset.assetId]: downloadAsset },
    });
  });

  test('remove download asset', () => {
    const action = createAction<any>(REMOVE_DOWNLOAD_ASSET)(downloadAsset.assetId);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      downloadAssetsById: {},
    });
  });

  test('set download settings', () => {
    const action = createAction<any>(SET_DOWNLOAD_SETTINGS)(downloadSettings);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      downloadAssetsById: {},
      downloadSettings,
    });
  });

  test('set wifi only', () => {
    const action = createAction<any>(SET_WIFI_ONLY)(downloadSettings.wifiOnly);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      downloadAssetsById: {},
      downloadSettings: {
        wifiOnly: downloadSettings.wifiOnly,
      },
    });
  });
});
