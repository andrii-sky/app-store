import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const dateString = createSelector(moduleState, state => state.dateString);

export const isMenuOpen = createSelector(moduleState, state => state.isMenuOpen);

export const isDisabledRCU = createSelector(moduleState, state => state.isDisabledRCU);

export const isOnScreenGuideVisible = createSelector(
  moduleState,
  state => state.isOnScreenGuideVisible,
);

export const longPressModeId = createSelector(moduleState, state => state.longPressModeId);

export const isKeyBoardOpen = createSelector(moduleState, state => state.isKeyBoardOpen);
