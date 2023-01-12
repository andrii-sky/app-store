import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const focusedRow = createSelector(moduleState, state => state?.focusedRow);

export const focusedElement = createSelector(moduleState, state => state?.focusedElement);

export const isFocused = createSelector(moduleState, state => state?.isFocused);

export const focusedState = createSelector(moduleState, state => state);
