import { Show } from '@/types/graph-ql';

import { APIError } from '@/errors';
import reducer from '../reducer';
import {
  MY_LIST,
  FETCH_BRAND,
  FETCH_DEFAULT_EPISODE,
  SELECT_SEASON,
  SAVE_PLAYBACK_POSITION,
  SET_BRAND,
  FETCH_SHOW_HIGHLIGHTS,
} from '../constants';
import {
  createApiSuccessState,
  createFailureAPIAction,
  createRequestAPIAction,
  createSuccessAPIAction,
} from '../../../testUtils/api';
import { mockMovieResponse, mockShowResponse, mockHighlightsResponse } from './testData';

const initialState = {
  brandById: { data: {}, isLoading: false },
  selectedSeasonByBrandId: {},
};

const brandState = {
  ...initialState,
  brandById: {
    data: {
      [mockShowResponse.show.id]: mockShowResponse.show,
      other_movie_id: {
        ...mockMovieResponse.movie,
        id: 'other_movie_id',
        asset: {
          id: 'other_asset_id',
        },
      },
      [mockMovieResponse.movie.id]: mockMovieResponse.movie,
    },
    isLoading: false,
  },
};

const brandId = mockShowResponse.show.id;

test('get show content', () => {
  // Given
  const action = createSuccessAPIAction(FETCH_BRAND, mockShowResponse, {
    brandId,
    isShow: true,
  });

  const expectedContentState = createApiSuccessState({
    [brandId]: mockShowResponse.show,
  });

  // when and Then
  const newState = reducer(initialState, action);
  expect(newState.brandById).toEqual(expectedContentState);
});

test('get show content using alternative id.', () => {
  // Given
  const alternativeId = '123';
  const action = createSuccessAPIAction(FETCH_BRAND, mockShowResponse, {
    brandId: alternativeId,
    isShow: true,
  });

  const expectedContentState = createApiSuccessState({
    [alternativeId]: mockShowResponse.show,
  });

  // when and Then
  const newState = reducer(initialState, action);
  expect(newState.brandById).toEqual(expectedContentState);
});

test('get show content (no schedules)', () => {
  // Given
  const action = createSuccessAPIAction(FETCH_BRAND, mockShowResponse, {
    brandId,
    isShow: true,
    needSchedules: false,
  });

  const expectedContentState = createApiSuccessState({
    [brandId]: mockShowResponse.show,
  });

  // when and Then
  const newState = reducer(initialState, action);
  expect(newState.brandById).toEqual(expectedContentState);
});

test('get movie content', () => {
  // Given
  const action = createSuccessAPIAction(FETCH_BRAND, mockMovieResponse, {
    brandId: mockMovieResponse.movie.id,
  });

  const expectedContentState = createApiSuccessState({
    [mockMovieResponse.movie.id]: mockMovieResponse.movie,
  });

  // when and Then
  const newState = reducer(initialState, action);
  expect(newState.brandById).toEqual(expectedContentState);
});

test('get show default episode', () => {
  const defaultEpisode = {
    id: 'skylarkEpisodeUid|epis_d241f92daf8f4dcdbd2e09bcad0e7721',
    season: {
      number: 1,
    },
    number: 2,
    watchProgress: {
      complete: false,
      position: 'PT40M58S',
    },
  };
  // Given
  const action = createSuccessAPIAction(
    FETCH_BRAND,
    {
      show: {
        id: brandId,
        __typename: 'Show',
        defaultEpisode,
      },
    },
    {
      brandId,
      isShow: true,
    },
  );

  // when and Then
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(brandState, action);
  const newShow = newState.brandById.data[brandId] as Show;
  expect(newShow.defaultEpisode).toBe(defaultEpisode);
});

test('get empty movie content', () => {
  // Given
  const action = createSuccessAPIAction(
    FETCH_BRAND,
    { movie: null },
    {
      brandId: mockMovieResponse.movie.id,
    },
  );

  // when and Then
  const newState = reducer(initialState, action);
  expect(newState.brandById).toEqual(initialState.brandById);
});

test("get show's default episode by featch default request", () => {
  // Given
  const defaultEpisode = {
    id: 'skylarkEpisodeUid|epis_d241f92daf8f4dcdbd2e09bcad0e7721',
    season: {
      number: 1,
    },
    number: 2,
    watchProgress: {
      complete: false,
      position: 'PT40M58S',
    },
  };
  const action = createSuccessAPIAction(FETCH_DEFAULT_EPISODE, {
    show: {
      id: brandId,
      __typename: 'Show',
      defaultEpisode,
    },
  });

  // when and Then
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(brandState, action);
  const newShow = newState.brandById.data[brandId] as Show;
  expect(newShow.defaultEpisode).toBe(defaultEpisode);
});

test("get empty show's default episode", () => {
  // Given
  const action = createSuccessAPIAction(FETCH_DEFAULT_EPISODE, { show: null });

  // when and Then
  const newState = reducer(initialState, action);
  expect(newState.brandById).toEqual(initialState.brandById);
});

test('load more highlights successful', () => {
  const showId = mockShowResponse.show.id;

  // request action
  const fetchHighlightsRequestAction = createRequestAPIAction(FETCH_SHOW_HIGHLIGHTS, {
    brandId: showId,
  });
  let expectedHighlightsState = {
    ...(brandState.brandById.data[showId] as any).highlights,
    isLoading: true,
  };
  let newState = reducer(brandState as any, fetchHighlightsRequestAction);
  expect((newState.brandById.data[showId] as any).highlights).toEqual(expectedHighlightsState);

  // success action
  const fetchHighlightsSuccessAction = createSuccessAPIAction(
    FETCH_SHOW_HIGHLIGHTS,
    mockHighlightsResponse,
    {
      brandId: showId,
    },
  );
  expectedHighlightsState = {
    ...(brandState.brandById.data[showId] as any).highlights,
    isLoading: false,
    error: null,
    content: (brandState.brandById.data[showId] as any).highlights.content.concat(
      mockHighlightsResponse.show.highlights.content,
    ),
  };
  newState = reducer(brandState as any, fetchHighlightsSuccessAction);
  expect((newState.brandById.data[showId] as any).highlights).toEqual(expectedHighlightsState);
});

test('load more highlights with failure', () => {
  const showId = mockShowResponse.show.id;

  // Failure action
  const errorPayload = new APIError('Unexpected error occurred', 500);

  const fetchHighlightsFailureAction = createFailureAPIAction(FETCH_SHOW_HIGHLIGHTS, errorPayload, {
    brandId: showId,
  });
  const expectedHighlightsState = {
    ...(brandState.brandById.data[showId] as any).highlights,
    isLoading: false,
    error: errorPayload,
  };
  const newState = reducer(brandState as any, fetchHighlightsFailureAction);
  expect((newState.brandById.data[showId] as any).highlights).toEqual(expectedHighlightsState);
});

test("not save movie assert position when it's null", () => {
  const assetId = 'empty_movie_id';
  const watchProgress = {
    complete: false,
    position: 'PT60M48S',
  };

  // Given
  const action = createSuccessAPIAction(
    SAVE_PLAYBACK_POSITION,
    {
      savePlaybackPosition: watchProgress,
    },
    {
      assetId,
    },
  );

  // when and Then
  const newState = reducer(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    { ...brandState, brandById: { data: { [assetId]: null, ...brandState.brandById.data } } },
    action,
  );
  const newMovie = newState.brandById.data[assetId];

  expect(newMovie).toBe(null);
});

test('select season', () => {
  const seasonId = 'season-1';
  // Given
  const selectSeasonAction = {
    type: SELECT_SEASON,
    payload: {
      brandId,
      selectedSeasonId: seasonId,
    },
  };
  // when and Then
  expect(reducer(initialState, selectSeasonAction)).toEqual({
    ...initialState,
    selectedSeasonByBrandId: {
      ...initialState.selectedSeasonByBrandId,
      [brandId]: seasonId,
    },
  });
});

test('select season with falsy payload', () => {
  // Given
  const selectSeasonAction = {
    type: SELECT_SEASON,
    payload: {
      brandId,
      selectedSeasonId: null,
    },
  };
  // when and Then
  expect(reducer(initialState, selectSeasonAction)).toEqual(initialState);
});

test('add brand to my list', () => {
  // Given
  const action = createSuccessAPIAction(
    MY_LIST,
    {},
    {
      brandId: mockMovieResponse.movie.id,
      isAdded: true,
    },
  );

  const initState = {
    brandById: {
      data: {
        [mockMovieResponse.movie.id]: mockMovieResponse.movie,
      },
      isLoading: false,
    },
    selectedSeasonByBrandId: {},
  };

  const expectedBrandState = {
    [mockMovieResponse.movie.id]: { ...mockMovieResponse.movie, ...{ onMyList: true } },
  };
  const expectedContentState = createApiSuccessState(expectedBrandState);

  // when
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(initState, action);

  // then
  expect(newState.brandById).toEqual(expectedContentState);
});

test("not add brand to my list when it's null", () => {
  // Given
  const assetId = 'empty_movie_id';
  const action = createSuccessAPIAction(
    MY_LIST,
    {},
    {
      brandId: assetId,
      isAdded: true,
    },
  );

  const initState = {
    brandById: {
      data: {
        [assetId]: null,
        [mockMovieResponse.movie.id]: mockMovieResponse.movie,
      },
      isLoading: false,
    },
    selectedSeasonByBrandId: {},
  };

  const expectedBrandState = initState.brandById;

  // when
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const newState = reducer(initState, action);

  // then
  expect(newState.brandById).toEqual(expectedBrandState);
});

test('set brand', () => {
  // Given
  const setBrandAction = {
    type: SET_BRAND,
    payload: mockShowResponse.show,
  };
  // when and Then
  expect(reducer(initialState, setBrandAction)).toEqual({
    ...initialState,
    brandById: {
      data: {
        [mockShowResponse.show.id]: mockShowResponse.show,
      },
      isLoading: false,
    },
  });
});
