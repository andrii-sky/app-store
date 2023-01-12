import { createAction } from '@reduxjs/toolkit';
import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import reducer from '../reducer';
import {
  CLEAR_COLLECTION_FILTERS,
  FETCH_BROWSE_CATEGORIES,
  FETCH_COLLECTION,
  FETCH_HOME_COLLECTION,
  SET_COLLECTION_FILTERS,
  SET_COLLECTION_FILTER,
} from '../constants';

const response = {
  collection: {
    id: 'skylarkCollectionUid|coll_1902c2d4597c47d0b2822572a04ccbb0',
    title: 'Drama',
    tileImage: {
      uri:
        'https://images-dev.skyone.co.nz/media/images/stills/set/53/8d140f16de35824c204869fefcca564c.png',
    },
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
  },
};
const collectionId = response.collection.id;

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
    },
  },
};

const initState = {
  collectionsById: createApiInitialState({}),
  filtersById: createApiInitialState({}),
  browseCategories: createApiInitialState([]),
};

const defaultFilterVals = {
  genre: 'all',
  sort: 'NEWEST',
  subscription: 'all',
  viewingContext: 'all',
};

test('get collection for homepage', () => {
  // Given
  const fetchCollectionAction = createSuccessAPIAction(FETCH_HOME_COLLECTION, response, {
    collectionId,
  });
  const expectedCollectionState = createApiSuccessState({
    [collectionId]: response.collection,
  });

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchCollectionAction)).toEqual({
    ...initState,
    collectionsById: expectedCollectionState,
  });
});

test('get collection', () => {
  // Given
  const fetchCollectionAction = createSuccessAPIAction(FETCH_COLLECTION, response, {
    collectionId,
    selectedFilters: defaultFilterVals,
    isLoadMore: false,
  });
  const expectedCollectionState = createApiSuccessState({
    [collectionId]: response.collection,
  });

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchCollectionAction)).toEqual({
    ...initState,
    collectionsById: expectedCollectionState,
  });
});

test('load more collections', () => {
  // Given
  const existingContents = response.collection.contentPage.content;
  const existingState: any = {
    ...initState,
    collectionsById: {
      ...initState.collectionsById,
      data: {
        [collectionId]: response.collection,
      },
    },
  };
  const fetchCollectionAction = createSuccessAPIAction(FETCH_COLLECTION, response, {
    collectionId,
    selectedFilters: defaultFilterVals,
    isLoadMore: true,
  });
  const expectedCollectionState = createApiSuccessState({
    [collectionId]: {
      ...response.collection,
      contentPage: {
        ...response.collection.contentPage,
        content: existingContents.concat(existingContents),
      },
    },
  });

  // When - invoke reducer, Then - verify state
  expect(reducer(existingState, fetchCollectionAction)).toEqual({
    ...initState,
    collectionsById: expectedCollectionState,
  });
});

test('Set filter value', () => {
  const filterName = 'genre';
  const filterVal = 1;
  const existingState: any = {
    ...initState,
    filtersById: {
      ...initState.filtersById,
      data: {
        [collectionId]: {},
      },
    },
  };
  const action = createAction<object>(SET_COLLECTION_FILTER)({
    collectionId,
    name: filterName,
    value: filterVal,
  });
  const expectedFiltersByIdState = {
    ...existingState.filtersById,
    data: {
      [collectionId]: {
        [filterName]: filterVal,
      },
    },
  };
  // when
  expect(reducer(existingState, action)).toEqual({
    ...existingState,
    filtersById: expectedFiltersByIdState,
  });
});

test('Set filters', () => {
  const existingState: any = {
    ...initState,
    filtersById: {
      ...initState.filtersById,
      data: {
        [collectionId]: {},
      },
    },
  };
  const action = createAction<object>(SET_COLLECTION_FILTERS)({
    collectionId,
    filters: { key: 'value' },
  });
  const expectedFiltersByIdState = {
    ...existingState.filtersById,
    data: {
      [collectionId]: {
        key: 'value',
      },
    },
  };
  // when
  expect(reducer(existingState, action)).toEqual({
    ...existingState,
    filtersById: expectedFiltersByIdState,
  });
});

test('Clear filters', () => {
  const existingState: any = {
    ...initState,
    filtersById: {
      ...initState.filtersById,
      data: {
        [collectionId]: {},
      },
    },
  };
  const action = createAction<object>(CLEAR_COLLECTION_FILTERS)({
    collectionId,
  });
  const expectedFiltersByIdState = {
    ...existingState.filtersById,
    data: {},
  };
  // when
  expect(reducer(existingState, action)).toEqual({
    ...existingState,
    filtersById: expectedFiltersByIdState,
  });
});

test('get browse categories', () => {
  const fetchBrowseCategories = createSuccessAPIAction(FETCH_BROWSE_CATEGORIES, browseResponse);
  const expectedbrowseState = createApiSuccessState(browseResponse.section.home.categories);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchBrowseCategories)).toEqual({
    ...initState,
    browseCategories: expectedbrowseState,
  });
});
