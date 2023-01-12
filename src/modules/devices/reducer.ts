import { combineReducers } from 'redux';
import { DeactivateDeviceResponse, Device, Maybe, RegisterDeviceResponse } from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import {
  FETCH_DEVICES,
  REGISTER_DEVICE,
  UPDATE_DEVICE_NAME,
  DEACTIVATE_DEVICE,
  SET_PLAYBACK_DEVICE,
  SET_SERIAL_NUMBER,
} from './constants';
import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  registerDevice: createCustomModuleReducer<APIModuleState<Maybe<RegisterDeviceResponse>>>(
    {
      ...createApiReducer({
        actionType: REGISTER_DEVICE,
        onSuccess: (draftState, action) => {
          // eslint-disable-next-line no-param-reassign
          draftState.data = action.payload?.registerDevice;
        },
      }),
    },
    createApiInitialState(null),
  ),
  devices: createCustomModuleReducer<APIModuleState<Device[]>>(
    {
      ...createApiReducer({
        actionType: FETCH_DEVICES,
        onSuccess: (draftState, action) => {
          // eslint-disable-next-line no-param-reassign
          draftState.data = action.payload?.user?.devices;
        },
      }),
    },
    createApiInitialState([]),
  ),
  deactivateDevice: createCustomModuleReducer<APIModuleState<Maybe<DeactivateDeviceResponse>>>(
    {
      ...createApiReducer({
        actionType: DEACTIVATE_DEVICE,
        onSuccess: (draftState, action) => {
          // eslint-disable-next-line no-param-reassign
          draftState.data = action.payload?.deactivateDevice;
        },
      }),
    },
    createApiInitialState(null),
  ),
  updateDeviceName: createCustomModuleReducer<APIModuleState<Maybe<Device>>>(
    {
      ...createApiReducer({
        actionType: UPDATE_DEVICE_NAME,
        onSuccess: (draftState, action) => {
          // eslint-disable-next-line no-param-reassign
          draftState.data = action.payload?.updateDeviceName;
        },
      }),
    },
    createApiInitialState(null),
  ),
  playbackDevice: createCustomModuleReducer<any>(
    {
      [SET_PLAYBACK_DEVICE]: (state, action) => action.payload,
    },
    null,
  ),
  serialNumber: createCustomModuleReducer<any>(
    {
      [SET_SERIAL_NUMBER]: (state, action) => action.payload,
    },
    null,
  ),
};

export default combineReducers(reducers);
