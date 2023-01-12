import { MediaAsset } from '../MediaAsset';
import { ImageAsset } from '../ImageAsset';
import { Episode } from '../Episode';

const testEpisode = {
  url: '/api/episodes/epis_80bf8ed4b6b24cb2a9f4f8c3454f5826/',
  title: 'Big Little Lies S2 E1',
  synopsis:
    "Following first-day-of-school events, Madeline is worried by Bonnie's behaviour and is shocked when Abigail says she doesn't want to go to college. Mary Louise, Celeste's mother-in-law, offers her unvarnished assessment of Madeline's character.",
  year: '',
  images: [
    {
      url:
        'https://images-dev.skyone.co.nz/media/images/stills/content/1334/66abfa707859774e66c58d195acd5f65.jpg?impolicy=contentDetail',
      type: 'contentDetail',
    },
  ],
  genres: null,
  albumId: '',
  contentType: 'episode',
  number: 1,
  subtitle: null,
  parentUrl: '/api/seasons/seas_6a95fc5f09144d6f9cf9afd25da4c5fd/',
  mediaAssets: [
    {
      url: '/api/assets/asse_6699bb4f0626490a8c5a68160f1fcb74/',
      durationInSeconds: 2648,
      rendition: 'HD',
      uid: 'asse_6699bb4f0626490a8c5a68160f1fcb74',
      dataSourceId: 'OT079720_HD',
      rating: '16',
    },
  ],
};

test('Create an array of instances from plain objects', () => {
  const episodes = Episode.createInstances([testEpisode, testEpisode]);
  expect(episodes).toBeInstanceOf(Array);
  expect(episodes[0]).toBeInstanceOf(Episode);
});

test('Create a instance from plain object', () => {
  const episode = Episode.createInstance(testEpisode);
  expect(episode).toBeInstanceOf(Episode);
  expect(episode.url).toBe(testEpisode.url);
  expect(episode.title).toBe(testEpisode.title);
  expect(episode.number).toBe(testEpisode.number);
  expect(episode.mediaAssets[0]).toBeInstanceOf(MediaAsset);
  expect(episode.images[0]).toBeInstanceOf(ImageAsset);
});

test('Get the ids from url', () => {
  const episode = Episode.createInstance(testEpisode);
  expect(episode.id).toBe('epis_80bf8ed4b6b24cb2a9f4f8c3454f5826');
  expect(episode.seasonId).toBe('seas_6a95fc5f09144d6f9cf9afd25da4c5fd');
});
