import { GroupLayout, GroupMember } from '@/types/graph-ql';
import {
  rail,
  rails,
  error,
  isLoading,
  railsShallow,
  continueWatchingRailId,
  getBanner,
  installedListById,
  favouriteList,
  installedList,
  isMandatory,
  allApps,
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

const appsList = [
  {
    appName: 'Netflix',
    packageName: 'com.netflix.app',
    banner: 'very long base 64 image content netflix',
  },
  {
    appName: 'Disney+',
    packageName: 'com.disney.app',
    banner: 'mickey mouse is true new evil empire base 64 image',
  },
];

const appsState = {
  myApps: {
    installed: appsList,
    content: {
      data: {
        rails: [
          {
            layout: 'FAVOURITE_APPS',
            contentPage: {
              content: [
                { id: 'com.netflix.app', favourite: true, mandatory: true },
                { id: 'com.redbull.app', favourite: false, mandatory: false },
              ],
            },
          },
        ],
      },
    },
    allApps: {
      data: appsList,
    },
  },
};

const mockState = {
  myApps: {
    content: {
      data: {
        rails: railsResult,
      },
      isLoading: false,
      error: null,
    },
  },
};

describe('rails', () => {
  it('should return a valid object', () => {
    expect(rails(mockState as any)).toEqual(expect.anything());
  });

  it('select myHub rail content', () => {
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

test('select installed apps', () => {
  // when
  const apps = installedList(appsState);

  // Then
  expect(apps).toEqual(appsState.myApps.installed);
});

test('select all apps', () => {
  // when
  const apps = allApps(appsState);

  // Then
  expect(apps).toEqual(appsState.myApps.allApps.data);
});

test('select app banner', () => {
  // when
  const appId = appsState.myApps.installed[0].packageName;

  const banner = getBanner(appsState);

  // Then
  expect(banner(appId)).toEqual(appsState.myApps.installed[0].banner);
});

test('select favourite apps', () => {
  // when
  const favouriteApps = favouriteList(appsState as any);

  // Then
  expect(favouriteApps).toEqual(appsState.myApps.content.data.rails?.[0].contentPage.content);
});

test('select installed apps by id', () => {
  // when
  const apps = installedListById(appsState);

  // Then
  expect(apps).toEqual({
    'com.disney.app': {
      appName: 'Disney+',
      banner: 'mickey mouse is true new evil empire base 64 image',
      packageName: 'com.disney.app',
    },
    'com.netflix.app': {
      appName: 'Netflix',
      banner: 'very long base 64 image content netflix',
      packageName: 'com.netflix.app',
    },
  });
});

it('is application mandatory', () => {
  // When
  const isAppMandatory = isMandatory(appsState as any)(
    appsState.myApps.content.data.rails[0].contentPage.content[0].id,
  );

  // Then
  expect(isAppMandatory).toEqual(
    appsState.myApps.content.data.rails[0].contentPage.content[0].mandatory,
  );
});
