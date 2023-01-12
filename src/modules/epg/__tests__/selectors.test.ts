import { prop } from 'ramda';
import dayjs from 'dayjs';

import { createApiInitialState } from '@/utils/api';
import { objFromListWith } from '@/utils/ObjFromListWith';

import { channelsResult, futureSlots, slotResult, slots } from './testData';

import {
  slotsByChannelIdIsLoading,
  getSlotsByChannelId,
  getSlotsByCategoryId,
  getSlotsByTimeRange,
  isSlotsOutsideTimeRange,
  slotsByChannelIdError,
  selectedSlot,
  selectedSlotError,
  selectedSlotIsLoading,
  selectedSlotChannel,
  allSlots,
} from '../selectors';

const categoryA = {
  id: '/api/sets/coll_02e60b21c23a4660b3833a48f6c72076/',
  title: 'All Channels',
};

const { channels } = channelsResult;
const channelA = channels[0];
const channelB = channels[1];
const selectedSlotData = slotResult.linearChannel.slot;

const initialState = {
  channels: {
    channelsByCategoryId: createApiInitialState({
      [categoryA.id]: [channelA.id, channelB.id],
    }),
    channelById: objFromListWith(prop('id'), [channelA, channelB]),
  },
  epg: {
    slotsByChannelId: createApiInitialState({
      [channelA.id]: slots,
      [channelB.id]: futureSlots,
    }),
    selectedSlot: createApiInitialState(selectedSlotData),
  },
} as any;

describe('slotsByChannelIdError', () => {
  it('should return a valid object', () => {
    expect(slotsByChannelIdError(initialState)).toEqual(undefined);
  });
});

describe('slotsByChannelIdIsloading', () => {
  it('should return a valid boolean', () => {
    // initial state is false
    expect(slotsByChannelIdIsLoading(initialState)).toBeFalsy();
  });

  it('should return true if its loading', () => {
    expect(slotsByChannelIdIsLoading.resultFunc(true)).toEqual(true);
  });

  it.each([false])('should return false for falsy inputs', output => {
    expect(slotsByChannelIdIsLoading.resultFunc(output)).toEqual(false);
  });
});

test('get all slots', () => {
  expect(allSlots(initialState)).toEqual({
    [channelA.id]: slots,
    [channelB.id]: futureSlots,
  });
});

test('get slots by channel id', () => {
  // get all categories with order
  const slotsList = getSlotsByChannelId(initialState)(channelA.id);
  expect(slotsList).toBe(slots);

  expect(getSlotsByChannelId(initialState)(channelB.id)).toBe(futureSlots);

  // Change initial state
  const newSlots = slots.concat(futureSlots.slice(1));
  const from = newSlots[1].start; // '2020-08-03T08:31:10Z'
  const to = newSlots[3].end; // '2020-08-03T12:31:10Z'
  initialState.epg.slotsByChannelId.data[channelB.id] = newSlots;

  // get selected channel slots
  const expectSlots = newSlots.slice(1, 4);

  expect(getSlotsByChannelId(initialState)(channelB.id, from, to)).toEqual(expectSlots);
});

test('get slots by category id', () => {
  // get selected channel slots
  expect(getSlotsByCategoryId(initialState)(categoryA.id)).toEqual([slots, futureSlots]);
});

test('get slots by time range', () => {
  // Change initial state
  const newSlots = slots.concat(futureSlots.slice(1));
  const from = newSlots[1].start; // '2020-08-03T08:31:10Z'
  const to = newSlots[3].end; // '2020-08-03T12:31:10Z'
  initialState.epg.slotsByChannelId.data[channelB.id] = newSlots;

  // get selected channel slots
  const expectSlots = [slots.slice(1), newSlots.slice(1, 4)];

  expect(getSlotsByTimeRange(initialState)(categoryA.id, from, to)).toEqual(expectSlots);
});

describe('isSlotsOutsideTimeRange', () => {
  it.each([
    {
      from: slots[1].start,
      to: slots[2].start,
      result: true,
    },
    {
      from: dayjs(futureSlots[2].end).add(2, 'hour').toISOString(),
      to: slots[2].start,
      result: true,
    },
    {
      from: dayjs(slots[0].end).subtract(3, 'hour').toISOString(),
      to: slots[2].start,
      result: true,
    },
    {
      from: dayjs(slots[0].end).subtract(3, 'hour').toISOString(),
      to: dayjs(slots[0].end).add(2, 'hour').toISOString(),
      result: true,
    },
    {
      from: slots[1].end,
      to: dayjs(futureSlots[2].end).add(2, 'hour').toISOString(),
      result: true,
    },
  ])('should return the correct value', ({ from, to, result }) => {
    expect(isSlotsOutsideTimeRange(initialState)(categoryA.id, from, to)).toEqual(result);
  });
});

test('get selectedSlot', () => {
  // get selected slot
  expect(selectedSlot(initialState)).toEqual(selectedSlotData);
});

test('get selectedSlotChannel', () => {
  // get selected selectedSlotChannel
  expect(selectedSlotChannel(initialState)).toEqual(selectedSlotData.channel);
});

test('get selectedSlotIsLoading', () => {
  // get selected selectedSlotIsLoading
  expect(selectedSlotIsLoading(initialState)).toEqual(false);
});

test('get selectedSlotError', () => {
  // get selected selectedSlotError
  expect(selectedSlotError(initialState)).toEqual(undefined);
});
