import { createApiSuccessState, createSuccessAPIAction } from '../../../testUtils/api';
import reducer from '../reducer';
import { SEARCH, SUGGESTIONS, FETCH_SIMILAR, FETCH_POPULAR } from '../constants';
import { Brand } from '../../../types/models/Brand';
import { createApiInitialState } from '../../../utils/api';
import { searchResultData } from './testData';

const initState = {
  query: '',
  result: createApiInitialState(null),
  suggestions: createApiInitialState([]),
  popular: createApiInitialState([]),
  similar: createApiInitialState([]),
};

test('search results by query', () => {
  const searchAction = createSuccessAPIAction(SEARCH, searchResultData);
  const expectedSearchState = createApiSuccessState(searchResultData.search.groupResults);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, searchAction)).toEqual({
    ...initState,
    result: expectedSearchState,
  });
});

test('retrive suggestions by query criteria', () => {
  const suggestions = {
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

  const suggestionsAction = createSuccessAPIAction(SUGGESTIONS, suggestions);
  const expectedSuggestionsState = createApiSuccessState(suggestions.search.results);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, suggestionsAction)).toEqual({
    ...initState,
    suggestions: expectedSuggestionsState,
  });
});

// TODO update test when similar tv shows and movies endpoint is ready
test('similar shows and movies', () => {
  const searchAction = createSuccessAPIAction(FETCH_SIMILAR, [searchResultData]);
  const expectedSimilarState = createApiSuccessState(Brand.createInstances([searchResultData]));

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, searchAction)).toEqual({
    ...initState,
    similar: expectedSimilarState,
  });
});

test('popular shows and movies', () => {
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

  const searchAction = createSuccessAPIAction(FETCH_POPULAR, popularRail);
  const expectedPopularState = createApiSuccessState(popularRail.data);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, searchAction)).toEqual({
    ...initState,
    popular: expectedPopularState,
  });
});
