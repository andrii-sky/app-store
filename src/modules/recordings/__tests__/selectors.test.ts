import { mergeDeepRight } from 'ramda';
import dayjs from 'dayjs';
import { PlannerSorting } from '@/types/enums/PlannerSorting';
import {
  recording,
  recordingMeta,
  scheduledRecordingMeta,
  recordingSettings,
  show1Slot1,
  show1Slot2,
  show2Slot,
  show3Slot,
  movieSlot,
} from '@/modules/recordings/__tests__/testData';
import {
  scheduledRecordings,
  scheduledRecording,
  recordings,
  recordingsMetaGroupByBrand,
  usedStorage,
  freeDiskspace,
  usedDiskspace,
  scheduledSeries,
} from '../selectors';

describe('recordings selectors', () => {
  const RECORDING_IDX = {
    S1E1: 0,
    S1E2: 1,
    S2E1: 2,
    S3E1: 3,
    M1: 4,
  };
  const defaultStateForGrouping = {
    recordings: {
      recordings: [
        {
          ...recordingMeta,
          start: dayjs(show1Slot1.start).unix(),
          slot: show1Slot1,
        },
        {
          ...recordingMeta,
          start: dayjs(show1Slot2.start).unix(),
          slot: show1Slot2,
        },
        {
          ...recordingMeta,
          start: dayjs(show2Slot.start).unix(),
          slot: show2Slot,
        },
        {
          ...scheduledRecordingMeta,
          start: dayjs(show3Slot.start).unix(),
          slot: show3Slot,
        },
        {
          ...recordingMeta,
          start: dayjs(movieSlot.start).unix(),
          slot: movieSlot,
        },
      ],
      plannerSorting: PlannerSorting.NEWEST,
      scheduledSeries: [],
    },
  };

  const show1WithRecordingsMeta = {
    ...show1Slot1.programme.show,
    size:
      defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S1E2].size +
      defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S1E1].size,
    recordings: [
      defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S1E2],
      defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S1E1],
    ],
  };

  const show2WithRecordingsMeta = {
    ...show2Slot.programme.show,
    size: defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S2E1].size,
    recordings: [defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S2E1]],
  };

  const show3WithRecordingsMeta = {
    ...show3Slot.programme.show,
    size: defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S3E1].size,
    recordings: [defaultStateForGrouping.recordings.recordings[RECORDING_IDX.S3E1]],
  };

  const movieWithRecordingsMeta = {
    ...movieSlot.programme,
    size: defaultStateForGrouping.recordings.recordings[RECORDING_IDX.M1].size,
    recordings: [defaultStateForGrouping.recordings.recordings[RECORDING_IDX.M1]],
  };

  test('default state recordings', () => {
    // When default state
    const scheduledSeriesList = [{ id: 'fake_series_id', ignoreSlots: [recording.programmeId] }];
    const defaultState = {
      recordings: {
        scheduledRecordingsByProgrammeId: {
          [recording.programmeId]: recording,
        },
        recordings: [recordingMeta],
        plannerSorting: PlannerSorting.NEWEST,
        scheduledSeries: scheduledSeriesList,
      },
    };

    // Then
    expect(scheduledRecordings(defaultState)).toEqual([recording]);

    expect(scheduledRecording(defaultState)(recording.programmeId)).toEqual(recording);

    expect(recordings(defaultState)).toEqual([recordingMeta]);

    expect(scheduledSeries(defaultState)).toEqual(scheduledSeriesList);
  });

  test('get recording meta grouped by brand', () => {
    // When
    const defaultState = defaultStateForGrouping;

    // Then
    expect(recordingsMetaGroupByBrand(defaultState)).toEqual([
      movieWithRecordingsMeta,
      show1WithRecordingsMeta,
      show2WithRecordingsMeta,
      show3WithRecordingsMeta,
    ]);
  });

  test('get recording meta sorting', () => {
    const defaultState = defaultStateForGrouping;

    // When sorting is newest
    let stateWithSorting = mergeDeepRight(defaultState, {
      recordings: { plannerSorting: PlannerSorting.NEWEST },
    });
    // Then
    expect(recordingsMetaGroupByBrand(stateWithSorting)).toEqual([
      movieWithRecordingsMeta,
      show1WithRecordingsMeta,
      show2WithRecordingsMeta,
      show3WithRecordingsMeta,
    ]);

    // When sorting is oldest
    stateWithSorting = mergeDeepRight(defaultState, {
      recordings: { plannerSorting: PlannerSorting.OLDEST },
    });
    // Then
    expect(recordingsMetaGroupByBrand(stateWithSorting)).toEqual([
      show1WithRecordingsMeta,
      show2WithRecordingsMeta,
      movieWithRecordingsMeta,
      show3WithRecordingsMeta,
    ]);

    // When sorting is alphabetical
    stateWithSorting = mergeDeepRight(defaultState, {
      recordings: { plannerSorting: PlannerSorting.ALPHABETICAL },
    });
    // Then
    expect(recordingsMetaGroupByBrand(stateWithSorting)).toEqual([
      show2WithRecordingsMeta,
      show1WithRecordingsMeta,
      show3WithRecordingsMeta,
      movieWithRecordingsMeta,
    ]);
  });

  test('default state record settings ', () => {
    // When default state
    const defaultState = {
      recordings: {
        recordingSettings,
      },
    };

    // Then
    expect(usedStorage(defaultState)).toEqual(recordingSettings.usedStorage);

    expect(freeDiskspace(defaultState)).toEqual(recordingSettings.freeDiskspace);

    expect(usedDiskspace(defaultState)).toEqual(recordingSettings.usedDiskspace);
  });
});
