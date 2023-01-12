import { createAction } from '@reduxjs/toolkit';
import {
  SET_DATE_STRING,
  SET_IS_DISABLED_RCU,
  SET_IS_MENU_OPEN,
  SET_IS_ON_SCREEN_GUIDE_VISIBLE,
  SET_KEYBOARD_OPEN,
  SET_LONG_PRESS_MODE_ID,
} from './constants';

export const setDateString = (dateString: string) => createAction<any>(SET_DATE_STRING)(dateString);

export const setDisableRCU = (isDisabled: boolean) =>
  createAction<any>(SET_IS_DISABLED_RCU)(isDisabled);

export const setIsMenuOpen = (isOpen: boolean) => createAction<any>(SET_IS_MENU_OPEN)(isOpen);

export const setIsOnScreenGuideVisible = (isVisible: boolean) =>
  createAction<any>(SET_IS_ON_SCREEN_GUIDE_VISIBLE)(isVisible);

export const setLongPressModeId = (longPressId: string) =>
  createAction<any>(SET_LONG_PRESS_MODE_ID)(longPressId);

export const setIsKeyBoardOpen = (isOpen: boolean) => createAction<any>(SET_KEYBOARD_OPEN)(isOpen);
