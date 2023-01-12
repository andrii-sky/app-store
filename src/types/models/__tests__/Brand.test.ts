import { Brand } from '../Brand';
import { Season } from '../Season';
import { Episode } from '../Episode';
import { ImageAsset } from '../ImageAsset';

const testBrand = {
  url: '/api/brands/bran_7d55d1f1e9a94ef980c35fcf7d58a4d6/',
  title: 'Big Little Lies',
  synopsis:
    'The stories of three mothers of first-graders whose seemingly perfect lives begin to unravel to the point of murder.',
  year: '',
  images: [
    {
      url:
        'https://images-dev.skyone.co.nz/media/images/stills/content/1332/3f911973844b5fbb17b740c08ad325d3.jpg?impolicy=contentTileHorizontal',
      type: 'contentTileHorizontal',
    },
    {
      url:
        'https://images-dev.skyone.co.nz/media/images/stills/content/1332/6042607107c029671ad8209c8a3b6681.jpg?impolicy=contentTileVertical',
      type: 'contentTileVertical',
    },
    {
      url:
        'https://images-dev.skyone.co.nz/media/images/stills/content/1332/a961f0350a36747a4879c703561595c7.jpg?impolicy=heroLandingWide',
      type: 'heroLandingWide',
    },
    {
      url:
        'https://images-dev.skyone.co.nz/media/images/stills/content/1332/fd282ae5a3f3397c9c6d619ffc4c886f.jpg?impolicy=contentDetail',
      type: 'contentDetail',
    },
    {
      url:
        'https://images-dev.skyone.co.nz/media/images/stills/content/1332/f537baa996538963018d5978f2528cf4.jpg?impolicy=heroLandingSquare-crop',
      type: 'heroLandingSquare',
    },
  ],
  genres: ['Drama'],
  rank: '5',
  numberOfSeasons: 2,
  seasons: [
    {
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
    },
  ],
  episode: {
    url: '/api/episodes/epis_7bc511e06431456c9b0c1250a5920e65/',
    title: 'Big Little Lies S1 E2',
    synopsis:
      'Madeline is outraged over a slight from Renata while dealing with family issues at home. Jane dodges difficult questions from Ziggy.',
    year: '',
    images: [
      {
        url:
          'https://images-dev.skyone.co.nz/media/images/stills/content/1500/e4f4013dce9d616a865d24f90842d62d.jpg?impolicy=contentDetail',
        type: 'contentDetail',
      },
    ],
    genres: null,
    albumId: '',
    contentType: 'episode',
    number: 2,
    subtitle: null,
    parentUrl: '/api/seasons/seas_14683d13fceb49c281d1072d8a2ba44e/',
    mediaAssets: [
      {
        url: '/api/assets/asse_6699bb4f0626490a8c5a68160f1fcb74/',
        durationInSeconds: 2648,
        rendition: 'HD',
        uid: 'asse_6699bb4f0626490a8c5a68160f1fcb74',
        rating: '16',
      },
    ],
  },
  season: {
    url: '/api/seasons/seas_14683d13fceb49c281d1072d8a2ba44e/',
    title: 'Big Little Lies',
    synopsis:
      'The stories of three mothers of first-graders whose seemingly perfect lives begin to unravel to the point of murder.',
    year: '2017',
    images: [],
    genres: null,
    albumId: '4YU2XJH8yVtQh5oPylvoDw',
    contentType: 'season',
    seasonNumber: 1,
    episodes: null,
    parentUrl: '/api/brands/bran_7d55d1f1e9a94ef980c35fcf7d58a4d6/',
  },
  contentType: 'Show',
  continueWatchingState: null,
};

test('Create an array of instances from plain objects', () => {
  const brands = Brand.createInstances([testBrand, testBrand]);
  expect(brands).toBeInstanceOf(Array);
  expect(brands[0]).toBeInstanceOf(Brand);
});

test('Create a instance from plain object', () => {
  const brand = Brand.createInstance(testBrand);
  expect(brand).toBeInstanceOf(Brand);
  expect(brand.url).toBe(testBrand.url);
  expect(brand.title).toBe(testBrand.title);
  expect(brand.seasons?.[0]).toBeInstanceOf(Season);
  expect(brand.season).toBeInstanceOf(Season);
  expect(brand.episode).toBeInstanceOf(Episode);
  expect(brand.images[0]).toBeInstanceOf(ImageAsset);
});

test('Get the ids from url', () => {
  const brand = Brand.createInstance(testBrand);
  expect(brand.id).toBe('bran_7d55d1f1e9a94ef980c35fcf7d58a4d6');
});
