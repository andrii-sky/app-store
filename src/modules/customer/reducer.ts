import { combineReducers } from 'redux';
import { Maybe } from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import {
  CREATE_CUSTOMER_PROFILE,
  DELETE_CUSTOMER_PROFILE,
  GET_CUSTOMER_ACCOUNT,
  SET_SELECTED_CUSTOMER_PROFILE_ID,
  UPDATE_CUSTOMER_PROFILE,
  SET_SELECTED_PROFILE,
  PURCHASE_TVOD,
} from './constants';
import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  account: createCustomModuleReducer<APIModuleState<Maybe<any>>>(
    {
      ...createApiReducer({
        actionType: GET_CUSTOMER_ACCOUNT,
        onSuccess: (draftState, action) => {
          draftState.data = action.payload?.customer;
        },
      }),
      ...createApiReducer({
        actionType: CREATE_CUSTOMER_PROFILE,
        onSuccess: (draftState, action) => {
          draftState.data.profiles.push(action.payload?.createProfile);
        },
      }),
      ...createApiReducer({
        actionType: UPDATE_CUSTOMER_PROFILE,
        onSuccess: (draftState, action) => {
          const { profiles } = draftState.data;
          const index = profiles?.findIndex(
            profileItem => profileItem.id === action.payload?.updateProfile.id,
          );
          if (index > -1) {
            profiles[index] = action.payload?.updateProfile;
          } else {
            profiles.push(action.payload?.updateProfile);
          }
        },
      }),
      ...createApiReducer({
        actionType: DELETE_CUSTOMER_PROFILE,
        onSuccess: (draftState, action) => {
          const { profiles } = draftState.data;
          const { id } = action.meta;
          const index = profiles?.findIndex(profileItem => profileItem.id === id);
          if (index > -1) {
            profiles.splice(index, 1);
          }
        },
      }),
      ...createApiReducer({
        actionType: PURCHASE_TVOD,
        onSuccess: (draftState, action) => {
          if (action.payload) {
            draftState.data.tvodPurchases = [...draftState.data?.tvodPurchases, action.payload];
          }
        },
      }),
      [SET_SELECTED_PROFILE]: (draftState, action) => {
        const { profile } = action.payload;

        draftState.data.profiles = [profile];
      },
    },
    createApiInitialState({}),
  ),
  selectedProfileId: createCustomModuleReducer<any>(
    {
      [SET_SELECTED_CUSTOMER_PROFILE_ID]: (draftState, action) => action.payload.id,
    },
    null,
  ),
};

export default combineReducers(reducers);
