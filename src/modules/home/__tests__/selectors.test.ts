import { GroupLayout, GroupMember } from '@/types/graph-ql';
import {
  hero,
  rail,
  rails,
  error,
  isLoading,
  railsShallow,
  continueWatchingRailId,
  heroesDuration,
  heroes,
} from '../selectors';

const railsResult = [
  {
    id: 'skylarkSetUid|coll_7a3a26fdfdcb4aa39998069c9776a494',
    title: 'Continue Watching',
    layout: 'CONTINUE_WATCHING',
    contentPage: {
      pageInfo: {
        endCursor: 'abc123',
        hasNextPage: true,
      },
      content: [
        {
          __typename: 'VodShow',
          id: 'skylarkBrandUid|bran_7d55d1f1e9a94ef980c35fcf7d58a4d6',
          title: 'Big Little Lies',
          rating: {
            classification: '_16',
            advisories: [],
          },
          contentTileHorizontal: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1332/3f911973844b5fbb17b740c08ad325d3.jpg',
          },
          contentTileVertical: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1332/3f911973844b5fbb17b740c08ad325d3.jpg',
          },
          genres: [
            {
              title: 'Drama',
            },
            {
              title: 'Long Test Genre 2',
            },
            {
              title: 'Long Test Genre 1',
            },
          ],
          numberOfSeasons: 2,
        },
        {
          __typename: 'VodMovie',
          id: 'skylarkEpisodeUid|epis_9898e5793b2e4b16b3f059901c08920b',
          title: 'Thor: The Dark World',
          rating: {
            classification: '_PG',
            advisories: ['V'],
          },
          contentTileHorizontal: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1451/79c086d74618abcf3368052cd5546698.jpg',
          },
          contentTileVertical: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1451/79c086d74618abcf3368052cd5546698.jpg',
          },
          genres: [
            {
              title: 'Action',
            },
            {
              title: 'Fantasy',
            },
            {
              title: 'Adventure',
            },
          ],
          year: 2013,
          duration: 'PT1H47M25S',
        },
      ],
    },
  },
];
const mockState = {
  home: {
    content: {
      data: {
        heroSet: {
          heroList: [
            {
              __typename: 'Movie',
              title: 'X-Men: Days of Future Past',
              synopsis:
                "The X-Men join forces with their younger selves in order to change the past and save mankind's future as well as their own. Based on Marvel Comics characters.",
              rating: {
                classification: '_M',
                advisories: ['V', 'L'],
              },
              primaryGenres: [
                {
                  title: 'Science Fiction',
                },
              ],
              id: 'mac_10523147',
              heroLandingWide: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/55959/1bdb3dfca53da016ef31fc299a2b451c.jpg',
              },
              heroLandingSquare: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/55959/1987d54dbbfb9c302e5d35acb7957c12.jpg',
              },
              year: 2014,
              duration: 'PT2H6M',
              watchProgress: {
                complete: false,
                position: 'PT25M',
              },
              asset: {
                id: 'macAssetId|OT022413_HD_mac_10523147',
                hasParentalRestriction: false,
              },
              mySchedule: {
                subscriptions: [],
              },
            },
            {
              __typename: 'Movie',
              title: 'Wish You Were Dead',
              synopsis:
                'After expressing her concerns about her dangerous ex-husband, a woman unintentionally ends up in a killing pact with two other people.',
              rating: null,
              primaryGenres: [
                {
                  title: 'Thriller',
                },
              ],
              id: 'mac_11134000',
              heroLandingWide: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/4415/6934ac4823d66de032e17632cd1b9093.jpg',
              },
              heroLandingSquare: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/4415/07e817e9e834241db9a53e73a62ce1af.jpg',
              },
              year: 2017,
              duration: null,
              watchProgress: null,
              asset: null,
              mySchedule: null,
            },
            {
              __typename: 'Show',
              id: 'mac_sh_105020',
              title: 'ATP Tour',
              synopsis:
                'Tune in and experience the power as the world’s top tennis players go head to head in the ATP Tour – the worldwide top-tier men’s tennis circuit organised by the Association of Tennis Professionals.',
              onMyList: false,
              rating: { classification: '_G', advisories: [] },
              characters: [],
              primaryGenres: [],
              allGenres: [],
              heroLandingWide: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/609274/4fb07497f96f2373dc91fd8432040908.jpg',
              },
              heroLandingSquare: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/609274/149b23f388ae9ab2c9b38e16ad71705d.jpg',
              },
              contentTileHorizontal: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/609274/2c99db365c8f14271b1b041180d92815.jpg',
              },
              contentTileVertical: {
                uri:
                  'https://images.skyone.co.nz/media/images/stills/content/609274/a3e79e35a4b28ff2541740f548eecac6.jpg',
              },
              type: 'SPORT',
              numberOfSeasons: 1,
              defaultEpisode: {
                id: 'mac_11449858',
                season: { id: 'mac_s_478244', number: 2021 },
                number: 486,
                duration: 'PT55M',
                watchProgress: null,
                asset: {
                  id: 'macAssetId|OT154829_HD_mac_11449858',
                  duration: 'PT55M',
                  hasParentalRestriction: false,
                },
                mySchedule: null,
                schedule: {
                  subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                },
                downloadSchedule: null,
                characters: [],
              },
              brands: [
                {
                  id: 'SPORT',
                  title: 'Sky Sport',
                  logoImage: {
                    uri:
                      'https://images.skyone.co.nz/media/images/stills/controlling-channel/55/0bb3f98c20635b50329b719bcacb3897.png',
                  },
                },
              ],
              slots: [
                {
                  channel: {
                    id: 'SPT2',
                    title: 'Sky Sport 2',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-18T23:00:00Z',
                  end: '2021-08-19T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449860',
                    title: 'LIVE: Western & Southern Open: Day 3',
                    synopsis:
                      "LIVE - ATP 1000: Western & Southern Open (a.k.a. Cincinnati Masters). Tune in for all the action from Part 2 of Day 3 of the Western & Southern Open as the world's top tennis players go head to head in Cincinnati, Ohio, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727533/a2f2c8962aea4c5a052a6ef438dc63db.jpg',
                    },
                    number: 488,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: '0162',
                    title: 'Sky Sport Select',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-19T15:00:00Z',
                  end: '2021-08-20T01:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449863',
                    title: 'LIVE: Western & Southern Open: Day 4',
                    synopsis:
                      "LIVE - ATP 1000: Western & Southern Open (a.k.a. Cincinnati Masters). Tune in for all the action from Day 4 of the Western & Southern Open as the world's top tennis players go head to head in Cincinnati, Ohio, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727530/cf5cf4666f5cedcf0b49b4b9fe5c41d2.jpg',
                    },
                    number: 491,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: 'SPT2',
                    title: 'Sky Sport 2',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-20T17:00:00Z',
                  end: '2021-08-20T21:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449866',
                    title: 'LIVE: Western & Southern Open: Day 5',
                    synopsis:
                      "LIVE - ATP 1000: Western & Southern Open (a.k.a. Cincinnati Masters). Tune in for all the action of the Quarterfinal 1 & 2 from Day 5 of the tournament as the world's top tennis players go head to head in Cincinnati, Ohio, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727394/e9058ee5cb46a452e4afc9af9ec2a0be.jpg',
                    },
                    number: 494,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: '0004',
                    title: 'Sky Sport 8',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-20T23:00:00Z',
                  end: '2021-08-21T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449867',
                    title: 'LIVE: Western & Southern Open: Day 5',
                    synopsis:
                      "LIVE - ATP 1000: Western & Southern Open (a.k.a. Cincinnati Masters). Tune in for all the action of the Quarterfinal 3 & 4 from Day 5 of the tournament as the world's top tennis players go head to head in Cincinnati, Ohio, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727493/185f37c6d97f6a56cf4d997fe93efd23.jpg',
                    },
                    number: 495,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: '0001',
                    title: 'Sky Sport 4',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-21T17:00:00Z',
                  end: '2021-08-21T19:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449870',
                    title: 'LIVE: Western & Southern Open: D6: SF1',
                    synopsis:
                      "LIVE - ATP 1000: Western & Southern Open (a.k.a. Cincinnati Masters). Tune in for all the action of the Semifinal 1 from Day 6 of the tournament as the world's top tennis players go head to head in Cincinnati, Ohio, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727364/0702853cced52d51dbf77b7e0f7b2fba.jpg',
                    },
                    number: 498,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: 'SPT1',
                    title: 'Sky Sport 1',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-22T16:00:00Z',
                  end: '2021-08-22T18:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449875',
                    title: 'LIVE: Western & Southern Open: Doubles F',
                    synopsis:
                      "LIVE - ATP 1000: Western & Southern Open (a.k.a. Cincinnati Masters). Tune in for all the action from the Doubles Final of the Western & Southern Open as the world's top tennis players go head to head in Cincinnati, Ohio, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727777/1efda328e10045b806327684a3e38788.jpg',
                    },
                    number: 503,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: '0004',
                    title: 'Sky Sport 8',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-22T19:00:00Z',
                  end: '2021-08-23T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449892',
                    title: 'LIVE: Winston-Salem Open: Day 1',
                    synopsis:
                      "LIVE - ATP 250: Winston-Salem Open. Tune in for all the action from Day 1 of the tournament as the world's top tennis players go head to head in Winston-Salem, NC, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727787/a42a4b05dfc8fc5e102de149e521f9f0.jpg',
                    },
                    number: 520,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: 'SPT2',
                    title: 'Sky Sport 2',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-23T19:00:00Z',
                  end: '2021-08-24T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449894',
                    title: 'LIVE: Winston-Salem Open: Day 2',
                    synopsis:
                      "LIVE - ATP 250: Winston-Salem Open. Tune in for all the action from Day 2 of the tournament as the world's top tennis players go head to head in Winston-Salem, NC, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727487/9d2e2ee7e028a1f1c78c7029155ed212.jpg',
                    },
                    number: 522,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: 'SPT2',
                    title: 'Sky Sport 2',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-24T19:00:00Z',
                  end: '2021-08-25T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449896',
                    title: 'LIVE: Winston-Salem Open: Day 3',
                    synopsis:
                      "LIVE - ATP 250: Winston-Salem Open. Tune in for all the action from Day 3 of the tournament as the world's top tennis players go head to head in Winston-Salem, NC, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727776/c258c2ea56efd48d161db82e1732d741.jpg',
                    },
                    number: 524,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: 'SPT2',
                    title: 'Sky Sport 2',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-25T19:00:00Z',
                  end: '2021-08-26T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449898',
                    title: 'LIVE: Winston-Salem Open: Day 4',
                    synopsis:
                      "LIVE - ATP 250: Winston-Salem Open. Tune in for all the action from Day 4 of the tournament as the world's top tennis players go head to head in Winston-Salem, NC, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727198/36eb93345e1bfa7e118a53631d8406c0.jpg',
                    },
                    number: 526,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: 'SPT2',
                    title: 'Sky Sport 2',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-26T19:00:00Z',
                  end: '2021-08-27T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449900',
                    title: 'LIVE: Winston-Salem Open: Day 5',
                    synopsis:
                      "LIVE - ATP 250: Winston-Salem Open. Tune in for all the action from Day 5 of the tournament as the world's top tennis players go head to head in Winston-Salem, NC, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727354/0a100f0b8161095eb9e081e6947f7d43.jpg',
                    },
                    number: 528,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: '0004',
                    title: 'Sky Sport 8',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-27T23:00:00Z',
                  end: '2021-08-28T03:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449902',
                    title: 'LIVE: Winston-Salem Open: Day 6',
                    synopsis:
                      "LIVE - ATP 250: Winston-Salem Open. Tune in for all the action from Day 6 of the tournament as the world's top tennis players go head to head in Winston-Salem, NC, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727451/cf2126919f6d44482fa5cc2368af10b1.jpg',
                    },
                    number: 530,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
                {
                  channel: {
                    id: '0004',
                    title: 'Sky Sport 8',
                    mySchedule: null,
                    schedule: {
                      subscriptions: [{ id: 'SPORTS', title: 'Sports' }],
                    },
                  },
                  rating: { classification: '_G', advisories: [] },
                  start: '2021-08-28T21:00:00Z',
                  end: '2021-08-28T23:00:00Z',
                  live: true,
                  recordOptions: ['EPISODE', 'SERIES'],
                  programme: {
                    __typename: 'Episode',
                    id: 'mac_11449905',
                    title: 'LIVE: Winston-Salem Open: Final',
                    synopsis:
                      "LIVE - ATP 250: Winston-Salem Open. Tune in for all the action from Day 7 - the final day of the tournament as the world's top tennis players go head to head in Winston-Salem, NC, USA.",
                    duration: null,
                    rating: null,
                    season: { id: 'mac_s_478244', number: 2021 },
                    image: {
                      uri:
                        'https://images.skyone.co.nz/media/images/stills/content/727196/11d474a8eb7a3059a4b987e2330fdd5b.jpg',
                    },
                    number: 533,
                    watchProgress: null,
                    asset: null,
                    mySchedule: null,
                    schedule: null,
                    downloadSchedule: null,
                  },
                },
              ],
            },
          ],
          displayTime: 'PT5S',
        },
        rails: railsResult,
      },
      isLoading: false,
      error: null,
    },
  },
};
describe('hero', () => {
  it('should return a valid object', () => {
    expect(hero(mockState as any)).toEqual(expect.anything());
  });
});

describe('rails', () => {
  it('should return a valid object', () => {
    expect(rails(mockState as any)).toEqual(expect.anything());
  });

  it('select home one rail content', () => {
    // When
    const dataResponse = rail(mockState as any)(railsResult[0].id);

    // Then
    expect(dataResponse).toEqual(railsResult[0]);
  });

  it('should filter out empty objects', () => {
    expect(
      rails.resultFunc([
        { id: 'id', layout: {} as GroupLayout, contentPage: { content: [] as GroupMember[] } },
        undefined as any,
      ]),
    ).toHaveLength(1);
  });

  it('should filter out empty contents', () => {
    const r = rails.resultFunc([
      {
        id: 'id',
        layout: {} as GroupLayout,
        contentPage: {
          content: [1, 2, 3, undefined as any] as GroupMember[],
        },
      },
      undefined as any,
    ]);
    if (r) {
      expect(r[0].contentPage.content).toHaveLength(3);
    }
  });
});

describe('isLoading', () => {
  it('should return a valid object', () => {
    expect(isLoading(mockState as any)).toEqual(expect.anything());
  });
});

describe('error', () => {
  it('should return null', () => {
    expect(error(mockState as any)).toEqual(null);
  });
});

describe('railsShallow', () => {
  it.each([{ state: mockState, expected: expect.anything() }])(
    'should return only ids',
    ({ state, expected }) => {
      const result = railsShallow(state as any);
      expect(result).toEqual(expected);

      if (result) {
        expect(result[0]).toBeTruthy();
      }
    },
  );
});

describe('continueWatchingRailId', () => {
  it.each([{ state: mockState, expected: expect.anything() }])(
    'should return only id of continue watching rail',
    ({ state, expected }) => {
      const result = continueWatchingRailId(state as any);
      expect(result).toEqual(expected);

      if (result) {
        expect(result).toBe('skylarkSetUid|coll_7a3a26fdfdcb4aa39998069c9776a494');
      }
    },
  );
});

describe('heroCarousel', () => {
  it.each([
    { input: 'PT5S', expected: 5 },
    { input: undefined, expected: 5 },
  ])('heroesDuration should return correctly', ({ input, expected }) => {
    const value = heroesDuration.resultFunc(input);

    expect(value).toEqual(expected);
  });

  it.each([{ input: mockState, expected: 3 }])(
    'heroes should return correctly',
    ({ input, expected }) => {
      const value = heroes(input as any);

      expect(value).toHaveLength(expected);
    },
  );
});
