import { downloadAsset, downloadSettings } from '@/modules/download2Go/__tests__/testData';
import {
  getDownloadAsset,
  downloadAssets,
  isWifiOnly,
  usedStorage,
  freeDiskspace,
  usedDiskspace,
} from '../selectors';

describe('download 2 go selectors', () => {
  test('default state download 2 go assets ', () => {
    // When default state
    const defaultState = {
      download2Go: {
        downloadAssetsById: {
          [downloadAsset.assetId]: downloadAsset,
        },
      },
    };

    // Then
    expect(downloadAssets(defaultState)).toEqual([downloadAsset]);

    expect(getDownloadAsset(defaultState)(downloadAsset.assetId)).toEqual(downloadAsset);
  });

  test('default state download 2 settings ', () => {
    // When default state
    const defaultState = {
      download2Go: {
        downloadSettings,
      },
    };

    // Then
    expect(isWifiOnly(defaultState)).toEqual(downloadSettings.wifiOnly);

    expect(usedStorage(defaultState)).toEqual(downloadSettings.usedStorage);

    expect(freeDiskspace(defaultState)).toEqual(downloadSettings.freeDiskspace);

    expect(usedDiskspace(defaultState)).toEqual(downloadSettings.usedDiskspace);
  });
});
