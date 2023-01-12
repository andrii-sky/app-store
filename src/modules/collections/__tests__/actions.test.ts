import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '../../..';
import {
  CLEAR_COLLECTION_FILTERS,
  FETCH_BROWSE_CATEGORIES,
  FETCH_COLLECTION,
  FETCH_HOME_COLLECTION,
  SET_COLLECTION_FILTERS,
  SET_COLLECTION_FILTER,
} from '../constants';
import {
  setCollectionFilters,
  fetchBrowseCategories,
  fetchCollection,
  fetchHomeCollection,
  setCollectionFilter,
  browseMoreFiltersValues,
  clearCollectionFilters,
} from '../actions';
import { createSuccessAPIActions } from '../../../testUtils/api';

const response = {
  collection: {
    id: 'skylarkCollectionUid|coll_1902c2d4597c47d0b2822572a04ccbb0',
    title: 'Drama',
    tileImage: {
      uri:
        'https://images-dev.skyone.co.nz/media/images/stills/set/53/8d140f16de35824c204869fefcca564c.png',
    },
    defaultContentFilter: {
      viewingContextsByContentType: {
        viewingContexts: ['VOD', 'CATCHUP'],
        contentTypes: ['MOVIES'],
      },
    },
    defaultContentSort: 'NEWEST',
    content: [
      {
        __typename: 'Show',
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
            'https://images-dev.skyone.co.nz/media/images/stills/content/1332/6042607107c029671ad8209c8a3b6681.jpg',
        },
        genres: [
          {
            title: 'Drama',
          },
        ],
        numberOfSeasons: 2,
      },
      {
        __typename: 'Show',
        id: 'skylarkBrandUid|bran_7645d588e3c74eff98cd5f4e6f28314b',
        title: 'Succession',
        rating: {
          classification: '_16',
          advisories: ['S', 'L'],
        },
        contentTileHorizontal: {
          uri:
            'https://images-dev.skyone.co.nz/media/images/stills/content/1548/a2f655b657a4071d8c96d77b2fce7d08.jpg',
        },
        contentTileVertical: {
          uri:
            'https://images-dev.skyone.co.nz/media/images/stills/content/1548/f19ea3f4662939b264123da10071f190.jpg',
        },
        genres: [
          {
            title: 'Drama',
          },
        ],
        numberOfSeasons: 2,
      },
    ],
  },
};

const browseResponse = {
  section: {
    home: {
      categories: [
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_6989c4406de137bab5a47730e6111b0d',
          title: 'TV Shows',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_55ba44c548d33baf99f70e64a7f232b0',
          title: 'Movies',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_d2466bd5a5fa3be68c9e405e2bfd42df',
          title: 'Kids',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_b582cbb2f8293afa8bbe26c4c360a01d',
          title: 'Channels',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_9ce5e55788893043a80a27b1812df864',
          title: 'Downloadable',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
      ],
    },
  },
};

const browseResponseForWeb = {
  section: {
    home: {
      categories: [
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_6989c4406de137bab5a47730e6111b0d',
          title: 'TV Shows',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_55ba44c548d33baf99f70e64a7f232b0',
          title: 'Movies',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_d2466bd5a5fa3be68c9e405e2bfd42df',
          title: 'Kids',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_b582cbb2f8293afa8bbe26c4c360a01d',
          title: 'Channels',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
          defaultContentFilter: {
            viewingContextsByContentType: {
              viewingContexts: ['VOD', 'LINEAR'],
            },
          },
          defaultContentSort: 'NEWEST',
        },
      ],
    },
  },
};

const initState = {
  collections: {
    collectionsById: {
      data: {},
    },
    filtersById: {
      data: {},
    },
  },
};

const getFilterActions = resp => {
  const filterActions: any[] = [];
  resp.section.home.categories.forEach(category => {
    filterActions.push({
      type: SET_COLLECTION_FILTERS,
      payload: {
        collectionId: category.id,
        filters: {
          sort: 'NEWEST',
          viewingContext: 'all',
        },
      },
    });
  });
  return filterActions;
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('collection actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch all collection for home collection', async () => {
    // setup
    const collectionId = response.collection.id;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(response);
    const expectedActions = createSuccessAPIActions(FETCH_HOME_COLLECTION, response, {
      collectionId,
    });

    await store.dispatch(fetchHomeCollection(collectionId) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  const setDefaultCollectionFilter = (collectionId, overrideFilter?) => {
    return [
      {
        type: SET_COLLECTION_FILTERS,
        payload: {
          collectionId,
          filters: {
            genre: 'all',
            sort: 'NEWEST',
            subscription: 'all',
            viewingContext: 'onDemand',
            ...overrideFilter,
          },
        },
      },
    ];
  };

  test('fetch all collection', async () => {
    // setup
    const collectionId = response.collection.id;
    const defaultFilterVals = {
      genre: 'all',
      subscription: 'all',
      sort: undefined,
      viewingContext: undefined,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(response);
    const expectedActions = [
      ...createSuccessAPIActions(FETCH_COLLECTION, response, {
        collectionId,
        selectedFilters: { ...defaultFilterVals },
        isLoadMore: false,
      }),
      ...setDefaultCollectionFilter(collectionId),
    ];

    await store.dispatch(fetchCollection(collectionId) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch all collection for authenticated user', async () => {
    // setup
    const collectionId = response.collection.id;
    const defaultFilterVals = {
      genre: 'all',
      subscription: 'mySubscription',
    };
    const existingState = {
      auth: {
        user: {},
      },
      collections: {
        collectionsById: {
          data: {},
        },
        filtersById: {
          data: {},
        },
      },
    };
    const existingStore = (createStore(existingState) as unknown) as MockStore;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(response);
    const expectedActions = [
      ...createSuccessAPIActions(FETCH_COLLECTION, response, {
        collectionId,
        selectedFilters: defaultFilterVals,
        isLoadMore: false,
      }),
      ...setDefaultCollectionFilter(collectionId, defaultFilterVals),
    ];

    await existingStore.dispatch(fetchCollection(collectionId) as any);

    expect(existingStore.getActions()).toEqual(expectedActions);
  });

  test('fetch collection for next page', async () => {
    // setup
    const collectionId = response.collection.id;
    const filterVals = {
      genre: 'all',
      sort: 'NEWEST',
      subscription: 'all',
      viewingContext: 'onDemand',
    };
    const existingState = {
      collections: {
        collectionsById: {
          data: {
            [collectionId]: {
              contentPage: {
                pageInfo: {
                  endCursor: 'cursor',
                },
              },
            },
          },
        },
        filtersById: {
          data: { [collectionId]: filterVals },
        },
      },
    };
    const existingStore = (createStore(existingState) as unknown) as MockStore;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(response);
    const expectedActions = [
      ...createSuccessAPIActions(FETCH_COLLECTION, response, {
        collectionId,
        selectedFilters: filterVals,
        isLoadMore: true,
      }),
      ...setDefaultCollectionFilter(collectionId, filterVals),
    ];

    await existingStore.dispatch(fetchCollection(collectionId, 10, true) as any);

    expect(existingStore.getActions()).toEqual(expectedActions);
  });

  test('set collection filter', async () => {
    const collectionId = '1';
    const filterName = 'filter1';
    const filterVal = 'value';
    const expectedActions = [
      {
        type: SET_COLLECTION_FILTER,
        payload: { collectionId, name: filterName, value: filterVal },
      },
    ];

    store.dispatch(setCollectionFilter(collectionId, filterName, filterVal));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('clear collection filters', async () => {
    const collectionId = '1';
    const expectedActions = [
      {
        type: CLEAR_COLLECTION_FILTERS,
        payload: { collectionId },
      },
    ];

    store.dispatch(clearCollectionFilters(collectionId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set collection filters', async () => {
    const collectionId = '1';
    const expectedActions = [
      {
        type: SET_COLLECTION_FILTERS,
        payload: { collectionId, filters: { key: 'value' } },
      },
    ];

    store.dispatch(setCollectionFilters(collectionId, { key: 'value' }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set browse more filters', async () => {
    const collectionId = '1';
    const expectedActions = [
      {
        type: SET_COLLECTION_FILTERS,
        payload: { collectionId, filters: browseMoreFiltersValues },
      },
    ];

    store.dispatch(setCollectionFilters(collectionId, browseMoreFiltersValues));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch browse categories', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(browseResponse);
    const expectedActions = [
      ...createSuccessAPIActions(FETCH_BROWSE_CATEGORIES, browseResponse),
      ...getFilterActions(browseResponse),
    ];

    await store.dispatch(fetchBrowseCategories());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch browse categories for web', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(browseResponseForWeb);

    const expectedActions = [
      ...createSuccessAPIActions(FETCH_BROWSE_CATEGORIES, browseResponseForWeb),
      ...getFilterActions(browseResponseForWeb),
    ];

    await store.dispatch(fetchBrowseCategories(true));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
