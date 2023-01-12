import { MockStore } from 'redux-mock-store';
import { init } from '@/index';
import { recording, recordingMeta, recordingSettings, show1Slot1 } from './testData';
import {
  REMOVE_RECORDING,
  SET_ALL_SCHEDULED_RECORDINGS,
  SET_ALL_RECORDINGS,
  SET_SCHEDULED_RECORDING,
  SET_RECORDING_SETTINGS,
  ADD_SERIES,
  REMOVE_SERIES,
  ADD_SERIES_IGNORE_SLOTS,
} from '../constants';
import {
  removeRecordings,
  removeRecordingsByBrand,
  setAllScheduledRecordings,
  setAllRecordings,
  setScheduledRecording,
  setRecordingSettings,
  addSeries,
  removeSeries,
  addSeriesIgnoreSlots,
} from '../actions';

const initState = {
  recordings: {
    scheduledRecordingsByProgrammeId: {
      [recording.id]: recording,
    },
    recordings: [{ ...recordingMeta, slot: show1Slot1 }],
    recordingSettings: {
      usedStorage: 0,
      usedDiskspace: 0,
      freeDiskspace: 0,
    },
    scheduledSeries: [],
  },
};

const seriesId = 'fake_series_id';

jest.mock('../../..');

const { createStore } = init();

const store = (createStore(initState) as unknown) as MockStore;

describe('recording actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('set scheduled recording', () => {
    const expectedActions = [
      {
        type: SET_SCHEDULED_RECORDING,
        payload: recording,
      },
    ];

    store.dispatch(setScheduledRecording(recording));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set all scheduled record', () => {
    const expectedActions = [
      {
        type: SET_ALL_SCHEDULED_RECORDINGS,
        payload: { [recording.programmeId]: recording },
      },
    ];

    store.dispatch(setAllScheduledRecordings({ [recording.programmeId]: recording }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set all record meta', () => {
    const result = [recordingMeta];
    const expectedActions = [
      {
        type: SET_ALL_RECORDINGS,
        payload: result,
      },
    ];

    store.dispatch(setAllRecordings(result));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('remove recordings', () => {
    const expectedActions = [
      {
        type: REMOVE_RECORDING,
        payload: [recording.id],
      },
    ];

    store.dispatch(removeRecordings([recording.id]) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('remove recordings by brand', () => {
    const expectedActions = [
      {
        type: REMOVE_RECORDING,
        payload: [recording.id],
      },
    ];

    store.dispatch(removeRecordingsByBrand(show1Slot1.programme.show.id) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set recording settings', () => {
    const expectedActions = [
      {
        type: SET_RECORDING_SETTINGS,
        payload: recordingSettings,
      },
    ];

    store.dispatch(setRecordingSettings(recordingSettings));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('add series', () => {
    const expectedActions = [
      {
        type: ADD_SERIES,
        payload: seriesId,
      },
    ];

    store.dispatch(addSeries(seriesId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('remove series', () => {
    const expectedActions = [
      {
        type: REMOVE_SERIES,
        payload: seriesId,
      },
    ];

    store.dispatch(removeSeries(seriesId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('add ignore slots into series', () => {
    const expectedActions = [
      {
        type: ADD_SERIES_IGNORE_SLOTS,
        payload: { seriesId, ignoreSlots: [recording.programmeId] },
      },
    ];

    store.dispatch(addSeriesIgnoreSlots(seriesId, [recording.programmeId]));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
