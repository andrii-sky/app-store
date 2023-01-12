import { DVBThreeStepsInitStates } from '@/types/enums/DVBThreeStepsInitStates';
import { createAction } from '@reduxjs/toolkit';
import {
  SET_IS_MW_READY,
  SET_MW_CTX_COUNT,
  SET_MW_EVENT_SOURCE,
  SET_PLAYER_INSTANCE_ID,
  SET_SCAN_DVB_STATE,
  SET_HAS_MAIL,
  SET_IS_CAS_MODAL_DISPLAYED,
  SET_IS_SERVICE_STATUS_OPEN,
  SET_IS_CAS_HOME_SET,
  SET_DVB_RESERVATION_ID,
  SET_IS_PLAYER_SURFACE_SET,
  SET_PLAYER_ACTION_DONE,
  SET_QUERY_RECORDINGS_STATE,
  SET_IS_DVB_SIGAL_OK,
  SET_HAS_SATELLITE_CONNECTION,
} from './constants';

export const setIsMwReady = (isReady: boolean) => createAction<any>(SET_IS_MW_READY)(isReady);

export const setMwCtxCount = (count: number) => createAction<any>(SET_MW_CTX_COUNT)(count);

export const setScanDvbState = (initState: DVBThreeStepsInitStates) =>
  createAction<any>(SET_SCAN_DVB_STATE)(initState);

export const setPlayerInstanceId = (instanceId: string | number | null) =>
  createAction<any>(SET_PLAYER_INSTANCE_ID)(instanceId);

export const setIsPlayerSurfaceSet = (isSet: DVBThreeStepsInitStates) =>
  createAction<any>(SET_IS_PLAYER_SURFACE_SET)(isSet);

export const setPlayerActionDone = (isDone: boolean) =>
  createAction<any>(SET_PLAYER_ACTION_DONE)(isDone);

export const setMwEventSource = (source: any) => createAction<any>(SET_MW_EVENT_SOURCE)(source);

export const setIsCasHomeSet = (initState: DVBThreeStepsInitStates) =>
  createAction<any>(SET_IS_CAS_HOME_SET)(initState);

export const setDvbSignalReservationId = (reservationId: string) =>
  createAction<any>(SET_DVB_RESERVATION_ID)(reservationId);

export const setHasMail = (hasMail: boolean) => createAction<any>(SET_HAS_MAIL)(hasMail);

export const setIsServiceStatusOpen = (isStatusOpen: boolean) =>
  createAction<any>(SET_IS_SERVICE_STATUS_OPEN)(isStatusOpen);

export const setIsCasErrorModalDisplayed = (isCasErrorModalDisplayed: boolean) =>
  createAction<any>(SET_IS_CAS_MODAL_DISPLAYED)(isCasErrorModalDisplayed);

export const setQueryRecordingsState = (recordingsState: DVBThreeStepsInitStates) =>
  createAction<any>(SET_QUERY_RECORDINGS_STATE)(recordingsState);

export const setIsDvbSignalOk = (isOk: boolean) => createAction<any>(SET_IS_DVB_SIGAL_OK)(isOk);

export const setHasSatelliteConnection = (hasConnection: boolean) =>
  createAction<any>(SET_HAS_SATELLITE_CONNECTION)(hasConnection);
