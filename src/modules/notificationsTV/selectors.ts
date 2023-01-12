import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const notificationCount = createSelector(moduleState, state => state.notificationCount);

export const notificationsSeen = createSelector(moduleState, state => state.notificationsSeen);
