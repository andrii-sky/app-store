import { MediaAsset } from '../MediaAsset';

const testMediaAsset = {
  url: '/api/assets/asse_6699bb4f0626490a8c5a68160f1fcb74/',
  durationInSeconds: 2648,
  rendition: 'HD',
  uid: 'asse_6699bb4f0626490a8c5a68160f1fcb74',
  dataSourceId: 'OT079720_HD',
  rating: '16',
};

test('Create an array of instances from plain objects', () => {
  const mediaAssets = MediaAsset.createInstances([testMediaAsset, testMediaAsset]);
  expect(mediaAssets).toBeInstanceOf(Array);
  expect(mediaAssets[0]).toBeInstanceOf(MediaAsset);
});

test('Create a instance from plain object', () => {
  const mediaAsset = MediaAsset.createInstance(testMediaAsset);
  expect(mediaAsset).toBeInstanceOf(MediaAsset);
  expect(mediaAsset.url).toBe(testMediaAsset.url);
  expect(mediaAsset.dataSourceId).toBe(testMediaAsset.dataSourceId);
});

test('Get the ids from url', () => {
  const mediaasset = MediaAsset.createInstance(testMediaAsset);
  expect(mediaasset.id).toBe('asse_6699bb4f0626490a8c5a68160f1fcb74');
});
