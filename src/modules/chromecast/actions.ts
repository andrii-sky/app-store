import { createAction } from '@reduxjs/toolkit';
import {
  SET_IS_CONNECTING,
  SET_DEVICES,
  SET_IS_CONNECTED,
  CONNECTING_ERROR,
  CASTING_ERROR,
  SET_CONNECTED_DEVICE,
  SET_CASTING_IS_LOADING,
  SET_CASTING_DATA,
  SET_IS_PLAYER_EXPANDED,
  SET_IS_PLAYER_SEASONS_SELECTOR_VISIBLE,
  SET_IS_READY_TO_CAST,
  SET_IS_ATTEMPTING_TO_CAST,
  SET_IS_DEVICE_MODAL_OPEN,
  SET_VOLUME_LEVEL,
} from '@/modules/chromecast/constants';

export const setDevices = devices => createAction<any[]>(SET_DEVICES)(devices);
export const setIsConnected = isConnected => createAction<boolean>(SET_IS_CONNECTED)(isConnected);
export const setIsConnecting = isConnecting =>
  createAction<boolean>(SET_IS_CONNECTING)(isConnecting);
export const setIsPlayerExpanded = isPlayerExpanded =>
  createAction<boolean>(SET_IS_PLAYER_EXPANDED)(isPlayerExpanded);
export const setIsPlayerSeasonsSelectorVisible = isPlayerSeasonsSelectorVisible =>
  createAction<boolean>(SET_IS_PLAYER_SEASONS_SELECTOR_VISIBLE)(isPlayerSeasonsSelectorVisible);
export const setConnectedDevice = device => createAction<any>(SET_CONNECTED_DEVICE)(device);
export const setCastingIsLoading = castingIsLoading =>
  createAction<boolean>(SET_CASTING_IS_LOADING)(castingIsLoading);
export const setCastingData = castingData => createAction<any>(SET_CASTING_DATA)(castingData);
export const setConnectingError = connectionError =>
  createAction<any>(CONNECTING_ERROR)(connectionError);
export const setCastingError = castingError => createAction<any>(CASTING_ERROR)(castingError);
export const setIsReadyToCast = isAvailable =>
  createAction<boolean>(SET_IS_READY_TO_CAST)(isAvailable);
export const setIsAttemptingToCast = isAttempting =>
  createAction<boolean>(SET_IS_ATTEMPTING_TO_CAST)(isAttempting);
export const setIsDeviceModalOpen = isOpen =>
  createAction<boolean>(SET_IS_DEVICE_MODAL_OPEN)(isOpen);
export const setVolumeLevel = level => createAction<number>(SET_VOLUME_LEVEL)(level);
