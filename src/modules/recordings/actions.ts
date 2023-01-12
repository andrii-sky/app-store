import { Recording } from '@/types/models/Recording';
import { createAction } from '@reduxjs/toolkit';
import { PlannerSorting } from '@/types/enums/PlannerSorting';
import { RecordingPlaybackMeta } from '@/types/models/RecordingMeta';
import { RecordingSettings } from '@/types/models/RecordingSettings';
import { isShow } from '@/utils/Slot';
import { Episode } from '@/types/graph-ql';
import {
  SET_SCHEDULED_RECORDING,
  SET_ALL_SCHEDULED_RECORDINGS,
  REMOVE_RECORDING,
  SET_RECORDING_SETTINGS,
  SET_ALL_RECORDINGS,
  SET_PLANNER_SORTING,
  ADD_SERIES,
  REMOVE_SERIES,
  ADD_SERIES_IGNORE_SLOTS,
} from './constants';
import { RecordingsState } from './reducer';
import { recordings } from './selectors';

export const setScheduledRecording = (recording: Recording) =>
  createAction<any>(SET_SCHEDULED_RECORDING)(recording);

export const setAllScheduledRecordings = (newRecordings: RecordingsState) =>
  createAction<any>(SET_ALL_SCHEDULED_RECORDINGS)(newRecordings);

export const setAllRecordings = (recordingsData: Array<RecordingPlaybackMeta>) =>
  createAction<any>(SET_ALL_RECORDINGS)(recordingsData);

export const removeRecordings = (ids: Array<string>) => createAction<any>(REMOVE_RECORDING)(ids);

export const removeRecordingsByBrand = (brandId: string) => (dispatch, getState) => {
  const allRecordings = recordings(getState());
  const recordingIdsByBrand = allRecordings.reduce(
    (result: Array<string>, recording: RecordingPlaybackMeta) => {
      const { slot, id } = recording;
      const brand = isShow(slot) ? (slot?.programme as Episode)?.show : slot?.programme;
      if (brandId === brand?.id) {
        return [...result, id];
      }
      return result;
    },
    [],
  );
  return dispatch(createAction<any>(REMOVE_RECORDING)(recordingIdsByBrand));
};

export const setRecordingSettings = (recordingSettings: RecordingSettings) =>
  createAction<any>(SET_RECORDING_SETTINGS)(recordingSettings);

export const setPlannerSorting = (sort: PlannerSorting) =>
  createAction<any>(SET_PLANNER_SORTING)(sort);

export const addSeries = (seriesId: string) => createAction<string>(ADD_SERIES)(seriesId);

export const removeSeries = (seriesId: string) => createAction<string>(REMOVE_SERIES)(seriesId);

export const addSeriesIgnoreSlots = (seriesId: string, ignoreSlots: string[]) =>
  createAction<{ seriesId: string; ignoreSlots: string[] }>(ADD_SERIES_IGNORE_SLOTS)({
    seriesId,
    ignoreSlots,
  });
