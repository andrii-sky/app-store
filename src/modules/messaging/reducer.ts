import { combineReducers } from 'redux';

import { createCustomModuleReducer } from '@/utils/api';
import { SET_GLOBAL_MESSAGE } from '@/modules/messaging/constants';

const reducers = {
  globalMessage: createCustomModuleReducer<string | null>(
    {
      [SET_GLOBAL_MESSAGE]: (state, action) => action.payload,
    },
    null,
  ),
};

export default combineReducers(reducers);
