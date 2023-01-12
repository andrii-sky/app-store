import { combineReducers } from 'redux';

import { createCustomModuleReducer } from '@/utils/api';
import { SAVE_FEATURE_FLAG, SAVE_ALL_FEATURE_FLAGS } from './constants';

const reducers = {
  flags: createCustomModuleReducer<any>(
    {
      [SAVE_FEATURE_FLAG]: (draftState, action) => {
        const { name, value } = action.payload;
        if (name) {
          draftState[name] = value;
        }
      },
      [SAVE_ALL_FEATURE_FLAGS]: (draftState, action) => {
        return action.payload;
      },
    },
    {},
  ),
};

export default combineReducers(reducers);
