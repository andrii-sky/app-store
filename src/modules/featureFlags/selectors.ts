import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const isFeatureEnabled = createSelector(moduleState, state => (featureName: string) => {
  return state.flags[featureName]?.value !== undefined ? state.flags[featureName].value : false;
});

export const getFeatureConfig = createSelector(moduleState, state => (featureName: string) => {
  return state.flags[featureName]?.config !== undefined ? state.flags[featureName].config : null;
});
