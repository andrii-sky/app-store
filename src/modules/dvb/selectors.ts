import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const mwCtxCount = createSelector(moduleState, state => state.mwCtxCount);

export const isMwReady = createSelector(moduleState, state => state.isMwReady);

export const mwEventSource = createSelector(moduleState, state => state.mwEventSource);

export const playerInstanceId = createSelector(moduleState, state => state.playerInstanceId);

export const hasMail = createSelector(moduleState, state => state.hasMail);

export const isServiceStatusOpen = createSelector(moduleState, state => state.isServiceStatusOpen);

export const isCasErrorModalDisplayed = createSelector(
  moduleState,
  state => state.isCasErrorModalDisplayed,
);

export const scanDvbState = createSelector(moduleState, state => state.scanDvbState);

export const dvbSignalReservationId = createSelector(
  moduleState,
  state => state.dvbSignalReservationId,
);

export const isCasHomeSet = createSelector(moduleState, state => state.isCasHomeSet);

export const isPlayerSurfaceSet = createSelector(moduleState, state => state.isPlayerSurfaceSet);

export const isPlayerActionDone = createSelector(moduleState, state => state.isPlayerActionDone);

export const queryRecordingsState = createSelector(
  moduleState,
  state => state.queryRecordingsState,
);

export const isDvbSignalOk = createSelector(moduleState, state => state.isDvbSignalOk);

export const hasSatelliteConnection = createSelector(
  moduleState,
  state => state.hasSatelliteConnection,
);
