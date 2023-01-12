import {
  recording,
  recordingMeta,
  recordingSettings,
} from '@/modules/recordings/__tests__/testData';
import { createAction } from '@reduxjs/toolkit';
import {
  SET_SCHEDULED_RECORDING,
  REMOVE_RECORDING,
  SET_ALL_SCHEDULED_RECORDINGS,
  SET_ALL_RECORDINGS,
  SET_RECORDING_SETTINGS,
  ADD_SERIES,
  REMOVE_SERIES,
  ADD_SERIES_IGNORE_SLOTS,
} from '../constants';
import reducer from '../reducer';

const contentState: any = {
  scheduledRecordingsByProgrammeId: {},
  recordings: [],
  recordingSettings: {},
  plannerSorting: 'newest',
  scheduledSeries: [],
};

const seriesId = 'fake_series_id';

describe('recordings reducer', () => {
  test('set schecduled record', () => {
    const action = createAction<any>(SET_SCHEDULED_RECORDING)(recording);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      scheduledRecordingsByProgrammeId: { [recording.programmeId]: recording },
    });
  });

  test('set all schecduled record', () => {
    const result = { [recording.programmeId]: recording };
    const action = createAction<any>(SET_ALL_SCHEDULED_RECORDINGS)(result);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      scheduledRecordingsByProgrammeId: result,
    });
  });

  test('set all record meta', () => {
    const result = { [recordingMeta.programmeId]: recordingMeta };
    const action = createAction<any>(SET_ALL_RECORDINGS)(result);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      recordings: result,
    });
  });

  test('remove record asset', () => {
    const existingContentState = {
      ...contentState,
      scheduledRecordingsByProgrammeId: { [recording.programmeId]: recording },
      recordings: [recording],
    };
    const action = createAction<any>(REMOVE_RECORDING)([recording.id]);
    // when and Then
    expect(reducer(existingContentState, action)).toEqual({
      ...existingContentState,
      scheduledRecordingsByProgrammeId: {},
      recordings: [],
    });
  });

  test('set record settings', () => {
    const action = createAction<any>(SET_RECORDING_SETTINGS)(recordingSettings);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      recordingSettings,
    });
  });

  test('add scheduled series', () => {
    const action = createAction<any>(ADD_SERIES)(seriesId);
    // when and Then
    expect(reducer(contentState, action)).toEqual({
      ...contentState,
      scheduledSeries: [{ id: seriesId }],
    });
  });

  test('remove scheduled series', () => {
    const existingContentState = {
      ...contentState,
      scheduledSeries: [{ id: seriesId }],
    };
    const action = createAction<any>(REMOVE_SERIES)(seriesId);
    // when and Then
    expect(reducer(existingContentState, action)).toEqual({
      ...existingContentState,
      scheduledSeries: [],
    });
  });

  test('add ignore slots into scheduled series', () => {
    const existingContentState = {
      ...contentState,
      scheduledSeries: [{ id: seriesId }],
    };
    const action = createAction<any>(ADD_SERIES_IGNORE_SLOTS)({
      seriesId,
      ignoreSlots: [recording.programmeId],
    });
    // when and Then
    expect(reducer(existingContentState, action)).toEqual({
      ...existingContentState,
      scheduledSeries: [{ id: seriesId, ignoreSlots: [recording.programmeId] }],
    });
  });
});
