import dayjs from 'dayjs';
import { mergeDeepRight } from 'ramda';
import { ShowType, LinearSlot } from '@/types/graph-ql';
import { LiveStatus } from '@/types/enums/LiveStatus';

import { BrandType } from '@/types/enums';
import {
  isShow,
  isSport,
  formatRating,
  getSlotTitle,
  DEFAULT_SLOT_TITLE,
  getSportLiveStatusByTime,
  isSlotOnAir,
  isFinished,
  isRecordable,
} from '../Slot';

test('check whether the slot belongs to a show or not', () => {
  // Given
  const mockSlot: any = {
    programme: {
      __typename: 'Episode',
      id: 'skylarkEpisodeUid|epis_354e77b42b8446b499520b2dff0fecc9',
      title: 'MLS LIVE Episode',
    },
  };
  // When it belongs to a show.
  let result = isShow(mockSlot);
  // Then
  expect(result).toBeTruthy();

  // When it belongs to a movie.
  const movieSlot: any = mergeDeepRight(mockSlot, { programme: { __typename: BrandType.Movie } });
  result = isShow(movieSlot);
  // Then
  expect(result).toBeFalsy();
});

test('check whether the slot belongs to a sport show or not', () => {
  // Given
  const mockSlot: any = {
    programme: {
      __typename: 'Episode',
      id: 'skylarkEpisodeUid|epis_354e77b42b8446b499520b2dff0fecc9',
      title: 'MLS LIVE Episode',
      show: {
        __typename: BrandType.Show,
        id: 'skylarkBrandUid|bran_eb179d6b79084f4f86432f8305e2777a',
        title: 'MLS LIVE',
        primaryGenres: [],
        type: ShowType.Series,
      },
    },
  };
  // When it belongs to a series show.
  let result = isSport(mockSlot);
  // Then
  expect(result).toBeFalsy();

  // When it belongs to a sport show.
  const sportSlot: any = mergeDeepRight(mockSlot, {
    programme: { show: { type: ShowType.Sport } },
  });
  result = isShow(sportSlot);
  // Then
  expect(result).toBeTruthy();
});

test('get the slot title for EPG', () => {
  // Given
  const mockSlot: any = {
    start: '2020-07-24T02:31:10Z',
    end: '2020-07-24T03:31:10Z',
    programme: {
      __typename: 'Episode',
      id: 'skylarkEpisodeUid|epis_354e77b42b8446b499520b2dff0fecc9',
      title: 'MLS LIVE Episode',
      show: {
        __typename: 'Show',
        id: 'skylarkBrandUid|bran_eb179d6b79084f4f86432f8305e2777a',
        title: 'MLS LIVE',
        primaryGenres: [],
        type: ShowType.Series,
      },
    },
  };
  // when Tv-show type
  let slotTitle = getSlotTitle(mockSlot as any);
  // Then
  expect(slotTitle).toBe('MLS LIVE');

  // when no season & episode number, null or 0
  mockSlot.programme.number = 2;
  mockSlot.programme.season = { number: 1 };
  slotTitle = getSlotTitle(mockSlot as any);
  // Then
  expect(slotTitle).toBe('MLS LIVE S1 E2');

  // when no season & episode number, null or 0
  mockSlot.programme.show.type = ShowType.Sport;
  slotTitle = getSlotTitle(mockSlot as any);
  // Then
  expect(slotTitle).toBe('MLS LIVE Episode');

  // when Movie type
  mockSlot.programme.__typename = 'Movie';
  mockSlot.programme.title = 'Lord of Rings';
  slotTitle = getSlotTitle(mockSlot as any);
  // Then
  expect(slotTitle).toBe('Lord of Rings');

  slotTitle = getSlotTitle(undefined);
  // Then
  expect(slotTitle).toBe('');

  slotTitle = getSlotTitle({
    ...mockSlot,
    programme: undefined,
  } as any);
  // Then
  expect(slotTitle).toBe(DEFAULT_SLOT_TITLE);
});

test('get the slot formatted rating', () => {
  const mockRating = {
    classification: '_16',
    advisories: [],
  };
  // when Tv-show type
  const rating = formatRating(mockRating as any);
  // Then
  expect(rating).toBe('16');
});

test('get the slot title with rating for EPG', () => {
  // Given
  const mockSlot: any = {
    start: '2020-07-24T02:31:10Z',
    end: '2020-07-24T03:31:10Z',
    rating: {
      classification: '_16',
      advisories: [],
    },
    programme: {
      __typename: 'Episode',
      id: 'skylarkEpisodeUid|epis_354e77b42b8446b499520b2dff0fecc9',
      title: 'MLS LIVE Episode',
      show: {
        __typename: 'Show',
        id: 'skylarkBrandUid|bran_eb179d6b79084f4f86432f8305e2777a',
        title: 'MLS LIVE',
        primaryGenres: [],
        type: ShowType.Series,
      },
    },
  };
  // when Tv-show type
  let slotTitle = getSlotTitle(mockSlot as any, false);
  // Then
  expect(slotTitle).toBe('MLS LIVE');

  slotTitle = getSlotTitle(mockSlot as any, true);
  // Then
  expect(slotTitle).toBe('MLS LIVE (16)');
});

test('get the slot live status', () => {
  const mockSlot: any = {
    start: dayjs().subtract(2, 'h'),
    end: dayjs().add(2, 'h'),
    live: false,
    programme: {},
  };

  // Is not Live
  let liveStatus = getSportLiveStatusByTime(mockSlot);
  expect(liveStatus).toEqual(LiveStatus.NOT_LIVE);

  // Is currently playing
  mockSlot.live = true;
  liveStatus = getSportLiveStatusByTime(mockSlot);
  expect(liveStatus).toEqual(LiveStatus.LIVE);

  // Is live soon
  mockSlot.start = dayjs().add(1, 'h');
  mockSlot.end = dayjs().add(2, 'h');
  liveStatus = getSportLiveStatusByTime(mockSlot);
  expect(liveStatus).toEqual(LiveStatus.LIVE_SOON);

  // IS beyond 4 hours
  mockSlot.start = dayjs().subtract(2, 'h');
  mockSlot.end = dayjs().subtract(4, 'h');
  liveStatus = getSportLiveStatusByTime(mockSlot);
  expect(liveStatus).toEqual(LiveStatus.NOT_LIVE);

  // IS live but more that 24h away
  mockSlot.start = dayjs().add(25, 'h');
  mockSlot.end = dayjs().add(26, 'h');
  liveStatus = getSportLiveStatusByTime(mockSlot);
  expect(liveStatus).toEqual(LiveStatus.NOT_LIVE);

  // IS live soon within 4 hours
  mockSlot.start = dayjs().add(4, 'h');
  mockSlot.end = dayjs().add(5, 'h');
  liveStatus = getSportLiveStatusByTime(mockSlot, false);
  expect(liveStatus).toEqual(LiveStatus.LIVE_SOON);
});

test('check the slot is onAir or not', () => {
  const now = dayjs();
  // is not onAir by default
  expect(isSlotOnAir()).toBeFalsy();
  // is not onAir
  let slot = {
    start: now.add(1, 'minute'),
    end: now.add(2, 'hour'),
  };
  let result = isSlotOnAir(slot as LinearSlot);
  expect(result).toBeFalsy();

  // is onAir
  slot = {
    start: now.subtract(1, 'hour'),
    end: now.add(1, 'hour'),
  };
  result = isSlotOnAir(slot as LinearSlot);
  expect(result).toBeTruthy();
});

test('check the slot is finished or not', () => {
  const now = dayjs();
  // is not finished by default
  expect(isFinished()).toBeFalsy();
  // is not started
  let slot = {
    start: now.add(1, 'minute'),
    end: now.add(2, 'hour'),
  };
  let result = isFinished(slot as LinearSlot);
  expect(result).toBeFalsy();

  // is onAir
  slot = {
    start: now.subtract(1, 'hour'),
    end: now.add(1, 'hour'),
  };
  result = isFinished(slot as LinearSlot);
  expect(result).toBeFalsy();

  // is finished
  slot = {
    start: now.subtract(2, 'hour'),
    end: now.subtract(1, 'hour'),
  };
  result = isFinished(slot as LinearSlot);
  expect(result).toBeTruthy();
});

test('check the slot is recordable or not', () => {
  const now = dayjs();
  // is not recordable by default
  expect(isRecordable()).toBeFalsy();
  // is not finished and with recordOptions
  let slot = {
    end: now.add(2, 'hour'),
    recordOptions: ['EPISODE', 'SERIES'],
  };
  let result = isRecordable(slot as LinearSlot);
  expect(result).toBeTruthy();

  // is not finished but no recordOptions
  slot = {
    end: now.add(1, 'hour'),
    recordOptions: [],
  };
  result = isRecordable(slot as LinearSlot);
  expect(result).toBeFalsy();

  // is finished and with recordOptions
  slot = {
    end: now.subtract(1, 'hour'),
    recordOptions: ['EPISODE', 'SERIES'],
  };
  result = isRecordable(slot as LinearSlot);
  expect(result).toBeFalsy();
});
