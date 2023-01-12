import {
  getContent,
  hasNextPage,
  isLoading,
  isLoadingError,
  reducerOnFailure,
  reducerOnRequest,
  reducerOnSuccess,
} from '../Pagination';

const mockPaginationResult = {
  pageInfo: {
    startCursor: 'newStartCursor',
    endCursor: 'newEndCursor',
    hasPreviousPage: false,
    hasNextPage: false,
  },
  content: [
    {
      id: 'skylarkEpisodeUid|epis_605d41if03684bc7b5928c2a095ch9et',
      title: 'Chernobyl S1 E1',
    },
    {
      id: 'skylarkEpisodeUid|epis_605d41if03684bc7b5928c2a095ch9et2',
      title: 'Chernobyl S1 E2',
    },
  ],
};

test('changing pagination state onRequest', () => {
  // Given
  const state: any = {
    pageInfo: {
      startCursor: 'fakeStartCursor',
      endCursor: 'fakeEndCursor',
      hasPreviousPage: true,
      hasNextPage: true,
    },
    content: [],
  };
  // when pagination request sent
  reducerOnRequest(state);
  // Then
  expect(state.isLoading).toBeTruthy();
});

test('changing pagination state onSuccess', () => {
  // Given
  const state: any = {
    pageInfo: {
      startCursor: 'fakeStartCursor',
      endCursor: 'fakeEndCursor',
      hasPreviousPage: true,
      hasNextPage: true,
    },
    content: [],
  };
  // when pagination request received with success
  reducerOnSuccess(state, mockPaginationResult as any);
  // Then
  expect(state.isLoading).toBeFalsy();
  expect(state.pageInfo).toEqual(mockPaginationResult.pageInfo);
  expect(state.content.length).toEqual(2);
});

test('changing pagination state onFailure', () => {
  // Given
  const state: any = {
    pageInfo: {
      startCursor: 'fakeStartCursor',
      endCursor: 'fakeEndCursor',
      hasPreviousPage: true,
      hasNextPage: true,
    },
    content: [],
  };
  const error = new Error('unknow error');
  // when pagination request received with failure
  reducerOnFailure(state, error as any);
  // Then
  expect(state.isLoading).toBeFalsy();
  expect(state.error).toEqual(error);
});

test('get pagination info from paginationData', () => {
  const mockPaginationData: any = {
    ...mockPaginationResult,
    isLoading: false,
    error: null,
  };
  expect(getContent(mockPaginationData)).toEqual(mockPaginationResult.content);
  expect(isLoading(mockPaginationData)).toBeFalsy();
  expect(isLoadingError(mockPaginationData)).toBeFalsy();
  expect(hasNextPage(mockPaginationData)).toBeFalsy();
});
