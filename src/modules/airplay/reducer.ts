import { combineReducers } from 'redux';

import { createCustomModuleReducer } from '@/utils/api';
import { SET_AIRPLAY_AVAILABLE, SET_AIRPLAY_CONNECTED } from '@/modules/airplay/constants';

const reducers = {
  isConnected: createCustomModuleReducer<boolean>(
    {
      [SET_AIRPLAY_CONNECTED]: (state, action) => action.payload,
    },
    false,
  ),
  isAvailable: createCustomModuleReducer<boolean>(
    {
      [SET_AIRPLAY_AVAILABLE]: (state, action) => action.payload,
    },
    false,
  ),
};

export default combineReducers(reducers);
