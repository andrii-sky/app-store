import { createSelector } from 'reselect';
import { isEmpty, isNil } from 'ramda';
import dayjs from 'dayjs';

import { isNotNilOrEmpty } from '@/utils/utils';
import { channels, getChannelsByCategoryId } from '../channels/selectors';
import memoize from '../../utils/fastMemoize';
import reducer from './reducer';
import { namespace } from './constants';

export type State = {
  [namespace]: ReturnType<typeof reducer>;
};

export const allSlots = createSelector(
  (state: State) => state.epg.slotsByChannelId?.data,
  s => s,
);
export const getSlotsByChannelId = createSelector(
  (state: State) => state.epg.slotsByChannelId?.data,
  allSlotsByChannelId =>
    memoize((channelId: string, from?: string, to?: string) => {
      const slots = allSlotsByChannelId[channelId];
      if (slots) {
        if (isNotNilOrEmpty(from) || isNotNilOrEmpty(to)) {
          const startIndex = slots.findIndex(slot => dayjs(from).unix() < dayjs(slot?.end).unix());
          const endIndex = slots.findIndex(slot => dayjs(to).unix() <= dayjs(slot?.end).unix());

          return slots.slice(
            startIndex >= 0 ? startIndex : 0,
            endIndex >= 0 ? endIndex + 1 : undefined,
          );
        }
        return slots;
      }
      return [];
    }),
);
export const slotsByChannelIdIsLoading = createSelector(
  (state: State) => state.epg.slotsByChannelId?.isLoading,
  isLoading => !!isLoading,
);
export const slotsByChannelIdError = createSelector(
  (state: State) => state.epg.slotsByChannelId.error,
  error => error,
);
export const getSlotsByCategoryId = createSelector(
  getChannelsByCategoryId,
  getSlotsByChannelId,
  (getChannels, getSlots) =>
    memoize((categoryId: string) => {
      const targetChannels = getChannels(categoryId);
      return targetChannels?.map(channel => getSlots(channel.id));
    }),
);

export const isSlotsOutsideTimeRange = createSelector(
  channels,
  getSlotsByChannelId,
  (allChannels, getSlots) =>
    memoize((from: string, to: string) => {
      if (isEmpty(allChannels) || isNil(allChannels)) {
        return true;
      }
      return allChannels?.some(channel => {
        const slots = getSlots(channel.id);
        if (isEmpty(slots) || isNil(slots)) {
          return true;
        }

        const startIndex = slots.findIndex(
          slot =>
            dayjs(from).unix() >= dayjs(slot?.start).unix() &&
            dayjs(from).unix() < dayjs(slot?.end).unix(),
        );
        const endIndex = slots.findIndex(
          slot =>
            dayjs(to).unix() > dayjs(slot?.start).unix() &&
            dayjs(to).unix() <= dayjs(slot?.end).unix(),
        );

        return startIndex < 0 || endIndex < 0;
      });
    }),
);

export const getSlotsByTimeRange = createSelector(
  getChannelsByCategoryId,
  getSlotsByChannelId,
  (getChannels, getSlots) =>
    memoize((categoryId: string, from: string, to: string) => {
      const targetChannels = getChannels(categoryId);

      return targetChannels?.map(channel => getSlots(channel.id, from, to));
    }),
);

export const selectedSlot = createSelector(
  (state: State) => state.epg.selectedSlot.data,
  slot => slot,
);

export const selectedSlotChannel = createSelector(
  (state: State) => state.epg.selectedSlot.data,
  slot => slot?.channel,
);

export const selectedSlotIsLoading = createSelector(
  (state: State) => state.epg.selectedSlot.isLoading,
  isLoading => !!isLoading,
);

export const selectedSlotError = createSelector(
  (state: State) => state.epg.selectedSlot.error,
  error => error,
);
