import { Season } from '../Season';
import { Episode } from '../Episode';

const testSeason = {
  url: '/api/seasons/seas_6a95fc5f09144d6f9cf9afd25da4c5fd/',
  title: 'Big Little Lies',
  synopsis:
    'The stories of three mothers of first-graders whose seemingly perfect lives begin to unravel to the point of murder.',
  year: '2019',
  images: [],
  genres: null,
  albumId: '5bVh1bvKmcaBUjQwcapIEN',
  contentType: 'season',
  seasonNumber: 2,
  episodes: [
    {
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
    },
  ],
  parentUrl: '/api/brands/bran_7d55d1f1e9a94ef980c35fcf7d58a4d6/',
};

test('Create an array of instances from plain objects', () => {
  const seasons = Season.createInstances([testSeason, testSeason]);
  expect(seasons).toBeInstanceOf(Array);
  expect(seasons[0]).toBeInstanceOf(Season);
});

test('Create a instance from plain object', () => {
  const season = Season.createInstance(testSeason);
  expect(season).toBeInstanceOf(Season);
  expect(season.url).toBe(testSeason.url);
  expect(season.seasonNumber).toBe(testSeason.seasonNumber);
  expect(season.episodes[0]).toBeInstanceOf(Episode);
});

test('Get the ids from url', () => {
  const season = Season.createInstance(testSeason);
  expect(season.id).toBe('seas_6a95fc5f09144d6f9cf9afd25da4c5fd');
  expect(season.brandId).toBe('bran_7d55d1f1e9a94ef980c35fcf7d58a4d6');
});
