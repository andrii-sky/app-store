import { PlaybackMeta } from '../PlaybackMeta';

const testPlaybackMeta = {
  vodSource: {
    __typename: 'VodPlaybackSources',
    playbackSource: {
      streamUri: 'https://manifest.prod.boltdns.net/manifest/v1/dash/live-baseurl/',
      drmLicense: {
        __typename: 'WidevineLicense',
        licenseUri: 'https://manifest.prod.boltdns.net/license/v1/1',
      },
      emeHeaders: [
        {
          name: 'BCOV-Auth',
          value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NpZCI6IjYwM',
        },
      ],
    },
  },
};

test('Create an array of instances from plain objects', () => {
  const playbackMetaArr = PlaybackMeta.createInstances([testPlaybackMeta, testPlaybackMeta]);
  expect(playbackMetaArr).toBeInstanceOf(Array);
  expect(playbackMetaArr[0]).toBeInstanceOf(PlaybackMeta);
});

test('Create a instance from plain object', () => {
  const playbackMeta = PlaybackMeta.createInstance(testPlaybackMeta);
  expect(playbackMeta).toBeInstanceOf(PlaybackMeta);
  expect(playbackMeta.vodSource.playbackSource.streamUri).toBe(
    testPlaybackMeta.vodSource.playbackSource.streamUri,
  );
});
