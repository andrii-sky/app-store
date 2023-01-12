import { createSelector } from 'reselect';

import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const decodersState = createSelector(moduleState, state => state.decoders);

export const decoders = createSelector(decodersState, contentRoot => contentRoot.data);

export const decodersIsLoading = createSelector(
  decodersState,
  contentRoot => contentRoot.isLoading,
);

export const decodersError = createSelector(decodersState, contentRoot => contentRoot.error);

const recordState = createSelector(moduleState, state => state.record);

export const recordIsLoading = createSelector(recordState, contentRoot => contentRoot.isLoading);

export const recordError = createSelector(recordState, contentRoot => contentRoot.error);
