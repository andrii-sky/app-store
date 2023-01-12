import { DVBThreeStepsInitStates } from '@/types/enums/DVBThreeStepsInitStates';
import { createReducer } from '@reduxjs/toolkit';
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
} from './constants';

export const initialState = {
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

const reducers = {
  [SET_IS_MW_READY]: (state, action) => ({
    ...state,
    isMwReady: action.payload,
  }),
  [SET_MW_CTX_COUNT]: (state, action) => ({
    ...state,
    mwCtxCount: action.payload,
  }),
  [SET_MW_EVENT_SOURCE]: (state, action) => ({
    ...state,
    mwEventSource: action.payload,
  }),
  [SET_PLAYER_INSTANCE_ID]: (state, action) => ({
    ...state,
    playerInstanceId: action.payload,
  }),
  [SET_SCAN_DVB_STATE]: (state, action) => ({
    ...state,
    scanDvbState: action.payload,
  }),
  [SET_HAS_MAIL]: (state, action) => ({
    ...state,
    hasMail: action.payload,
  }),
  [SET_IS_SERVICE_STATUS_OPEN]: (state, action) => ({
    ...state,
    isServiceStatusOpen: action.payload,
  }),
  [SET_IS_CAS_MODAL_DISPLAYED]: (state, action) => ({
    ...state,
    isCasErrorModalDisplayed: action.payload,
  }),
  [SET_IS_CAS_HOME_SET]: (state, action) => ({
    ...state,
    isCasHomeSet: action.payload,
  }),
  [SET_DVB_RESERVATION_ID]: (state, action) => ({
    ...state,
    dvbSignalReservationId: action.payload,
  }),
  [SET_IS_PLAYER_SURFACE_SET]: (state, action) => ({
    ...state,
    isPlayerSurfaceSet: action.payload,
  }),
  [SET_PLAYER_ACTION_DONE]: (state, action) => ({
    ...state,
    isPlayerActionDone: action.payload,
  }),
  [SET_QUERY_RECORDINGS_STATE]: (state, action) => ({
    ...state,
    queryRecordingsState: action.payload,
  }),
  [SET_IS_DVB_SIGAL_OK]: (state, action) => ({
    ...state,
    isDvbSignalOk: action.payload,
  }),
  [SET_HAS_SATELLITE_CONNECTION]: (state, action) => ({
    ...state,
    hasSatelliteConnection: action.payload,
  }),
};

export default createReducer(initialState, reducers);
