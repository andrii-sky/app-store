import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const isConnected = createSelector(moduleState, state => state.isConnected);
export const isAvailable = createSelector(moduleState, state => state.isAvailable);
