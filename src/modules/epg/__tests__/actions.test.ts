import { MockStore } from 'redux-mock-store';
import { prop } from 'ramda';

import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { createApiInitialState } from '@/utils/api';
import { objFromListWith } from '@/utils/ObjFromListWith';

import { init } from '../../..';
import {
  CLEAR_SELECTED_SLOT,
  FETCH_SLOTS_BY_TIME_RANGE,
  FETCH_SLOT_BY_START_TIME,
} from '../constants';
import { fetchSlotsByTimeRange, fetchSlotByStartTime, clearSelectedSlot } from '../actions';
import { createSuccessAPIActions } from '../../../testUtils/api';
import { channelsResult, slots, futureSlots, slotResult } from './testData';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const categoryA = {
  id: '/api/sets/coll_02e60b21c23a4660b3833a48f6c72076/',
  title: 'All Channels',
};

const { channels } = channelsResult;
const channelA = channels[0];
const channelB = channels[1];

const initialState = {
  channels: {
    channelsByCategoryId: createApiInitialState({
      [categoryA.id]: [channelA.id, channelB.id],
    }),
    channelById: objFromListWith(prop('id'), [channelA, channelB]),
  },
  epg: {
    slotsByChannelId: createApiInitialState({}),
    selectedSlot: createApiInitialState(null),
  },
};

const { createStore } = init();
const store = (createStore(initialState) as unknown) as MockStore;

describe('channels actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch channels slots by category id and time range with success', async () => {
    (graphQLClient as jest.Mock).mockResolvedValue(channelsResult);

    const from = slots[1].start;
    const to = futureSlots[1].start;

    const expectedActions = createSuccessAPIActions(FETCH_SLOTS_BY_TIME_RANGE, channelsResult, {
      isOverride: undefined,
    });
    await store.dispatch(fetchSlotsByTimeRange(from, to));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch a specific slot by startTime with success', async () => {
    (graphQLClient as jest.Mock).mockResolvedValue(slotResult);

    const from = slotResult.linearChannel.slot.start;

    const expectedActions = createSuccessAPIActions(FETCH_SLOT_BY_START_TIME, slotResult);

    await store.dispatch(fetchSlotByStartTime(channelA.id, from, false) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('clear selected slot', async () => {
    const expectedActions = [
      {
        type: CLEAR_SELECTED_SLOT,
        payload: {},
      },
    ];

    await store.dispatch(clearSelectedSlot() as any);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
