import { combineReducers } from 'redux';

import { createCustomModuleReducer } from '@/utils/api';
import { SET_INTERNET_CONNECTED, SET_INTERNET_SOURCE } from '@/modules/network/constants';

const reducers = {
  isInternetConnected: createCustomModuleReducer<boolean>(
    {
      [SET_INTERNET_CONNECTED]: (state, action) => action.payload,
    },
    true,
  ),
  internetSource: createCustomModuleReducer<string>(
    {
      [SET_INTERNET_SOURCE]: (state, action) => action.payload,
    },
    '',
  ),
};

export default combineReducers(reducers);
