import { createReducer } from '@reduxjs/toolkit';
import {
  SET_DATE_STRING,
  SET_IS_DISABLED_RCU,
  SET_IS_MENU_OPEN,
  SET_IS_ON_SCREEN_GUIDE_VISIBLE,
  SET_KEYBOARD_OPEN,
  SET_LONG_PRESS_MODE_ID,
} from './constants';

export const initialState = {
  dateString: '',
  isMenuOpen: false,
  isDisabledRCU: false,
  isOnScreenGuideVisible: false,
  longPressModeId: '',
  isKeyBoardOpen: false,
};

const reducers = {
  [SET_DATE_STRING]: (state, action) => ({
    ...state,
    dateString: action.payload,
  }),
  [SET_IS_MENU_OPEN]: (state, action) => ({
    ...state,
    isMenuOpen: action.payload,
  }),
  [SET_IS_DISABLED_RCU]: (state, action) => ({
    ...state,
    isDisabledRCU: action.payload,
  }),
  [SET_IS_ON_SCREEN_GUIDE_VISIBLE]: (state, action) => ({
    ...state,
    isOnScreenGuideVisible: action.payload,
  }),
  [SET_KEYBOARD_OPEN]: (state, action) => ({
    ...state,
    isKeyBoardOpen: action.payload,
  }),
  [SET_LONG_PRESS_MODE_ID]: (state, action) => ({
    ...state,
    longPressModeId: action.payload,
  }),
};

export default createReducer(initialState, reducers);
