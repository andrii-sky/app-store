import { createApiInitialState } from '@/utils/api';

import { createAction } from '@reduxjs/toolkit';
import { createSuccessAPIAction } from '../../../testUtils/api';
import reducer from '../reducer';
import {
  CLEAR_SELECTED_SLOT,
  FETCH_SLOTS_BY_TIME_RANGE,
  FETCH_SLOT_BY_START_TIME,
} from '../constants';
import { channelsResult, futureSlots, slotResult } from './testData';

const initialState = {
  slotsByChannelId: createApiInitialState({}),
  selectedSlot: createApiInitialState(null),
};

test('fetch slots by a time range', () => {
  const { channels } = channelsResult;
  const expectedChannelA = channels[0];
  const expectedChannelB = channels[1];
  const expectedSlotsA = [...expectedChannelA.slots];
  const expectedSlotsB = [...expectedChannelB.slots];

  // When - invoke reducer, Then - verify state
  const action = createSuccessAPIAction(FETCH_SLOTS_BY_TIME_RANGE, channelsResult);

  const newState = reducer(initialState, action);
  expect(newState.slotsByChannelId.data[expectedChannelA.id]).toStrictEqual(expectedChannelA.slots);
  expect(newState.slotsByChannelId.data[expectedChannelB.id]).toStrictEqual(expectedChannelB.slots);

  // When - new slots the same as current last slot
  const actionWithTimeRange = createSuccessAPIAction(FETCH_SLOTS_BY_TIME_RANGE, {
    channels: channels.map(channel => ({
      ...channel,
      slots: futureSlots,
    })),
  });

  expectedSlotsA.splice(2, 1, ...futureSlots);
  expectedSlotsB.splice(2, 1, ...futureSlots);

  let nextState = reducer(newState, actionWithTimeRange);
  expect(nextState.slotsByChannelId.data[expectedChannelA.id]).toStrictEqual(expectedSlotsA);
  expect(nextState.slotsByChannelId.data[expectedChannelB.id]).toStrictEqual(expectedSlotsB);

  // When - new slots is in the future
  const newSlots = [
    {
      start: '2020-08-04T11:31:10Z',
      end: '2020-08-04T12:31:10Z',
    },
    {
      start: '2020-08-04T12:31:10Z',
      end: '2020-08-04T13:31:10Z',
    },
  ];
  let actionWithFuture = createSuccessAPIAction(FETCH_SLOTS_BY_TIME_RANGE, {
    channels: channels.map(channel => ({
      ...channel,
      slots: newSlots,
    })),
  });

  expectedSlotsA.push(...newSlots);
  expectedSlotsB.push(...newSlots);

  nextState = reducer(nextState, actionWithFuture);

  expect(nextState.slotsByChannelId.data[expectedChannelA.id]).toEqual(expectedSlotsA);
  expect(nextState.slotsByChannelId.data[expectedChannelB.id]).toEqual(expectedSlotsB);

  // When - new slots is the same as current time range
  actionWithFuture = createSuccessAPIAction(FETCH_SLOTS_BY_TIME_RANGE, {
    channels: channels.map(channel => ({
      ...channel,
      slots: newSlots,
    })),
  });
  nextState = reducer(nextState, actionWithFuture);

  expect(nextState.slotsByChannelId.data[expectedChannelA.id]).toEqual(expectedSlotsA);
  expect(nextState.slotsByChannelId.data[expectedChannelB.id]).toEqual(expectedSlotsB);

  // When - the backend's response returns empty linearChannelGroup
  actionWithFuture = createSuccessAPIAction(FETCH_SLOTS_BY_TIME_RANGE, {
    channels: [],
  });

  nextState = reducer(nextState, actionWithFuture);
  expect(nextState.slotsByChannelId.data[expectedChannelA.id]).toEqual(expectedSlotsA);
  expect(nextState.slotsByChannelId.data[expectedChannelB.id]).toEqual(expectedSlotsB);
});

test('fetch slots inside current slots time range', () => {
  const { channels } = channelsResult;
  const expectedChannelA = channels[0];
  const expectedChannelB = channels[1];
  const slotsWithDifferentTimeRange = [
    {
      start: '2020-08-04T10:30:10Z',
      end: '2020-08-04T11:00:10Z',
    },
    {
      start: '2020-08-04T11:00:10Z',
      end: '2020-08-04T11:30:10Z',
    },
    {
      start: '2020-08-04T14:00:10Z',
      end: '2020-08-04T14:30:10Z',
    },
    {
      start: '2020-08-04T14:30:10Z',
      end: '2020-08-04T15:30:10Z',
    },
  ];

  const state = {
    slotsByChannelId: createApiInitialState({
      [expectedChannelA.id]: slotsWithDifferentTimeRange,
      [expectedChannelB.id]: slotsWithDifferentTimeRange,
    }),
  };

  // When - the new slots is inside the current slots time range
  let newSlots = [
    {
      start: '2020-08-04T11:30:10Z',
      end: '2020-08-04T12:00:10Z',
    },
    {
      start: '2020-08-04T12:00:10Z',
      end: '2020-08-04T12:30:10Z',
    },
  ];
  let actionWithTimeRange = createSuccessAPIAction(FETCH_SLOTS_BY_TIME_RANGE, {
    channels: channels.map(channel => ({
      ...channel,
      slots: newSlots,
    })),
  });

  const expectedSlots = [...slotsWithDifferentTimeRange];
  expectedSlots.splice(2, 0, ...newSlots);

  let nextState = reducer(state as any, actionWithTimeRange);
  expect(nextState.slotsByChannelId.data[expectedChannelA.id]).toEqual(expectedSlots);
  expect(nextState.slotsByChannelId.data[expectedChannelB.id]).toEqual(expectedSlots);

  // When - the new slots is inside the current slots time range, and partial same to existing slot
  newSlots = [
    {
      start: '2020-08-04T12:00:10Z',
      end: '2020-08-04T12:30:10Z',
    },
    {
      start: '2020-08-04T12:30:10Z',
      end: '2020-08-04T13:00:10Z',
    },
    {
      start: '2020-08-04T13:00:10Z',
      end: '2020-08-04T14:00:10Z',
    },
    {
      start: '2020-08-04T14:00:10Z',
      end: '2020-08-04T14:30:10Z',
    },
  ];
  actionWithTimeRange = createSuccessAPIAction(FETCH_SLOTS_BY_TIME_RANGE, {
    channels: channels.map(channel => ({
      ...channel,
      slots: newSlots,
    })),
  });

  expectedSlots.splice(
    4,
    0,
    ...[
      {
        start: '2020-08-04T12:30:10Z',
        end: '2020-08-04T13:00:10Z',
      },
      {
        start: '2020-08-04T13:00:10Z',
        end: '2020-08-04T14:00:10Z',
      },
    ],
  );

  nextState = reducer(nextState, actionWithTimeRange);
  expect(nextState.slotsByChannelId.data[expectedChannelA.id]).toEqual(expectedSlots);
  expect(nextState.slotsByChannelId.data[expectedChannelB.id]).toEqual(expectedSlots);
});

test('fetch slot by start time', () => {
  const fetchAction = createSuccessAPIAction(FETCH_SLOT_BY_START_TIME, slotResult);

  // When - invoke reducer, Then - verify state
  const nextState = reducer(initialState, fetchAction);
  expect(nextState.selectedSlot.data).toBe(slotResult.linearChannel.slot);
});

test('clear selected slot', () => {
  const clearAction = createAction<any>(CLEAR_SELECTED_SLOT)({});

  // When - invoke reducer, Then - verify state
  const newState = reducer(initialState, clearAction);
  expect(newState.selectedSlot.data).toEqual(null);
});
