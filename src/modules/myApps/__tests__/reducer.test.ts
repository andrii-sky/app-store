import { APIError } from '@/errors';
import {
  createApiSuccessState,
  createFailureAPIAction,
  createRequestAPIAction,
  createSuccessAPIAction,
} from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { InstalledApp } from '@/types/interfaces/InstalledApp';
import { createAction } from '@reduxjs/toolkit';
import reducer from '../reducer';
import {
  FETCH_ALL_APPS,
  FETCH_CONTENT,
  FETCH_RAIL,
  SET_FAVOURITE_APP,
  SET_INSTALLED_APPS,
  SET_LAST_OPENED_APP,
} from '../constants';

const basicContentResponse = {
  section: {
    id: 'myHub',
    home: {
      __typename: 'MyAppsHome',
      path: '/',
      groups: [
        {
          id: 'skylarkSetUid|coll_7a3a26fdfdcb4aa39998069c9776a494',
          title: 'Movies',
          layout: 'RAIL_LANDSCAPE',
          contentPage: {
            pageInfo: { endCursor: 'abc123', hasNextPage: true },
            content: [
              {
                __typename: 'VodMovie',
                id: 'skylarkEpisodeUid|epis_23b97b05742c44ae80dd0ca1a107ffd3',
                title: 'Hunt for the Wilderpeople',
                rating: { classification: '_PG', advisories: [] },
                contentTileHorizontal: {
                  uri:
                    'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
                },
                contentTileVertical: {
                  uri:
                    'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
                },
                genres: [
                  { title: 'Comedy' },
                  { title: 'Adventure' },
                  { title: 'Long Test Genre 1' },
                  { title: 'Long Test Genre 2' },
                ],
                year: 2016,
                duration: 'PT1H36M59S',
              },
            ],
          },
        },
        {
          id: 'skylarkSetUid|coll_7a3a26fdfdcb4aa39998069c977a342',
          title: 'All Channels',
          layout: 'RAIL_LANDSCAPE',
          contentPage: {
            pageInfo: {
              hasNextPage: true,
              endCursor: 'abc123',
            },
            content: [
              {
                __typename: 'LinearChannel',
                id: 'skylarkChannelUid|chan_54ca7e0dbe924e8d8cb641a8a91caf12',
                title: 'SoHo',
                slot: {
                  start: '2021-03-08T22:00:00Z',
                  end: '2021-03-08T22:20:00Z',
                  hasParentalRestriction: true,
                  rating: null,
                  programme: {
                    __typename: 'Episode',
                    id: 'skylarkEpisodeUid|epis_e0c2fe15b6a046218a28f2875e784607',
                    title: 'Foam Party',
                    number: 7,
                    show: {
                      __typename: 'Show',
                      id: 'skylarkBrandUid|bran_127ca7c9490a407aa8eae11e59cb7086',
                      title: 'Room 104',
                      genres: [],
                    },
                    season: {
                      number: 4,
                    },
                  },
                },
                mySchedule: {
                  subscriptions: [],
                },
                contentTileHorizontal: {
                  uri:
                    'https://images-sit.skyone.co.nz/media/images/stills/channel/502/65171290a802cca7b037edb7a90b448c.png',
                },
                contentTileVertical: {
                  uri:
                    'https://images-sit.skyone.co.nz/media/images/stills/channel/502/65171290a802cca7b037edb7a90b448c.png',
                },
              },
            ],
          },
        },
      ],
    },
  },
};

const railPaginationResponse = {
  group: {
    id: 'skylarkSetUid|coll_7a3a26fdfdcb4aa39998069c9776a494',
    title: 'Movies',
    layout: 'RAIL_LANDSCAPE',
    contentPage: {
      pageInfo: { endCursor: 'abc123', hasNextPage: true },
      content: [
        {
          __typename: 'VodMovie',
          id: 'skylarkEpisodeUid|epis_23b97b05742c44ae80dd0ca1a107dff3',
          title: 'Hunt for the Wilderpeople',
          rating: { classification: '_PG', advisories: [] },
          contentTileHorizontal: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
          },
          contentTileVertical: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
          },
          genres: [
            { title: 'Comedy' },
            { title: 'Adventure' },
            { title: 'Long Test Genre 1' },
            { title: 'Long Test Genre 2' },
          ],
          year: 2016,
          duration: 'PT1H36M59S',
        },
        {
          __typename: 'VodMovie',
          id: 'skylarkEpisodeUid|epis_23b97b05742c44ae80dd0ca1a107ffd4',
          title: 'Hunt for the Wilderpeople2',
          rating: { classification: '_PG', advisories: [] },
          contentTileHorizontal: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
          },
          contentTileVertical: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
          },
          genres: [
            { title: 'Comedy' },
            { title: 'Adventure' },
            { title: 'Long Test Genre 1' },
            { title: 'Long Test Genre 2' },
          ],
          year: 2017,
          duration: 'PT1H36M59S',
        },
        {
          __typename: 'VodMovie',
          id: 'skylarkEpisodeUid|epis_23b97b05742c44ae80dd0ca1a107ffd5',
          title: 'Hunt for the Wilderpeople3',
          rating: { classification: '_PG', advisories: [] },
          contentTileHorizontal: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
          },
          contentTileVertical: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/content/1440/e34233bb4779ba8aa6a9fd2af9ab2136.jpg',
          },
          genres: [
            { title: 'Comedy' },
            { title: 'Adventure' },
            { title: 'Long Test Genre 1' },
            { title: 'Long Test Genre 2' },
          ],
          year: 2018,
          duration: 'PT1H36M59S',
        },
      ],
    },
  },
};

const baseInitState = {
  content: {
    data: {
      rails: [
        {
          layout: 'FAVOURITE_APPS',
          contentPage: {
            content: [
              {
                id: 'com.disney.disneyplus',
                favourite: false,
                mandatory: false,
                lastOpened: null,
              },
            ],
          },
        },
      ],
    },
  },
  installed: [],
  allApps: {
    data: [],
    isLoading: false,
  },
};

const apps: InstalledApp[] = [
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

const defaultState = {
  content: createApiInitialState({
    content: {},
  }),
  allApps: createApiInitialState({
    allApps: [],
  }),
};

test('get myHub content', () => {
  const expectedContentState = {
    content: {
      data: {
        rails: basicContentResponse.section.home.groups,
      },
      isLoading: false,
    },
    installed: [],
    allApps: createApiInitialState([]),
  };

  // Given
  const contentState = createApiInitialState({ heroSet: undefined, rails: [] });
  const myAppsContentAction = createSuccessAPIAction(FETCH_CONTENT, basicContentResponse);

  // when and Then
  expect(reducer({ ...baseInitState, content: contentState }, myAppsContentAction)).toEqual(
    expectedContentState,
  );
});

test('get myHub content with rail', () => {
  const contentResponse = {
    ...basicContentResponse,
    ...railPaginationResponse,
  };
  const expectedContentState = {
    content: {
      data: {
        rails: basicContentResponse.section.home.groups,
      },
      isLoading: false,
    },
    installed: [],
    allApps: createApiInitialState([]),
  };
  // Given
  const contentState = createApiInitialState({ rails: [] });
  const myHubContentAction = createSuccessAPIAction(FETCH_CONTENT, contentResponse);

  // when and Then
  expect(reducer({ ...baseInitState, content: contentState }, myHubContentAction)).toEqual(
    expectedContentState,
  );
});

test('load more contents in the rail', () => {
  const initialRails = basicContentResponse.section.home.groups.map(group => ({
    ...group,
    error: null,
    isLoading: false,
  }));

  // Given
  const contentState = createApiInitialState({
    rails: initialRails,
  });

  // request action
  const railContentRequestAction = createRequestAPIAction(FETCH_RAIL, {
    railId: railPaginationResponse.group.id,
  });
  const expectedRequestState = {
    content: {
      data: {
        rails: initialRails.map(group => {
          if (group.id === railPaginationResponse.group.id) {
            return { ...group, isLoading: true };
          }
          return group;
        }),
      },
      isLoading: true,
    },
    installed: [],
    allApps: createApiInitialState([]),
  };

  expect(
    reducer({ ...baseInitState, content: contentState as any }, railContentRequestAction),
  ).toEqual(expectedRequestState);

  // success action

  const railContentAction = createSuccessAPIAction(FETCH_RAIL, railPaginationResponse, {
    railId: railPaginationResponse.group.id,
  });
  const expectedContentState = {
    content: {
      data: {
        rails: [
          {
            ...initialRails[0],
            isLoading: false,
            error: null,
            contentPage: {
              ...initialRails[0].contentPage,
              content: (initialRails[0].contentPage.content as any).concat(
                railPaginationResponse.group.contentPage.content,
              ),
            },
          },
          initialRails[1],
        ],
      },
      isLoading: false,
    },
    installed: [],
    allApps: createApiInitialState([]),
  };

  expect(reducer({ ...baseInitState, content: contentState as any }, railContentAction)).toEqual(
    expectedContentState,
  );

  // For Sonar code coverage purpose only. This condition will not occur in real-time
  const fetchRailContentAction = createSuccessAPIAction(FETCH_RAIL, railPaginationResponse, {
    railId: 'test-id',
  });
  expect(
    reducer({ ...baseInitState, content: contentState as any }, fetchRailContentAction),
  ).toEqual({
    content: contentState,
    installed: [],
    allApps: createApiInitialState([]),
  });
});

test('load more contents in the rail with failure', () => {
  const initialRails = basicContentResponse.section.home.groups.map(group => ({
    ...group,
    isLoading: false,
  }));

  // Given
  const contentState = createApiInitialState({
    rails: initialRails,
  });

  // request action
  const railContentRequestAction = createRequestAPIAction(FETCH_RAIL, {
    railId: railPaginationResponse.group.id,
  });
  const expectedRequestState = {
    content: {
      data: {
        rails: initialRails.map(group => {
          if (group.id === railPaginationResponse.group.id) {
            return { ...group, isLoading: true };
          }
          return group;
        }),
      },
      isLoading: true,
    },
    installed: [],
    allApps: createApiInitialState([]),
  };
  expect(
    reducer({ ...baseInitState, content: contentState as any }, railContentRequestAction),
  ).toEqual(expectedRequestState);

  // Failure action
  const errorPayload = new APIError('Unexpected error occurred', 500);

  const railContentAction = createFailureAPIAction(FETCH_RAIL, errorPayload, {
    railId: railPaginationResponse.group.id,
  });
  const expectedContentState = {
    content: {
      data: {
        heroSet: undefined,
        rails: [
          {
            ...initialRails[0],
            isLoading: false,
            error: errorPayload,
          },
          initialRails[1],
        ],
      },
      isLoading: false,
    },
    installed: [],
    allApps: createApiInitialState([]),
  };

  expect(reducer({ ...baseInitState, content: contentState as any }, railContentAction)).toEqual(
    expectedContentState,
  );

  // For Sonar code coverage purpose only. This condition will not occur in real-time
  const fetchRailContentAction = createFailureAPIAction(FETCH_RAIL, errorPayload, {
    railId: 'test-id',
  });
  expect(
    reducer({ ...baseInitState, content: contentState as any }, fetchRailContentAction),
  ).toEqual({
    content: contentState,
    installed: [],
    allApps: createApiInitialState([]),
  });
});

test('Set installed apps', () => {
  // Given
  const action = createAction<any>(SET_INSTALLED_APPS)(apps);
  // when and Then
  expect(reducer({ ...baseInitState, ...(defaultState as any) }, action)).toEqual({
    ...defaultState,
    installed: apps,
  });
});

const appId = 'com.disney.disneyplus';

test('add app to favourites', () => {
  // Given
  const action = createSuccessAPIAction(
    SET_FAVOURITE_APP,
    {},
    {
      appId,
      isFavourite: false,
    },
  );

  baseInitState.content.data.rails[0].contentPage.content[0].favourite = true;
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(baseInitState, action);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(newState?.content?.data?.rails?.[0]?.contentPage.content?.[0]?.favourite).toEqual(false);
});

test('add app to favourites failure', () => {
  // Given
  const action = createFailureAPIAction(SET_FAVOURITE_APP, Error(), {
    appId,
    isFavourite: true,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(baseInitState, action);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(newState?.content?.data?.rails?.[0]?.contentPage.content?.[0]?.favourite).toEqual(true);
  expect(newState?.content?.error).toEqual('favourite-app');
});

test('remove app from favourites', () => {
  // Given
  const action = createSuccessAPIAction(
    SET_FAVOURITE_APP,
    {},
    {
      appId,
      isFavourite: false,
      removeFromList: true,
    },
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(baseInitState, action);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(newState?.content?.data?.rails?.[0]?.contentPage.content).toEqual([]);
});

test('set last box app opened', () => {
  // Given
  const lastOpened = '2021-11-18T00:16:00Z';
  const action = createSuccessAPIAction(
    SET_LAST_OPENED_APP,
    { boxAppOpened: lastOpened },
    {
      appId,
    },
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(baseInitState, action);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(newState?.content?.data?.rails?.[0]?.contentPage.content?.[0]?.lastOpened).toEqual(
    lastOpened,
  );
});

test('set last box app opened failure', () => {
  // Given
  const action = createFailureAPIAction(SET_LAST_OPENED_APP, Error(), {
    appId,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(baseInitState, action);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(newState?.content?.data?.rails?.[0]?.contentPage.content?.[0]?.lastOpened).toEqual(null);
  expect(newState?.content?.error).toEqual('last-opened-app');
});

test('fetch all apps ', () => {
  const fetchAppsAction = createSuccessAPIAction(FETCH_ALL_APPS, { myBoxApps: apps });

  const expectedAppsState = createApiSuccessState(apps);

  // When - invoke reducer, Then - verify state
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(reducer(baseInitState, fetchAppsAction)).toEqual({
    ...baseInitState,
    allApps: expectedAppsState,
  });
});
