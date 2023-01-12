import { combineReducers } from 'redux';
import { SkySubscription } from '@/types/graph-ql';
import { FETCH_USER_SUBSCRIPTIONS } from './constants';
import { createApiModuleReducer, createApiOnSuccessReducer } from '../../utils/api';

const reducers = {
  subscriptions: createApiModuleReducer<SkySubscription[]>(
    {
      actionType: FETCH_USER_SUBSCRIPTIONS,
      onSuccess: createApiOnSuccessReducer((_, action) => {
        return action.payload?.user?.subscriptions;
      }),
    },
    [],
  ),
};

export default combineReducers(reducers);
