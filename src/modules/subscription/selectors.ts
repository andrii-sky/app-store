import { createSelector } from 'reselect';

import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const subscriptions = createSelector(moduleState, state => state.subscriptions?.data);
export const subscriptionsError = createSelector(moduleState, state => state.subscriptions?.error);
