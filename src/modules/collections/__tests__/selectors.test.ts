import { mergeDeepRight } from 'ramda';
import {
  getCollection,
  getCollectionSelectedFilters,
  getGenreFilterOptions,
  getSubscriptionFilterOptions,
  getViewingContextFilterOptions,
  getSortOptions,
  error,
  isLoading,
  getBrowseCategories,
  browseCategoriesIsLoading,
  browseCategoriesError,
} from '../selectors';

const collectionId = 'skylarkCollectionUid|coll_1902c2d4597c47d0b2822572a04ccbb0';
const collectionData = {
  id: collectionId,
  title: 'Drama',
  tileImage: {
    uri:
      'https://images-dev.skyone.co.nz/media/images/stills/set/53/8d140f16de35824c204869fefcca564c.png',
  },
  namedFilters: [
    {
      id: '1',
      title: 'Drama',
    },
    {
      id: '2',
      title: 'Comedy',
    },
    {
      id: '3',
      title: 'Action Heroes',
    },
    {
      id: '4',
      title: 'Documentary',
    },
    {
      id: '5',
      title: 'Kids & Family',
    },
    {
      id: '6',
      title: 'Horror',
    },
  ],
  contentPage: {
    pageInfo: {
      endCursor: 'MQ==',
      hasNextPage: true,
    },
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

const mockState: any = {
  collections: {
    collectionsById: {
      data: {
        [collectionId]: collectionData,
      },
      isLoading: false,
      error: null,
    },
    filtersById: {
      data: {},
    },
    browseCategories: {
      data: [
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_6989c4406de137bab5a47730e6111b0d',
          title: 'TV Shows',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_55ba44c548d33baf99f70e64a7f232b0',
          title: 'Movies',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_d2466bd5a5fa3be68c9e405e2bfd42df',
          title: 'Kids',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_b582cbb2f8293afa8bbe26c4c360a01d',
          title: 'Channels',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
        },
        {
          __typename: 'Collection',
          id: 'skylarkSetUid|coll_9ce5e55788893043a80a27b1812df864',
          title: 'Downloadable',
          tileImage: {
            uri:
              'https://images.skyone.co.nz/media/images/stills/content/59897/19d9578e202604805ef992ab20cdcca2.jpg',
          },
        },
      ],
      isLoading: false,
      error: null,
    },
  },
};

test('get collection by id', () => {
  // When
  const collection = getCollection(mockState)(collectionId);

  // Then
  expect(collection).toEqual(mockState.collections.collectionsById.data[collectionId]);
});

test('get collection selected filters', () => {
  // When
  const selectedFilters = getCollectionSelectedFilters(mockState)(collectionId);

  // Then
  expect(selectedFilters).toEqual(mockState.collections.filtersById.data[collectionId]);
});

test('get genre filter options', () => {
  // When
  const options = getGenreFilterOptions(mockState)(collectionId);

  // Then
  expect(options).toEqual({
    name: 'genre',
    options: [
      { id: 'all', title: 'All' },
      ...mockState.collections.collectionsById.data[collectionId].namedFilters,
    ],
  });
});

test('get genre filter options when there are no genres', () => {
  // When
  const mockStateWithNoGenres: any = mergeDeepRight(mockState, {
    collections: {
      collectionsById: {
        data: {
          [collectionId]: { namedFilters: [] },
        },
      },
    },
  });
  const options = getGenreFilterOptions(mockStateWithNoGenres)(collectionId);

  // Then
  expect(options).toEqual({
    name: 'genre',
    options: [],
  });
});

test('get subscription filter options', () => {
  // When
  const options = getSubscriptionFilterOptions();

  // Then
  expect(options).toEqual({
    name: 'subscription',
    options: [
      { id: 'mySubscription', title: 'My Subscription' },
      { id: 'all', title: 'All of Sky Go' },
    ],
  });
});

test('get subscription filter options for TV', () => {
  // When
  const options = getSubscriptionFilterOptions(true);

  // Then
  expect(options).toEqual({
    name: 'subscription',
    options: [
      { id: 'mySubscription', title: 'My Subscription' },
      { id: 'all', title: 'All' },
    ],
  });
});

test('get viewingContext filter options', () => {
  // When
  const options = getViewingContextFilterOptions();

  // Then
  expect(options).toEqual({
    name: 'viewingContext',
    options: [
      { id: 'onDemand', title: 'On Demand' },
      { id: 'upcomingOnTV', title: 'Upcoming On TV' },
      { id: 'downloadable', title: 'Downloadable' },
      { id: 'all', title: 'All' },
    ],
  });
});

test('get viewingContext filter options for web', () => {
  // When
  const options = getViewingContextFilterOptions(true);

  // Then
  expect(options).toEqual({
    name: 'viewingContext',
    options: [
      { id: 'onDemand', title: 'On Demand' },
      { id: 'upcomingOnTV', title: 'Upcoming On TV' },
      { id: 'all', title: 'All' },
    ],
  });
});

test('get sort options', () => {
  // When
  const options = getSortOptions();

  // Then
  expect(options).toEqual({
    name: 'sort',
    options: [
      { id: 'NEWEST', title: 'Newest' },
      { id: 'ALPHABETICAL', title: 'A-Z' },
    ],
  });
});

test('select is loading', () => {
  // When
  const dataResponse = isLoading(mockState);

  // Then
  expect(dataResponse).toEqual(mockState.collections.collectionsById.isLoading);
});
//
test('select error', () => {
  // When
  const dataResponse = error(mockState);

  // Then
  expect(dataResponse).toEqual(mockState.collections.collectionsById.error);
});

test('get browse categories', () => {
  // When
  const dataResponse = getBrowseCategories(mockState);

  // Then
  expect(dataResponse).toEqual(mockState.collections.browseCategories.data);
});

test('browse categories is loading', () => {
  // When
  const dataResponse = browseCategoriesIsLoading(mockState);

  // Then
  expect(dataResponse).toEqual(mockState.collections.browseCategories.isLoading);
});
//
test('browse categories error', () => {
  // When
  const dataResponse = browseCategoriesError(mockState);

  // Then
  expect(dataResponse).toEqual(mockState.collections.browseCategories.error);
});
