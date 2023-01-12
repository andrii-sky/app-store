import { createSelector } from 'reselect';

import { Typename } from '@/types/enums/Typename';
import dayjs from 'dayjs';
import { namespace } from './constants';
import reducer from './reducer';
import { selectedProfileId } from '../customer/selectors';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const parentalSettings = createSelector(moduleState, state => state.parentalSettings.data);
export const isLoading = createSelector(moduleState, state => state.parentalSettings.isLoading);
export const parentalPinValidation = createSelector(
  moduleState,
  selectedProfileId,
  (state, profileId) => {
    return state.parentalPinValidation.data[profileId];
  },
);

export const parentalControl = createSelector(
  parentalSettings,
  settings => settings?.parentalControl,
);

export const approvedClassification = createSelector(
  parentalSettings,
  settings => settings?.approvedClassification,
);

export const pinValidationStatus = createSelector(
  parentalSettings,
  settings => settings?.pinValidationStatus,
);

export const pinValidationResult = createSelector(
  parentalPinValidation,
  pinValidation => pinValidation?.pinValidationResult,
);

export const isLoadingValidation = createSelector(
  moduleState,
  state => state.parentalPinValidation?.isLoading,
);

export const validationError = createSelector(
  moduleState,
  state => state.parentalPinValidation?.error,
);

export const parentalSettingsError = createSelector(
  moduleState,
  state => state.parentalSettings?.error,
);

export const pinExpiry = createSelector(parentalPinValidation, pinValidation => {
  if (pinValidation) {
    const { pinValidationResult: result, expiryDate } = pinValidation;
    if (result.__typename === Typename.PinValidationResult && result?.isValid) {
      return expiryDate;
    }
  }
  return undefined;
});

export const hasPinExpired = date => {
  return date ? dayjs().isAfter(date) : true;
};
