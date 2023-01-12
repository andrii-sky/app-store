import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const devices = createSelector(moduleState, state => state.devices);
export const connectedDevice = createSelector(moduleState, state => state.connectedDevice);
export const isConnected = createSelector(moduleState, state => state.isConnected);
export const isConnecting = createSelector(moduleState, state => state.isConnecting);
export const isPlayerExpanded = createSelector(moduleState, state => state.isPlayerExpanded);
export const isReadyToCast = createSelector(moduleState, state => state.isReadyToCast);
export const isAttemptingToCast = createSelector(moduleState, state => state.isAttemptingToCast);
export const isDeviceModalOpen = createSelector(moduleState, state => state.isDeviceModalOpen);

export const isPlayerSeasonsSelectorVisible = createSelector(
  moduleState,
  state => state.isPlayerSeasonsSelectorVisible,
);
export const castingError = createSelector(moduleState, state => state.casting.error);
export const castingData = createSelector(moduleState, state => state.casting.data);
export const castingIsLoading = createSelector(moduleState, state => state.casting.isLoading);
export const connectingError = createSelector(moduleState, state => state.connectingError);
export const volume = createSelector(moduleState, state => state.volume);
