import { createSelector } from 'reselect';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const registerDeviceState = createSelector(moduleState, state => state.registerDevice);

export const deviceRegistrationLimitExceeded = createSelector(
  registerDeviceState,
  contentRoot =>
    contentRoot.data?.__typename &&
    contentRoot.data?.__typename === 'DeviceRegistrationLimitExceeded',
);

export const isNewlyRegisteredDevice = createSelector(
  registerDeviceState,
  contentRoot =>
    contentRoot.data?.__typename === 'Device' &&
    contentRoot.data?.lastUsed === contentRoot.data?.registeredOn,
);

export const deviceRegistrationIsLoading = createSelector(
  registerDeviceState,
  contentRoot => contentRoot.isLoading,
);

export const deviceRegistrationError = createSelector(
  registerDeviceState,
  contentRoot => contentRoot.error,
);

const devicesState = createSelector(moduleState, state => state.devices);

export const devices = createSelector(devicesState, contentRoot => contentRoot.data);

export const devicesIsLoading = createSelector(devicesState, contentRoot => contentRoot.isLoading);

export const devicesError = createSelector(devicesState, contentRoot => contentRoot.error);

const deactivateDeviceState = createSelector(moduleState, state => state.deactivateDevice);

export const deactivateDeviceIsLoading = createSelector(
  deactivateDeviceState,
  contentRoot => contentRoot.isLoading,
);

export const deviceDeactivationLimitExceeded = createSelector(
  deactivateDeviceState,
  contentRoot =>
    contentRoot.data?.__typename &&
    contentRoot.data?.__typename === 'DeviceDeactivationLimitExceeded',
);

export const deactivateDeviceError = createSelector(
  deactivateDeviceState,
  contentRoot => contentRoot.error,
);

const updateDeviceNameState = createSelector(moduleState, state => state.updateDeviceName);

export const updateDeviceName = createSelector(
  updateDeviceNameState,
  contentRoot => contentRoot.data,
);

export const updateDeviceNameIsLoading = createSelector(
  updateDeviceNameState,
  contentRoot => contentRoot.isLoading,
);

export const updateDeviceNameError = createSelector(
  updateDeviceNameState,
  contentRoot => contentRoot.error,
);

const playbackDeviceState = createSelector(moduleState, state => state.playbackDevice);

export const getPlaybackDeviceInfo = createSelector(
  playbackDeviceState,
  contentRoot => contentRoot,
);

const serialNumberState = createSelector(moduleState, state => state.serialNumber);

export const getSerialNumber = createSelector(serialNumberState, contentRoot => contentRoot);
