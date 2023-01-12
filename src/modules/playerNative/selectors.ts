import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const isFullScreen = createSelector(moduleState, state => state.isFullScreen);

export const isChromecastDevicesVisible = createSelector(
  moduleState,
  state => state.isChromecastDevicesVisible,
);

export const isContentRestricted = createSelector(moduleState, state => state.isContentRestricted);

export const getLastCheckedContent = createSelector(moduleState, state => state.lastCheckedContent);
