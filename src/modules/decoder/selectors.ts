import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const activateStbDeviceState = createSelector(moduleState, state => state.activateStbDevice);

export const activateStbDeviceIsLoading = createSelector(
  activateStbDeviceState,
  contentRoot => contentRoot.isLoading,
);

export const activateStbDeviceSuccess = createSelector(
  activateStbDeviceState,
  contentRoot => contentRoot.data,
);

export const activateStbDeviceError = createSelector(
  activateStbDeviceState,
  contentRoot => contentRoot.error,
);

export const isDeviceActivationInitiated = createSelector(
  moduleState,
  state => state.deviceActivationInitiated,
);
