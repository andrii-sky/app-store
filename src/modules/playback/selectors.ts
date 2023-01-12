import { createSelector } from 'reselect';
import { isEmpty, isNil } from 'ramda';

import { Typename } from '@/types/enums/Typename';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const playbackMetaState = createSelector(moduleState, state => state.playbackMetaByMediaAssetId);
export const playbackMetaIsLoading = createSelector(playbackMetaState, state => state.isLoading);
export const playbackMetaError = createSelector(playbackMetaState, state => state.error);

const playbackConcurrencyState = createSelector(
  moduleState,
  state => state.playbackConcurrencyById,
);
export const playbackConcurrencyIsLoading = createSelector(
  playbackConcurrencyState,
  state => state.isLoading,
);

const offlinePlaybackState = createSelector(
  moduleState,
  state => state.offlinePlaybackMetaByMediaAssetId,
);

export const offlinePlaybackIsLoading = createSelector(
  offlinePlaybackState,
  state => state.isLoading,
);

export const offlinePlaybackError = createSelector(offlinePlaybackState, state => state.error);

export const isConcurrentPlaybackError = createSelector(
  playbackMetaState,
  state => (mediaAssetId: string) => {
    if (state.data[mediaAssetId]) {
      // eslint-disable-next-line no-underscore-dangle
      return state.data[mediaAssetId].__typename === Typename.ConcurrencyError;
    }
    return false;
  },
);

export const getSubscriptions = createSelector(
  playbackMetaState,
  state => (mediaAssetId: string) => {
    const asset = state.data[mediaAssetId];
    if (asset?.__typename === Typename.SubscriptionNeeded) {
      return asset.subscriptions;
    }
    return null;
  },
);

export const getPlaybackMeta = createSelector(
  playbackMetaState,
  getSubscriptions,
  isConcurrentPlaybackError,
  (state, getSubscriptionsState, isConcurrentError) => (mediaAssetId: string) => {
    const subscriptions = getSubscriptionsState(mediaAssetId);
    if (!isConcurrentError(mediaAssetId) && (isNil(subscriptions) || isEmpty(subscriptions))) {
      return state.data[mediaAssetId];
    }
    return undefined;
  },
);

export const getOfflineSubscriptions = createSelector(
  offlinePlaybackState,
  state => (mediaAssetId: string) => {
    const asset = state.data[mediaAssetId];
    if (asset?.__typename === Typename.SubscriptionNeeded) {
      return asset.subscriptions;
    }
    return null;
  },
);

export const getOfflinePlaybackMeta = createSelector(
  offlinePlaybackState,
  getOfflineSubscriptions,
  (state, getOfflineSubscriptionsState) => (mediaAssetId: string) => {
    const subscriptions = getOfflineSubscriptionsState(mediaAssetId);
    if (isNil(subscriptions) || isEmpty(subscriptions)) {
      return state.data[mediaAssetId];
    }
    return undefined;
  },
);
