import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const isNavigationReady = createSelector(moduleState, state => state.isNavigationReady);

export const isRealmSynced = createSelector(moduleState, state => state.isRealmSynced);

export const isEPGLoaded = createSelector(moduleState, state => state.isEPGLoaded);
