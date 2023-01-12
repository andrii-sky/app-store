import { createSelector } from 'reselect';
import { isNil } from 'ramda';
import { createApiSelector } from '../../utils/api';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const results = createApiSelector(moduleState, 'result');
export const result = createSelector(results, state => state.data);
export const resultIsLoading = createSelector(results, state => state.isLoading);
export const resultError = createSelector(results, state => state.error);
export const query = createApiSelector(moduleState, 'query');
const suggestions = createApiSelector(moduleState, 'suggestions');
export const popular = createApiSelector(moduleState, 'popular');
export const similar = createApiSelector(moduleState, 'similar');
export const suggestionsResult = createSelector(suggestions, state =>
  state.data?.filter(item => !isNil(item)).map(item => item.title),
);
export const suggestionsIsLoading = createSelector(suggestions, state => state.isLoading);
