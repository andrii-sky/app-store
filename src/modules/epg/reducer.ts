/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import dayjs from 'dayjs';
import { head, last, isNil } from 'ramda';

import { LinearSlot, LinearChannel, Maybe, Channel } from '@/types/graph-ql';

import { APIModuleState } from '@/utils/api/types';
import {
  CLEAR_SELECTED_SLOT,
  FETCH_SLOTS_BY_TIME_RANGE,
  FETCH_SLOT_BY_START_TIME,
} from './constants';
import {
  createApiInitialState,
  createApiModuleReducer,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const insertSlotsTimeRange = (currentSlots: Maybe<LinearSlot>[], newSlots: Maybe<LinearSlot>[]) => {
  let currentIndex = 0;
  let newIndex = 0;
  const newSlotsState: any[] = [];

  // Simple Double Pointer Loop Algorithm
  // Insert new slots into current slots time range
  while (!(currentIndex >= currentSlots.length && newIndex >= newSlots.length)) {
    const newSlot = newSlots[newIndex];
    const currentSlot = currentSlots[currentIndex];

    if (currentIndex < currentSlots.length && newIndex < newSlots.length) {
      const newSlotStart = dayjs(newSlot?.start).unix();
      const currentSlotStart = dayjs(currentSlot?.start).unix();

      // new slot is equal to current existing slot, skip it
      if (currentSlotStart === newSlotStart) {
        newSlotsState.push(currentSlot);
        // Go to the next current slot
        currentIndex += 1;
        // Go to the next new slot
        newIndex += 1;
      }
      // new slot is before existing slot, add it into result
      else if (currentSlotStart > newSlotStart) {
        newSlotsState.push(newSlot);
        // Go to the next new slot
        newIndex += 1;
      }
      // new slot is after existing slot, add current into result
      else if (currentSlotStart < newSlotStart) {
        newSlotsState.push(currentSlot);
        // Go to the next current slot
        currentIndex += 1;
      }
    } else if (currentIndex === currentSlots.length && newIndex < newSlots.length) {
      newSlotsState.push(newSlot);
      newIndex += 1;
    } else if (currentIndex < currentSlots.length && newIndex === newSlots.length) {
      newSlotsState.push(currentSlot);
      currentIndex += 1;
    }
  }

  return newSlotsState;
};

const reducers = {
  slotsByChannelId: createApiModuleReducer<
    { [channelId: string]: Maybe<LinearSlot>[] },
    {
      channels: Array<Channel>;
    }
  >(
    {
      actionType: FETCH_SLOTS_BY_TIME_RANGE,
      onSuccess: (draftState, action) => {
        if (action.isNotModified) {
          return;
        }
        const { channels } = action.payload;
        if (channels) {
          channels.forEach(channel => {
            if (isNil(channel)) {
              return;
            }

            if (channel?.__typename === 'LinearChannel') {
              const { id: channelId, slots } = channel as LinearChannel;
              const newSlots = slots?.filter(s => !isNil(s) && !isNil(s?.start) && !isNil(s?.end));
              const slotsState = draftState.data[channelId];

              // If slots list already there
              if (slotsState && !action.meta?.isOverride) {
                const firstNewSlot = head(newSlots);
                const lastCurrentSlot = last(slotsState);

                const firstNewSlotStart = dayjs(firstNewSlot?.start).unix();
                const lastCurrentSlotStart = dayjs(lastCurrentSlot?.start).unix();

                // If the new slots is after all the current slots
                if (lastCurrentSlotStart <= firstNewSlotStart) {
                  slotsState.push(
                    ...(lastCurrentSlotStart === firstNewSlotStart ? newSlots.slice(1) : newSlots),
                  );
                } else {
                  const newSlotsState = insertSlotsTimeRange(slotsState, newSlots);
                  draftState.data[channelId] = newSlotsState;
                }
              } else {
                draftState.data[channelId] = newSlots;
              }
            }
          });
        }
      },
    },
    {},
  ),
  selectedSlot: createCustomModuleReducer<APIModuleState<Maybe<LinearSlot>>>(
    {
      ...createApiReducer({
        actionType: FETCH_SLOT_BY_START_TIME,
        onSuccess: (draftState, action) => {
          draftState.data = action.payload?.linearChannel?.slot;
        },
      }),
      [CLEAR_SELECTED_SLOT]: draftState => {
        draftState.data = null;
      },
    },
    createApiInitialState(null),
  ),
};

export default combineReducers(reducers);
