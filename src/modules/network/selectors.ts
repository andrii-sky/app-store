import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

// eslint-disable-next-line import/prefer-default-export
export const isInternetConnected = createSelector(moduleState, state => state.isInternetConnected);
export const internetSource = createSelector(moduleState, state => state.internetSource);
