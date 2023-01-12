import { combineReducers } from 'redux';
import { createApiModuleReducer, createApiOnSuccessReducer } from '@/utils/api';
import { FETCH_USER_ATTRIBUTES } from './constants';

const reducers = {
  // Did not use createApiModuleReducer<UserAttributes[]> because we want null as initial state
  // This is because,[] is a valid api response and we need to able to differentiate initial state and api empty response
  userAttributes: createApiModuleReducer(
    {
      actionType: FETCH_USER_ATTRIBUTES,
      onSuccess: createApiOnSuccessReducer((_, action) => {
        return action.payload?.user?.attributes;
      }),
    },
    null,
  ),
};

export default combineReducers(reducers);
