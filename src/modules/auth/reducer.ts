import { combineReducers } from 'redux';

import { Maybe, SkyExperience } from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import {
  SET_ACCESS_TOKEN,
  UNAUTHORIZED_ERROR,
  SET_USER,
  FETCH_CONFIG,
  SET_AUTH_LOADING,
} from './constants';
import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  accessToken: createCustomModuleReducer<any>(
    {
      [SET_ACCESS_TOKEN]: (state, action) => action.payload,
    },
    '',
  ),
  user: createCustomModuleReducer<any>(
    {
      [SET_USER]: (state, action) => action.payload,
    },
    null,
  ),
  error: createCustomModuleReducer<any>(
    {
      [SET_ACCESS_TOKEN]: () => null,
      [UNAUTHORIZED_ERROR]: (state, action) => action.payload,
    },
    null,
  ),
  config: createCustomModuleReducer<APIModuleState<Maybe<{ experience: Maybe<SkyExperience> }>>>(
    {
      ...createApiReducer({
        actionType: FETCH_CONFIG,
        onSuccess: (draftState, action) => {
          draftState.data = action.payload;
        },
      }),
    },
    createApiInitialState(null),
  ),
  isLoading: createCustomModuleReducer<any>(
    {
      [SET_AUTH_LOADING]: (state, action) => action.payload,
    },
    null,
  ),
};

export default combineReducers(reducers);
