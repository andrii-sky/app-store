import { combineReducers } from 'redux';

import { APIModuleState } from '@/utils/api/types';
import { head } from 'ramda';
import { PlayerState } from './types';

import {
  createApiInitialState,
  createApiModuleReducer,
  createApiReducer,
  createCustomModuleReducer,
  createApiOnSuccessReducer,
} from '../../utils/api';

import {
  SET_ACCESS_TOKEN,
  SPOTIFY_UNAUTHORIZED_ERROR,
  FETCH_BRAND_ALBUMS,
  FETCH_PLAYER_STATE,
  FETCH_IS_SAVED_ALBUM,
  FETCH_PROFILE,
  SET_PLAYBACK_SEEK_TIME,
} from './constants';

const reducers = {
  accessToken: createCustomModuleReducer(
    {
      [SET_ACCESS_TOKEN]: (state, action: any) => {
        return action.payload;
      },
    },
    null,
  ),
  profile: createApiModuleReducer(
    {
      actionType: FETCH_PROFILE,
      onSuccess: createApiOnSuccessReducer((data, action) => ({
        ...data,
        ...action.payload,
      })),
    },
    {},
  ),
  authError: createCustomModuleReducer(
    {
      [SPOTIFY_UNAUTHORIZED_ERROR]: (state, action: any) => {
        return action.payload;
      },
    },
    null,
  ),
  albumsById: createApiModuleReducer(
    {
      actionType: FETCH_BRAND_ALBUMS,
      onSuccess: createApiOnSuccessReducer((data, action) => {
        const { isShow } = action.meta;
        const brand = action.payload[isShow ? 'show' : 'movie'];

        const sountracks = {};
        if (brand) {
          if (isShow) {
            brand?.seasons.forEach(season => {
              sountracks[season?.soundtrack?.id] = season?.soundtrack;
            });
          } else {
            sountracks[brand?.soundtrack?.id] = brand?.soundtrack;
          }
        }

        return {
          ...data,
          ...sountracks,
        };
      }),
    },
    {},
  ),
  albumsSavedById: createApiModuleReducer(
    {
      actionType: FETCH_IS_SAVED_ALBUM,
      onSuccess: createApiOnSuccessReducer((data, action) => {
        return {
          ...data,
          [action.meta.albumId]: head(action.payload),
        };
      }),
    },
    {},
  ),
  playerState: createCustomModuleReducer<APIModuleState<PlayerState>, any>(
    {
      ...createApiReducer({
        actionType: FETCH_PLAYER_STATE,
        onSuccess: createApiOnSuccessReducer((data, action) => {
          // This condition has been updated to make rewind functionality
          // smoother and prevent progress bar from huge jumps that look bad
          if (Math.abs(action.payload?.progress_ms - data.lastSeekTime) < 6000) {
            return data;
          }

          return {
            ...data,
            player: action.payload,
          };
        }),
      }),
      [SET_PLAYBACK_SEEK_TIME]: (state, action) => {
        return {
          ...state,
          data: {
            ...state.data,
            lastSeekTime: action.payload,
          },
        };
      },
    },
    createApiInitialState<PlayerState>({ player: null, lastSeekTime: 0 }),
  ),
};

export default combineReducers(reducers);
