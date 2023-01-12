import { createAction } from '@reduxjs/toolkit';
import { DVBThreeStepsInitStates } from '@/types/enums/DVBThreeStepsInitStates';
import reducer from '../reducer';

import {
  SET_IS_MW_READY,
  SET_MW_CTX_COUNT,
  SET_MW_EVENT_SOURCE,
  SET_PLAYER_INSTANCE_ID,
  SET_SCAN_DVB_STATE,
  SET_HAS_MAIL,
  SET_IS_SERVICE_STATUS_OPEN,
  SET_IS_CAS_MODAL_DISPLAYED,
  SET_IS_CAS_HOME_SET,
  SET_DVB_RESERVATION_ID,
  SET_IS_PLAYER_SURFACE_SET,
  SET_PLAYER_ACTION_DONE,
  SET_QUERY_RECORDINGS_STATE,
  SET_IS_DVB_SIGAL_OK,
  SET_HAS_SATELLITE_CONNECTION,
} from '../constants';

const initialState = {
  mwCtxCount: -2,
  isMwReady: false,
  mwEventSource: null,
  playerInstanceId: null,
  hasMail: false,
  isServiceStatusOpen: false,
  isCasErrorModalDisplayed: false,
  scanDvbState: DVBThreeStepsInitStates.ready,
  isCasHomeSet: DVBThreeStepsInitStates.ready,
  dvbSignalReservationId: '',
  isPlayerSurfaceSet: DVBThreeStepsInitStates.ready,
  isPlayerActionDone: false,
  queryRecordingsState: DVBThreeStepsInitStates.ready,
  isDvbSignalOk: true,
  hasSatelliteConnection: true,
};

test('SET_IS_MW_READY', () => {
  const action = createAction<boolean>(SET_IS_MW_READY)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isMwReady: true,
  });
});

test('SET_MW_CTX_COUNT', () => {
  const action = createAction<number>(SET_MW_CTX_COUNT)(4);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    mwCtxCount: 4,
  });
});

test('SET_MW_EVENT_SOURCE', () => {
  const action = createAction<any>(SET_MW_EVENT_SOURCE)({ source: 3 });
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    mwEventSource: { source: 3 },
  });
});

test('SET_PLAYER_INSTANCE_ID', () => {
  const action = createAction<string>(SET_PLAYER_INSTANCE_ID)('4');
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    playerInstanceId: '4',
  });
});

test('SET_HAS_MAIL', () => {
  const action = createAction<boolean>(SET_HAS_MAIL)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    hasMail: true,
  });
});

test('SET_SCAN_DVB_STATE', () => {
  const action = createAction<DVBThreeStepsInitStates>(SET_SCAN_DVB_STATE)(
    DVBThreeStepsInitStates.failed,
  );
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    scanDvbState: DVBThreeStepsInitStates.failed,
  });
});

test('SET_IS_SERVICE_STATUS_OPEN', () => {
  const action = createAction<boolean>(SET_IS_SERVICE_STATUS_OPEN)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isServiceStatusOpen: true,
  });
});

test('SET_IS_CAS_MODAL_DISPLAYED', () => {
  const action = createAction<boolean>(SET_IS_CAS_MODAL_DISPLAYED)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isCasErrorModalDisplayed: true,
  });
});

test('SET_IS_CAS_HOME_SET', () => {
  const action = createAction<DVBThreeStepsInitStates>(SET_IS_CAS_HOME_SET)(
    DVBThreeStepsInitStates.initiating,
  );
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isCasHomeSet: DVBThreeStepsInitStates.initiating,
  });
});

test('SET_DVB_RESERVATION_ID', () => {
  const action = createAction<string>(SET_DVB_RESERVATION_ID)('3');
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    dvbSignalReservationId: '3',
  });
});

test('SET_IS_PLAYER_SURFACE_SET', () => {
  const action = createAction<DVBThreeStepsInitStates>(SET_IS_PLAYER_SURFACE_SET)(
    DVBThreeStepsInitStates.ok,
  );
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isPlayerSurfaceSet: DVBThreeStepsInitStates.ok,
  });
});

test('SET_PLAYER_ACTION_DONE', () => {
  const action = createAction<boolean>(SET_PLAYER_ACTION_DONE)(false);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isPlayerActionDone: false,
  });
});

test('SET_QUERY_RECORDINGS_STATE', () => {
  const action = createAction<DVBThreeStepsInitStates>(SET_QUERY_RECORDINGS_STATE)(
    DVBThreeStepsInitStates.ok,
  );
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    queryRecordingsState: DVBThreeStepsInitStates.ok,
  });
});

test('SET_IS_DVB_SIGAL_OK', () => {
  const action = createAction<boolean>(SET_IS_DVB_SIGAL_OK)(false);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isDvbSignalOk: false,
  });
});

test('SET_HAS_SATELLITE_CONNECTION', () => {
  const action = createAction<boolean>(SET_HAS_SATELLITE_CONNECTION)(false);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    hasSatelliteConnection: false,
  });
});
