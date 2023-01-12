import { createApiAction } from '@/utils/api';
import REGISTER_DEVICE_QUERY from '@/modules/devices/queries/registerDevice';
import UPDATE_DEVICE_NAME_QUERY from '@/modules/devices/queries/updateDeviceName';
import GET_DEVICES_QUERY from '@/modules/devices/queries/getDevices';
import DEACTIVATE_DEVICE_QUERY from '@/modules/devices/queries/deactivateDevice';
import { PlaybackDevice, RegisterDeviceInput } from '@/types/graph-ql';
import { createAction } from '@reduxjs/toolkit';
import {
  REGISTER_DEVICE,
  FETCH_DEVICES,
  UPDATE_DEVICE_NAME,
  DEACTIVATE_DEVICE,
  SET_PLAYBACK_DEVICE,
  SET_SERIAL_NUMBER,
} from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';

export const registerDevice = (device: RegisterDeviceInput) =>
  createApiAction(REGISTER_DEVICE, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: REGISTER_DEVICE_QUERY,
      variables: { registerDevice: device },
    },
    authenticated: true,
    graphQL: true,
  });

export const fetchDevices = () =>
  createApiAction(FETCH_DEVICES, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_DEVICES_QUERY,
    },
    authenticated: true,
    graphQL: true,
  });

export const deactivateDevice = (deviceId: string) =>
  createApiAction(DEACTIVATE_DEVICE, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: DEACTIVATE_DEVICE_QUERY,
      variables: { deviceId },
    },
    authenticated: true,
    graphQL: true,
    onSuccess: dispatch => {
      dispatch(fetchDevices());
    },
  });

export const updateDeviceName = (deviceId: string, deviceName: string) =>
  createApiAction(UPDATE_DEVICE_NAME, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: UPDATE_DEVICE_NAME_QUERY,
      variables: { deviceId, deviceName },
    },
    authenticated: true,
    graphQL: true,
  });

export const setPlaybackDevice = playbackDevice =>
  createAction<PlaybackDevice>(SET_PLAYBACK_DEVICE)(playbackDevice);

export const setSerialNumber = (serialNumber: string) =>
  createAction<string>(SET_SERIAL_NUMBER)(serialNumber);
