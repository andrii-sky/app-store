import { createSelector } from 'reselect';
import { SkyCustomerAccountStatus } from '@/types/graph-ql';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const getCustomerProfiles = createSelector(moduleState, state => {
  return state.account?.data?.profiles;
});

export const accountIsLoading = createSelector(moduleState, state => state.account.isLoading);

export const accountError = createSelector(moduleState, state => state.account.error);

export const selectedProfileId = createSelector(moduleState, state => state.selectedProfileId);

export const selectedProfile = createSelector(moduleState, state =>
  state.account.data?.profiles?.find(element => element.id === state.selectedProfileId),
);

export const isPurchasingAvailable = createSelector(moduleState, state => {
  return (
    state.account.data?.tier?.__typename === 'SkyCustomerAccountTier' &&
    state.account.data?.tier?.status === SkyCustomerAccountStatus.Active
  );
});

export const getTvodPurchasesByContentId = createSelector(
  moduleState,
  state => (brandId: string, deviceId: string) => {
    return state.account?.data?.tvodPurchases?.find(
      purchase => purchase?.offer?.content?.id === brandId && purchase?.deviceId === deviceId,
    );
  },
);
