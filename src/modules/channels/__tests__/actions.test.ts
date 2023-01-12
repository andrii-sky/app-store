import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { F, mergeDeepRight, T } from 'ramda';
import dayjs from 'dayjs';

import { init } from '../../..';
import {
  SET_SELECTED_CHANNEL_ID,
  SET_SELECTED_CATEGORY_ID,
  SET_CHANNEL_BY_ID,
  FETCH_CATEGORIES,
  SAVE_RECENT_CHANNEL,
  FETCH_SELECTED_CHANNEL_SLOT,
  CLEAR_SELECTED_CHANNEL_SLOT,
  FETCH_CHANNELS_BY_CATEGORY_ID,
} from '../constants';
import {
  setSelectedChannelId,
  fetchCategories,
  changeChannel,
  setSelectedCategoryId,
  fetchSelectedChannelSlot,
  clearSelectedChannelSlot,
  fetchChannelsByCategoryId,
  updateNewSlot,
  calculateOffset,
} from '../actions';
import {
  createFailureAPIActions,
  createRequestAPIAction,
  createSuccessAPIActions,
} from '../../../testUtils/api';
import APIError from '../../../errors/APIError';

jest.mock('dayjs');
jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

(dayjs as any).mockReturnValue({
  toISOString: () => 'test',
});

const initialState = {
  channels: {
    channels: {
      data: [],
      error: undefined,
      isLoading: false,
    },
    selectedChannelId: 'test-channel',
    selectedCategoryId: undefined,
    selectedChannelSlot: {
      data: {
        slot: {
          start: '2020-07-24T00:31:10',
          end: '2020-07-24T01:31:10',
        },
      },
      isLoading: false,
    },
  },
} as any;
const { createStore } = init();
const store = (createStore(initialState) as unknown) as MockStore;

const categoriesResult = [
  {
    id: '/api/placeholders/plac_f1ec35c54e78493aacbf1d6d7f42486f/',
    title: 'Recent Channels',
    position: 1,
  },
  {
    id: '/api/sets/coll_02e60b21c23a4660b3833a48f6c72076/',
    title: 'All Channels',
    position: 2,
  },
  {
    id: '/api/sets/coll_d14f15b69c9141a099c0c22aad48428c/',
    title: 'Sports',
    position: 3,
  },
];

const channelsResult = {
  linearChannelGroup: {
    channels: [
      {
        __typename: 'LinearChannel',
        id: 'skylarkChannelUid|chan_e461d91467db40f5b3ed29746a36aa27',
        title: 'Sky Sport 1',
        tileImage: {
          uri:
            'https://images-dev.skyone.co.nz/media/images/stills/channel/5/fd1dfd651a418e1eb9ee9fe2500d4df2.png',
        },
        slot: {
          start: '2020-07-26T21:31:10Z',
          end: '2020-07-26T22:31:10Z',
          programme: {
            __typename: 'LinearProgramme',
            title: 'Investec Super Rugby S2020 E17',
            rating: {
              __typename: 'Rating',
              classification: '_G',
              advisories: [],
            },
          },
        },
      },
    ],
  },
};

const channelResult = {
  linearChannel: {
    __typename: 'LinearChannel',
    slots: [
      {
        start: '2020-07-24T00:31:10Z',
        end: '2020-07-24T01:31:10Z',
        programme: {
          __typename: 'LinearProgramme',
          title: 'The Breakdown S2020 E10',
          rating: {
            __typename: 'Rating',
            classification: '_G',
            advisories: [],
          },
        },
      },
    ],
  },
};

const fetchCategoriesResult = {
  channelGroups: [
    {
      channels: [
        {
          __typename: 'LinearChannel',
          id: 'skylarkChannelUid|chan_e461d91467db40f5b3ed29746a36aa27',
          title: 'Sky Sport 1',
          tileImage: {
            uri:
              'https://images-dev.skyone.co.nz/media/images/stills/channel/5/fd1dfd651a418e1eb9ee9fe2500d4df2.png',
          },
          slot: {
            start: '2020-07-26T21:31:10Z',
            end: '2020-07-26T22:31:10Z',
            programme: {
              __typename: 'LinearProgramme',
              title: 'Investec Super Rugby S2020 E17',
              rating: {
                __typename: 'Rating',
                classification: '_G',
                advisories: [],
              },
            },
          },
        },
      ],
    },
  ],
};

describe('channels actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch categories with success', async () => {
    (graphQLClient as jest.Mock).mockResolvedValue(fetchCategoriesResult);

    const expectedActions = [
      ...createSuccessAPIActions(FETCH_CATEGORIES, fetchCategoriesResult),
      {
        type: SET_CHANNEL_BY_ID,
        payload: { channels: fetchCategoriesResult.channelGroups[0].channels, override: true },
      },
    ];
    await store.dispatch(fetchCategories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch categories with failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };

    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      FETCH_CATEGORIES,
      new APIError(error.message, error.status),
    );

    await store.dispatch(fetchCategories());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch channels by category id with success', async () => {
    const categoryId = categoriesResult[0].id;

    (graphQLClient as jest.Mock).mockResolvedValue(channelsResult);

    const expectedActions = [
      ...createSuccessAPIActions(FETCH_CHANNELS_BY_CATEGORY_ID, channelsResult, { categoryId }),
      {
        type: SET_CHANNEL_BY_ID,
        payload: { channels: channelsResult.linearChannelGroup.channels },
      },
    ];
    await store.dispatch(fetchChannelsByCategoryId(categoryId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch channels by category id with failure', async () => {
    const categoryId = categoriesResult[0].id;
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      FETCH_CHANNELS_BY_CATEGORY_ID,
      new APIError(error.message, error.status),
      { categoryId },
    );

    await store.dispatch(fetchChannelsByCategoryId(categoryId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set selected channel id', async () => {
    const channelId = '1';
    const expectedActions = [
      {
        type: SET_SELECTED_CHANNEL_ID,
        payload: '1',
      },
    ];

    store.dispatch(setSelectedChannelId(channelId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('save recent channel with success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue({});

    const expectedActions = [
      {
        type: SET_SELECTED_CHANNEL_ID,
        payload: 'channelId',
      },
      ...createSuccessAPIActions(SAVE_RECENT_CHANNEL, {}),
    ];

    await store.dispatch(changeChannel('channelId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set selected category id', async () => {
    const categoryId = '1';

    const expectedActions = [
      {
        type: SET_SELECTED_CATEGORY_ID,
        payload: '1',
      },
    ];

    store.dispatch(setSelectedCategoryId(categoryId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch slots with success', async () => {
    const channelId = 'channelId';

    (graphQLClient as jest.Mock).mockResolvedValue(channelResult);

    (dayjs as any).mockReturnValue({
      subtract: () => 'test subtracted dayjs object',
      toISOString: () => 'test',
      isBetween: F,
    });

    const expectedActions = createSuccessAPIActions(FETCH_SELECTED_CHANNEL_SLOT, channelResult);

    await store.dispatch(fetchSelectedChannelSlot(channelId, 10));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch slots with negative offset', async () => {
    const channelId = 'channelId';

    (graphQLClient as jest.Mock).mockResolvedValue(channelResult);

    (dayjs as any).mockReturnValue({
      subtract: () => 'test subtracted dayjs object',
      toISOString: () => 'test',
      isBetween: F,
    });

    const expectedActions = createSuccessAPIActions(FETCH_SELECTED_CHANNEL_SLOT, channelResult);

    await store.dispatch(fetchSelectedChannelSlot(channelId, -5));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch slots with full channel detail', async () => {
    const channelId = 'channelId';

    (graphQLClient as jest.Mock).mockResolvedValue(channelResult);

    (dayjs as any).mockReturnValue({
      subtract: () => 'test subtracted dayjs object',
      toISOString: () => 'test',
      isBetween: F,
    });

    await store.dispatch(fetchSelectedChannelSlot(channelId, 0, true));

    const expectedActions = [
      ...createSuccessAPIActions(FETCH_SELECTED_CHANNEL_SLOT, channelResult),
      {
        type: SET_CHANNEL_BY_ID,
        payload: { channels: [channelResult.linearChannel] },
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('clear channel slots', async () => {
    const expectedActions = [
      {
        type: CLEAR_SELECTED_CHANNEL_SLOT,
        payload: {},
      },
    ];

    await store.dispatch(clearSelectedChannelSlot() as any);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('update slot when currentTime is not in slot time range', async () => {
    (dayjs as any).mockReturnValue({
      subtract: () => dayjs(),
      isBetween: F,
    });
    // When call it as seek is true, and currentTime is before lastCurrentTime + nextSlotTime
    await store.dispatch(updateNewSlot(130, 300) as any);
    expect(store.getActions()).toEqual([
      {
        ...createRequestAPIAction(FETCH_SELECTED_CHANNEL_SLOT),
      },
    ]);
  });

  test('update slot when current time between selected slot time range', async () => {
    (dayjs as any).mockReturnValue({
      subtract: () => dayjs(),
      isBetween: T,
    });
    // seek between current slot time range will not send any query
    await store.dispatch(updateNewSlot(130, 300) as any);
    expect(store.getActions()).toEqual([]);
  });

  test('update slot when there is slot available yet', async () => {
    const newState = mergeDeepRight(initialState, {
      channels: {
        selectedChannelSlot: {
          data: {
            slot: null,
          },
          isLoading: false,
        },
      },
    } as any);
    const newStore = (createStore(newState) as unknown) as MockStore;
    await newStore.dispatch(updateNewSlot(130, 300) as any);
    expect(store.getActions()).toEqual([]);
  });

  test('can update slot with excessive offset', async () => {
    (dayjs as any).mockReturnValue({
      subtract: () => dayjs(),
      isBetween: F,
    });

    await store.dispatch(updateNewSlot(130, 10000) as any);

    expect(store.getActions()).toEqual([
      {
        ...createRequestAPIAction(FETCH_SELECTED_CHANNEL_SLOT),
      },
    ]);
  });

  test('dont update slot with undefined value', async () => {
    (dayjs as any).mockReturnValue({
      subtract: () => dayjs(),
      isBetween: F,
    });
    await store.dispatch(updateNewSlot(130, undefined as any) as any);
    expect(store.getActions()).toEqual([]);
  });

  test('guarantee lower boundary for infinite negative offset', async () => {
    const offset = calculateOffset(Number.POSITIVE_INFINITY, 10);
    expect(offset).toEqual(0);
  });

  test('guarantee lower boundary for infinite negative offset 2', async () => {
    const offset = calculateOffset(42, Number.NEGATIVE_INFINITY);
    expect(offset).toEqual(0);
  });

  test('guarantee upper boundary for infinite positive offset', async () => {
    const offset = calculateOffset(Number.NEGATIVE_INFINITY, 10);
    expect(offset).toEqual(7200);
  });

  test('guarantee lower boundary for infinite positive offset 2', async () => {
    const offset = calculateOffset(42, Number.POSITIVE_INFINITY);
    expect(offset).toEqual(7200);
  });

  test('returns NaN for undefined values', async () => {
    const offset = calculateOffset(42, undefined as any);
    expect(Number.isNaN(offset)).toBeTruthy();
  });

  test('excessive positive offset is limited to 7200', async () => {
    const offset = calculateOffset(0, 2000000);
    expect(offset).toEqual(7200);
  });

  test('negative offset is limited to 0', async () => {
    const offset = calculateOffset(100, 0);
    expect(offset).toEqual(0);
  });
});
