import { combineReducers } from 'redux';
import { pickBy } from 'ramda';
import { createCustomModuleReducer } from '@/utils/api';
import { Recording } from '@/types/models/Recording';
import { RecordingSettings } from '@/types/models/RecordingSettings';
import { RecordingPlaybackMeta } from '@/types/models/RecordingMeta';
import { PlannerSorting } from '@/types/enums/PlannerSorting';
import { RecordingSeries } from '@/types/models/RecordingSeries';
import {
  REMOVE_RECORDING,
  SET_ALL_SCHEDULED_RECORDINGS,
  SET_SCHEDULED_RECORDING,
  SET_RECORDING_SETTINGS,
  SET_ALL_RECORDINGS,
  SET_PLANNER_SORTING,
  ADD_SERIES,
  REMOVE_SERIES,
  ADD_SERIES_IGNORE_SLOTS,
} from './constants';

export interface RecordingsState {
  [programmeId: string]: Recording;
}

const reducers = {
  scheduledRecordingsByProgrammeId: createCustomModuleReducer<RecordingsState>(
    {
      [SET_SCHEDULED_RECORDING]: (state, action) => {
        return {
          ...state,
          [action.payload.programmeId]: action.payload,
        };
      },
      [SET_ALL_SCHEDULED_RECORDINGS]: (_, action) => action.payload,
      [REMOVE_RECORDING]: (state, action) => {
        const removeIds = action.payload;
        return pickBy(({ id }) => !removeIds.includes(id), state);
      },
    },
    {},
  ),
  recordings: createCustomModuleReducer<Array<RecordingPlaybackMeta>>(
    {
      [SET_ALL_RECORDINGS]: (_, action) => action.payload,
      [REMOVE_RECORDING]: (state, action) => {
        const removeIds = action.payload;
        return state.filter(({ id }) => !removeIds.includes(id));
      },
    },
    [],
  ),
  recordingSettings: createCustomModuleReducer<RecordingSettings | any>(
    {
      [SET_RECORDING_SETTINGS]: (_, action) => {
        return action.payload;
      },
    },
    {},
  ),
  plannerSorting: createCustomModuleReducer<PlannerSorting>(
    {
      [SET_PLANNER_SORTING]: (state, action) => action.payload,
    },
    PlannerSorting.NEWEST,
  ),
  scheduledSeries: createCustomModuleReducer<Array<RecordingSeries>>(
    {
      [ADD_SERIES]: (state, action) => {
        const newSeriesId = action.payload;
        const existingSeries = state.find(({ id }) => id === newSeriesId);
        if (existingSeries) {
          return state;
        }
        return [...state, { id: newSeriesId }];
      },
      [REMOVE_SERIES]: (state, action) => state.filter(({ id }) => id !== action.payload),
      [ADD_SERIES_IGNORE_SLOTS]: (state, action) =>
        state.map(series => {
          if (series.id === action.payload.seriesId) {
            return {
              ...series,
              ignoreSlots: (series.ignoreSlots || []).concat(action.payload.ignoreSlots),
            };
          }
          return series;
        }),
    },
    [],
  ),
};

export default combineReducers(reducers);
