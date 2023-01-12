import { createAction } from '@reduxjs/toolkit';
import { createApiInitialState } from '@/utils/api';
import { prop, omit, pluck, values } from 'ramda';
import dayjs from 'dayjs';

import { objFromListWith } from '@/utils/ObjFromListWith';
import { createApiSuccessState, createSuccessAPIAction } from '../../../testUtils/api';
import reducer from '../reducer';
import {
  SET_SELECTED_CHANNEL_ID,
  SET_CHANNEL_BY_ID,
  FETCH_CATEGORIES,
  SET_SELECTED_CATEGORY_ID,
  FETCH_SELECTED_CHANNEL_SLOT,
  CLEAR_SELECTED_CHANNEL_SLOT,
} from '../constants';

const initialState = {
  categoryById: createApiInitialState({}),
  channelsByCategoryId: createApiInitialState({}),
  channelById: {},
  selectedChannelId: '',
  selectedCategoryId: '',
  selectedChannelSlot: {
    data: {},
    isLoading: false,
  },
};

const channelResult = [
  {
    __typename: 'LinearChannel',
    id: 'skylarkChannelUid|chan_e461d91467db40f5b3ed29746a36aa27',
    title: 'Sky Sport 1',
    tileImage: {
      uri:
        'https://images-dev.skyone.co.nz/media/images/stills/channel/5/fd1dfd651a418e1eb9ee9fe2500d4df2.png',
    },
    slot: {
      start: '2020-07-24T02:31:10Z',
      end: '2020-07-24T03:31:10Z',
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
  {
    __typename: 'LinearChannel',
    id: 'skylarkChannelUid|chan_1d7d40916b2f444c9f5f348ff093a0f6',
    title: 'Sky Sport 2',
    tileImage: {
      uri:
        'https://images-dev.skyone.co.nz/media/images/stills/channel/74/e33fd83013f950b60dc95bbc798a785c.png',
    },
    slot: {
      start: '2020-07-24T00:00:00Z',
      end: '2020-07-25T00:00:00Z',
      programme: null,
    },
  },
];

const categoriesResult = {
  channelGroups: [
    {
      id: 'skylarkPlaceholderUid|plac_f1ec35c54e78493aacbf1d6d7f42486f',
      title: 'Recent Channels',
      channels: channelResult,
    },
    {
      id: 'skylarkSetUid|coll_02e60b21c23a4660b3833a48f6c72076',
      title: 'All Channels',
      channels: channelResult,
    },
  ],
};

const slotResult = {
  linearChannel: {
    __typename: 'LinearChannel',
    slot: {
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
  },
};

const detailSlotResult = [
  {
    __typename: 'LinearChannel',
    id: 'skylarkChannelUid|chan_e461d91467db40f5b3ed29746a36aa27',
    title: 'Sky Sport 1',
    tileImage: {
      uri:
        'https://images-dev.skyone.co.nz/media/images/stills/channel/5/fd1dfd651a418e1eb9ee9fe2500d4df2.png',
    },
    slot: {
      start: '2020-07-24T02:31:10Z',
      end: '2020-07-24T03:31:10Z',
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
];

test('fetch all channels & categories', () => {
  const fetchAction = createSuccessAPIAction(FETCH_CATEGORIES, categoriesResult);
  const expectedCategoriesState = createApiSuccessState(
    objFromListWith(prop('id'), categoriesResult.channelGroups.map(omit(['channels']))),
  );
  const expectedChannelsState = createApiSuccessState({
    [categoriesResult.channelGroups[0].id]: pluck('id', channelResult),
    [categoriesResult.channelGroups[1].id]: pluck('id', channelResult),
  });
  // When - invoke reducer, Then - verify state

  expect(reducer(initialState, fetchAction)).toEqual({
    ...initialState,
    categoryById: expectedCategoriesState,
    channelsByCategoryId: expectedChannelsState,
  });
});

test('Set selected channel id', () => {
  const action = createAction<string>(SET_SELECTED_CHANNEL_ID)('1');
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    selectedChannelId: '1',
  });
});

test('Set selected category id', () => {
  const action = createAction<string>(SET_SELECTED_CATEGORY_ID)('1');
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    selectedCategoryId: '1',
  });
});

test('set channel by id', () => {
  const action = createAction<any>(SET_CHANNEL_BY_ID)({ channels: channelResult });

  const channel = channelResult[0];

  // When - invoke reducer, Then - verify state
  const newState = reducer(initialState, action);
  expect(newState.channelById[channel.id]).toStrictEqual(channel);

  // reference will not change when reducer with same data
  const newState1 = reducer(newState, action);
  expect(newState1.channelById[channel.id]).toStrictEqual(newState.channelById[channel.id]);
});

test('set channel by id from fetchChannelSlots', () => {
  const channel = channelResult[0];

  const action = createAction<any>(SET_CHANNEL_BY_ID)({ channels: detailSlotResult });

  const newState = reducer(initialState, action);
  expect(newState.channelById[channel.id].id).toStrictEqual(channel.id);

  const newState1 = reducer(newState, action);
  expect(newState1.channelById[channel.id].slot).toStrictEqual(
    newState.channelById[channel.id].slot,
  );
});

test('fetch slot', () => {
  const now = dayjs();
  const fetchAction = createSuccessAPIAction(FETCH_SELECTED_CHANNEL_SLOT, slotResult, {
    at: now,
  });

  // When - invoke reducer, Then - verify state
  const newState = reducer(initialState, fetchAction);
  expect(newState.selectedChannelSlot.data.slot).toBe(slotResult.linearChannel.slot);
});

test('clear channel slot', () => {
  const clearAction = createAction<any>(CLEAR_SELECTED_CHANNEL_SLOT)({});

  // When - invoke reducer, Then - verify state
  const newState = reducer(initialState, clearAction);
  expect(newState.selectedChannelSlot.data).toEqual({});
});

test('override channels', () => {
  const action = createAction<any>(SET_CHANNEL_BY_ID)({ channels: channelResult, override: true });
  const newState = reducer(initialState, action);
  expect(newState.channelById).toStrictEqual(objFromListWith(prop('id'), channelResult));

  // remove the channel[0] from the list
  const action2 = createAction<any>(SET_CHANNEL_BY_ID)({
    channels: channelResult.slice(1),
    override: true,
  });
  const newState2 = reducer(newState, action2);
  // channel[0] should be removed from the state
  expect(newState2.channelById[channelResult[0].id]).toBeUndefined();

  const action3 = createAction<any>(SET_CHANNEL_BY_ID)({
    channels: channelResult,
    override: true,
  });
  // add the channel[0] back to the list
  const newState3 = reducer(newState, action3);
  // channel[0] should be added back to the state
  expect(newState3.channelById[channelResult[0].id]).toStrictEqual(channelResult[0]);

  // change the order of the channel list
  const newChannelList = [...channelResult].reverse();

  const action4 = createAction<any>(SET_CHANNEL_BY_ID)({
    channels: newChannelList,
    override: true,
  });

  const newState4 = reducer(newState3, action4);
  // channels should be in the same order as the newChannelList
  expect(values(newState4.channelById)).toStrictEqual(newChannelList);
});
