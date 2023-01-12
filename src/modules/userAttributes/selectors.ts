import { createSelector } from 'reselect';

import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const attributes = createSelector(moduleState, state => state.userAttributes?.data);
export const attriburtesError = createSelector(moduleState, state => state.userAttributes?.error);
