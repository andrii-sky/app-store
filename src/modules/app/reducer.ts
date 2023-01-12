import { combineReducers } from 'redux';

import { SET_EPG_LOADED, SET_NAVIGATION_READY, SET_REALM_SYNCED } from './constants';
import { createCustomModuleReducer } from '../../utils/api';

const reducers = {
  isNavigationReady: createCustomModuleReducer<any>(
    {
      [SET_NAVIGATION_READY]: (state, action) => action.payload,
    },
    false,
  ),
  isRealmSynced: createCustomModuleReducer<any>(
    {
      [SET_REALM_SYNCED]: (state, action) => action.payload,
    },
    false,
  ),
  isEPGLoaded: createCustomModuleReducer<any>(
    {
      [SET_EPG_LOADED]: (state, action) => action.payload,
    },
    false,
  ),
};

export default combineReducers(reducers);
