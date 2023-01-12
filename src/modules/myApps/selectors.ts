import { createRailsSelectors } from '@/utils/Rails';
import { createSelector } from 'reselect';
import memoize from '@/utils/fastMemoize';
import { equals } from 'ramda';
import { namespace } from './constants';
import reducer from './reducer';

export const {
  rails,
  rail,
  isLoading,
  error,
  railsShallow,
  continueWatchingRailId,
} = createRailsSelectors(namespace, reducer);

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const installedList = createSelector(moduleState, state => state.installed);

export const allApps = createSelector(moduleState, state => state.allApps?.data);

export const getBanner = createSelector(moduleState, state =>
  memoize((appId: string) => {
    return state?.installed?.find(item => equals(appId, item?.packageName))?.banner;
  }),
);

export const favouriteList = createSelector(
  rails,
  state => state?.find(r => equals(r?.layout, 'FAVOURITE_APPS'))?.contentPage?.content,
);

export const installedListById = createSelector(moduleState, state => {
  return state?.installed?.reduce((r, app) => {
    // eslint-disable-next-line no-param-reassign
    r[app?.packageName] = app;
    return r;
  }, {});
});

export const isMandatory = createSelector(favouriteList, state => (appId: string) => {
  return state?.find(item => equals(appId, item?.id))?.mandatory;
});
