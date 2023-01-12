import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

// eslint-disable-next-line import/prefer-default-export
export const globalMessage = createSelector(moduleState, state => state.globalMessage);
