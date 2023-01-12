import { result, suggestionsResult, query, similar, popular, resultError } from '../selectors';
import { searchResultData } from './testData';

const searchQuery = 'Aquaman';

const resultData = searchResultData.search.groupResults;

const suggestionsData = [
  {
    id: 'skylarkEpisodeUid|epis_c9cdca580b8c4fe0884e051c450f8454',
    title: "Heaven's Gate",
  },
  {
    id: 'skylarkEpisodeUid|epis_75c58615c8a74e4a9320ca12f157b92a',
    title: 'Green Book',
  },
];

const suggestions = ["Heaven's Gate", 'Green Book'];

const popularData = [
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
];

const state = {
  search: {
    result: {
      data: resultData,
    },
    suggestions: {
      data: suggestionsData,
    },
    query: searchQuery,
    popular: {
      data: popularData,
    },
    similar: {
      data: resultData,
    },
  },
};

test('select search result', () => {
  // When
  const res = result(state);

  // Then
  expect(res).toEqual(resultData);
});

test('select search error', () => {
  // Given
  const errorState = {
    search: {
      result: {
        data: null,
        error: 'CIA classified content',
      },
    },
  };

  // When
  const res = resultError(errorState);

  // Then
  expect(res).toEqual(errorState.search.result.error);
});

test('select suggestions result', () => {
  // When
  const res = suggestionsResult(state);

  // Then
  expect(res).toEqual(suggestions);
});

test('select search query', () => {
  // When
  const res = query(state);

  // Then
  expect(res).toEqual(searchQuery);
});

test('select similar shows and movies', () => {
  // When
  const res = similar(state);

  // Then
  expect(res.data).toEqual(resultData);
});

test('select popular shows and movies', () => {
  // When
  const res = popular(state);

  // Then
  expect(res.data).toEqual(popularData);
});
