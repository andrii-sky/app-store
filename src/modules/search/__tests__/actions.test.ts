import mockAxios from 'jest-mock-axios';
import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';

import { init } from '../../..';
import { FETCH_POPULAR, FETCH_SIMILAR, SEARCH, SET_SEARCH_QUERY, SUGGESTIONS } from '../constants';
import { fetchPopular, fetchSimilar, search, suggestions } from '../actions';
import { createSuccessAPIActions } from '../../../testUtils/api';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('fetch rail content actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  const searchResult = {
    search: {
      results: [
        {
          __typename: 'Movie',
          id: 'skylarkEpisodeUid|epis_c9cdca580b8c4fe0884e051c450f8454',
          title: "Heaven's Gate",
          rating: null,
          contentTileHorizontal: {
            uri: 'https://images-dev.skyone.co.nz',
          },
          contentTileVertical: {
            uri: 'https://images-dev.skyone.co.nz',
          },
          genres: [],
          year: 1980,
          duration: null,
        },
      ],
    },
  };

  const suggestionsResponse = {
    search: {
      results: [
        {
          id: 'skylarkEpisodeUid|epis_c9cdca580b8c4fe0884e051c450f8454',
          title: "Heaven's Gate",
        },
        {
          id: 'skylarkEpisodeUid|epis_75c58615c8a74e4a9320ca12f157b92a',
          title: 'Green Book',
        },
      ],
    },
  };

  const popularRail = {
    data: [
      {
        url: '/api/brands/bran_b2a7fa22deb943eca4baa9bc3855857b/',
        title: 'Watchmen',
        rank: '7',
        images: [
          {
            url:
              'https://images.origin.feature.cms.skyone.co.nz/media/images/stills/content/346/a040ffdbfd7500e6960486dfd345ba6a.jpg',
            type: 'main',
          },
        ],
      },
      {
        url: '/api/brands/bran_3e81cd4bb30a4889bcf974f13d8952cb/',
        title: 'Arrow',
        rank: '9',
        images: [
          {
            url:
              'https://images.origin.feature.cms.skyone.co.nz/media/images/stills/content/346/a040ffdbfd7500e6960486dfd345ba6a.jpg',
            type: 'main',
          },
        ],
      },
    ],
  };

  const searchQuery = 'watchmen';

  test('search content by query', async () => {
    // setup
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue({ data: searchResult });

    const expectedActions = [
      {
        type: SET_SEARCH_QUERY,
        payload: searchQuery,
      },
      ...createSuccessAPIActions(SEARCH, searchResult),
    ];

    await store.dispatch(search(searchQuery));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('retrieve suggestions based on query criteria', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue({ data: suggestionsResponse });

    const expectedActions = [
      {
        type: SET_SEARCH_QUERY,
        payload: 'Aqua',
      },
      ...createSuccessAPIActions(SUGGESTIONS, suggestionsResponse),
    ];

    await store.dispatch(suggestions('Aqua'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch popular rail', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: { data: popularRail } });

    const expectedActions = createSuccessAPIActions(FETCH_POPULAR, popularRail);

    await store.dispatch(fetchPopular(''));

    expect(store.getActions()).toEqual(expectedActions);
  });

  // TODO update this test when similar shows and movies endpoint is ready
  test('fetch similar shows and movies', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: { data: [searchResult] } });

    const expectedActions = createSuccessAPIActions(FETCH_SIMILAR, [searchResult]);

    await store.dispatch(fetchSimilar(searchQuery));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
