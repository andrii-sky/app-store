/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { head, isNil, pluck } from 'ramda';

import { LinearChannelGroup, LinearChannel, LinearSlot } from '@/types/graph-ql';
import {
  createApiModuleReducer,
  createCustomModuleReducer,
  createApiReducer,
  createApiInitialState,
} from '@/utils/api';
import { APIModuleState } from '@/utils/api/types';

import {
  FETCH_CATEGORIES,
  FETCH_CHANNELS_BY_CATEGORY_ID,
  SET_SELECTED_CHANNEL_ID,
  SET_CHANNEL_BY_ID,
  SET_SELECTED_CATEGORY_ID,
  FETCH_SELECTED_CHANNEL_SLOT,
  CLEAR_SELECTED_CHANNEL_SLOT,
} from './constants';

const selectedChannelSlotInitialState = {};
const reducers = {
  categoryById: createApiModuleReducer<
    { [categoryId: string]: Omit<LinearChannelGroup, 'channels'> },
    { channelGroups: LinearChannelGroup[] }
  >(
    {
      actionType: FETCH_CATEGORIES,
      onSuccess: (draftState, action) => {
        draftState.data = {};
        action.payload?.channelGroups.forEach(linearChannelGroup => {
          if (linearChannelGroup) {
            const { id, title } = linearChannelGroup;
            draftState.data[id] = {
              id,
              title,
            };
          }
        });
      },
    },
    {},
  ),
  channelsByCategoryId: createCustomModuleReducer<
    APIModuleState<{ [categoryId: string]: string[] }>
  >(
    {
      ...createApiReducer({
        actionType: FETCH_CATEGORIES,
        onSuccess: (draftState, action) => {
          action.payload?.channelGroups.forEach(linearChannelGroup => {
            if (linearChannelGroup) {
              const { id, channels } = linearChannelGroup;
              draftState.data[id] =
                channels &&
                // No empty channel should display
                pluck<'id', LinearChannel>('id', channels.filter(Boolean) as LinearChannel[]);
            }
          });
        },
      }),
      ...createApiReducer({
        actionType: FETCH_CHANNELS_BY_CATEGORY_ID,
        onSuccess: (draftState, action) => {
          const channels = action.payload?.linearChannelGroup?.channels.filter(Boolean);
          draftState.data[action.meta.categoryId] =
            channels && pluck<'id', LinearChannel>('id', channels as LinearChannel[]);
        },
      }),
    },
    createApiInitialState({}),
  ),
  channelById: createCustomModuleReducer<
    { [channelId: string]: LinearChannel },
    { channels: LinearChannel[]; override?: boolean }
  >(
    {
      [SET_CHANNEL_BY_ID]: (draftState, action) => {
        const { channels } = action.payload;
        let newState = draftState;
        if (action.payload.override) {
          // if override create a new state.
          newState = {};
        }
        channels?.forEach(channel => {
          newState[channel.id] = {
            ...channel,
            slot: channel?.slot || (!isNil(channel.slots) && head(channel.slots)),
          };
        });
        return newState; // if override return new state. if not override return draftState (same as just 'return').
      },
    },
    {},
  ),
  selectedChannelId: createCustomModuleReducer<string, string>(
    {
      [SET_SELECTED_CHANNEL_ID]: (_, action) => action.payload,
    },
    '',
  ),
  selectedCategoryId: createCustomModuleReducer<string, string>(
    {
      [SET_SELECTED_CATEGORY_ID]: (_, action) => action.payload,
    },
    '',
  ),
  selectedChannelSlot: createCustomModuleReducer<
    APIModuleState<{
      slot?: LinearSlot;
    }>
  >(
    {
      ...createApiReducer({
        actionType: FETCH_SELECTED_CHANNEL_SLOT,
        onSuccess: (draftState, action) => {
          draftState.data.slot = action.payload?.linearChannel?.slot;
        },
      }),
      [CLEAR_SELECTED_CHANNEL_SLOT]: draftState => {
        draftState.data = selectedChannelSlotInitialState;
      },
    },
    createApiInitialState(selectedChannelSlotInitialState),
  ),
};

export default combineReducers(reducers);
