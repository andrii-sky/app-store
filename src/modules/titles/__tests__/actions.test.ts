import { MockStore } from 'redux-mock-store';

import graphQLClient from '@/middleware/api/clients/graphQLClient';

import { init } from '../../..';
import { APIError } from '../../../errors';
import {
  addToMyList,
  fetchBrand,
  removeFromMyList,
  selectSeason,
  savePlaybackPosition,
  setBrand,
  fetchShowHighlights,
} from '../actions';
import {
  MY_LIST,
  FETCH_BRAND,
  SELECT_SEASON,
  SAVE_PLAYBACK_POSITION,
  SET_BRAND,
  FETCH_SHOW_HIGHLIGHTS,
} from '../constants';
import {
  createFailureAPIActions,
  createSuccessAPIActions,
  createRequestAPIAction,
  createApiSuccessState,
} from '../../../testUtils/api';
import { mockShowResponse, mockMovieResponse, mockHighlightsResponse } from './testData';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore({
  titles: {
    brandById: createApiSuccessState({}),
  },
}) as unknown) as MockStore;

const brandId = 'epis_9898e5793b2e4b16b3f059901c08920b';

describe('show content actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch show data from api with success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockShowResponse);

    const expectedActions = createRequestAPIAction(FETCH_BRAND, {
      isShow: true,
      brandId,
    });

    store.dispatch(fetchBrand(brandId, true) as any);

    expect(store.getActions()).toEqual([expectedActions]);
  });

  test('fetch show data from api with success (no episodes)', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockShowResponse);

    const expectedActions = createRequestAPIAction(FETCH_BRAND, {
      isShow: true,
      brandId,
    });

    store.dispatch(fetchBrand(brandId, true, undefined, true, false, true) as any);

    expect(store.getActions()).toEqual([expectedActions]);
  });

  test('fetch show data from api with success (no schedules)', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockShowResponse);

    const expectedActions = createRequestAPIAction(FETCH_BRAND, {
      isShow: true,
      brandId,
    });

    store.dispatch(fetchBrand(brandId, true, undefined, false, true, true) as any);

    expect(store.getActions()).toEqual([expectedActions]);
  });

  test('fetch show data from api with success (no slots)', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockShowResponse);

    const expectedActions = createRequestAPIAction(FETCH_BRAND, {
      isShow: true,
      brandId,
    });

    store.dispatch(fetchBrand(brandId, true, undefined, false, false, false) as any);

    expect(store.getActions()).toEqual([expectedActions]);
  });

  test('fetch show highlights data from api success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockHighlightsResponse);
    const showId = 'fakeShowId';
    const expectedActions = createSuccessAPIActions(FETCH_SHOW_HIGHLIGHTS, mockHighlightsResponse, {
      brandId: showId,
    });

    await store.dispatch(fetchShowHighlights(showId) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch movie data from api with success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockMovieResponse);

    const expectedActions = createRequestAPIAction(FETCH_BRAND, {
      isShow: false,
      brandId,
    });

    store.dispatch(fetchBrand(brandId, false, undefined, true) as any);

    expect(store.getActions()).toEqual([expectedActions]);
  });

  test('fetch movie data from api with success (including schedules)', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockMovieResponse);

    const expectedActions = createRequestAPIAction(FETCH_BRAND, {
      isShow: false,
      brandId,
    });

    store.dispatch(fetchBrand(brandId, false, undefined, false) as any);

    expect(store.getActions()).toEqual([expectedActions]);
  });

  test('add my list success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({ data: {} });

    const expectedActions = createSuccessAPIActions(
      MY_LIST,
      {},
      {
        brandId,
        isAdded: true,
      },
    );

    await store.dispatch(addToMyList(brandId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('remove from my list success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({ data: {} });

    const expectedActions = createSuccessAPIActions(
      MY_LIST,
      {},
      {
        brandId,
        isAdded: false,
      },
    );

    await store.dispatch(removeFromMyList(brandId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('select season', async () => {
    const seasonId = 'season-1';
    const expectedActions = [
      {
        type: SELECT_SEASON,
        payload: {
          brandId,
          selectedSeasonId: seasonId,
        },
      },
    ];

    store.dispatch(selectSeason(brandId, seasonId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('save playback position failure', async () => {
    const error = {
      errors: [
        {
          message: "Variable 'position' has an invalid value : null",
        },
      ],
      data: null,
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);
    const expectedActions = createFailureAPIActions(
      SAVE_PLAYBACK_POSITION,
      new APIError('', undefined),
      {
        assetId: 'no_id',
      },
    );

    // when
    await store.dispatch(savePlaybackPosition('no_id', 0));

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('save playback position success', async () => {
    const response = {
      data: {
        saveAssetPosition: {
          position: 'PT40M58S',
        },
      },
    };
    (graphQLClient as jest.Mock).mockResolvedValue(response);
    // const expectedActions = createSuccessAPIActions(SAVE_PLAYBACK_POSITION, response.data);
    const expectedActions = createSuccessAPIActions(SAVE_PLAYBACK_POSITION, response.data, {
      assetId: 'skylarkMediaAssetUid|asse_17e52a9c13bd4cce9758429cb3fb4b0c',
    });

    // when
    await store.dispatch(
      savePlaybackPosition('skylarkMediaAssetUid|asse_17e52a9c13bd4cce9758429cb3fb4b0c', 1655),
    );

    // then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set brand', async () => {
    // setup

    store.dispatch(setBrand(mockShowResponse.show));

    const expectedActions = [
      {
        type: SET_BRAND,
        payload: mockShowResponse.show,
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
