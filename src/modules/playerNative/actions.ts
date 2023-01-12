import { createAction } from '@reduxjs/toolkit';
import {
  SET_IS_FULL_SCREEN,
  SET_IS_CHROMECAST_DEVICES_VISIBLE,
  SET_IS_CONTENT_RESTRICTED,
  SET_LAST_CHECKED_CONTENT,
} from './constants';

export const setIsFullScreen = isFullScreen =>
  createAction<boolean>(SET_IS_FULL_SCREEN)(isFullScreen);

export const setIsChromecastDevicesVisible = isVisible =>
  createAction<boolean>(SET_IS_CHROMECAST_DEVICES_VISIBLE)(isVisible);

export const setIsContentRestricted = isContentRestricted =>
  createAction<boolean>(SET_IS_CONTENT_RESTRICTED)(isContentRestricted);

export const setLastCheckedContent = content =>
  createAction<boolean>(SET_LAST_CHECKED_CONTENT)(content);
