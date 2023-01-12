import { createApiAction } from '@/utils/api';
import { Scalars } from '@/types/graph-ql';
import { createAction } from '@reduxjs/toolkit';
import CUSTOMER_PROFILES_QUERY from '@/modules/customer/queries/getCustomerAccount';
import CUSTOMER_PROFILE_BY_ID_QUERY from '@/modules/customer/queries/getCustomerProfileById';
import CREATE_CUSTOMER_PROFILE_QUERY from '@/modules/customer/queries/createCustomerProfile';
import UPDATE_CUSTOMER_PROFILE_QUERY from '@/modules/customer/queries/updateCustomerProfile';
import DELETE_CUSTOMER_PROFILE_QUERY from '@/modules/customer/queries/deleteCustomerProfile';
import PURCHASE_TVOD_QUERY from '@/modules/customer/queries/purchaseTvod';
import PURCHASE_PPV_QUERY from '@/modules/customer/queries/purchasePpv';
import {
  GET_CUSTOMER_ACCOUNT,
  CREATE_CUSTOMER_PROFILE,
  DELETE_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE_BY_ID,
  UPDATE_CUSTOMER_PROFILE,
  SET_SELECTED_CUSTOMER_PROFILE_ID,
  SET_SELECTED_PROFILE,
  PURCHASE_TVOD,
  PURCHASE_PPV,
} from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import {
  selectedProfileId,
  getCustomerProfiles as getCustomerProfilesSelectors,
} from './selectors';

export const setDefaultSelectedProfile = (profile: any) =>
  createAction<any>(SET_SELECTED_PROFILE)({ profile });

export const setSelectedProfileId = (id: string) =>
  createAction<any>(SET_SELECTED_CUSTOMER_PROFILE_ID)({ id });

export const setSelectedProfile = profile => dispatch => {
  return [
    dispatch(setDefaultSelectedProfile(profile)),
    dispatch(setSelectedProfileId(profile?.id)),
  ];
};

export const getCustomerAccount = () =>
  createApiAction(GET_CUSTOMER_ACCOUNT, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: CUSTOMER_PROFILES_QUERY,
    },
    authenticated: true,
    graphQL: true,
  });

export const getCustomerProfileById = (id: string) =>
  createApiAction(GET_CUSTOMER_PROFILE_BY_ID, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: CUSTOMER_PROFILE_BY_ID_QUERY,
      variables: { id },
    },
    authenticated: true,
    graphQL: true,
  });

// For phase 1 we dont need avatar parameter hence making it optional
export const createCustomerProfile = (name: string, avatar?: Scalars['ID']) =>
  createApiAction(CREATE_CUSTOMER_PROFILE, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: CREATE_CUSTOMER_PROFILE_QUERY,
      variables: { name, avatar },
    },
    authenticated: true,
    graphQL: true,
  });

export const updateCustomerProfile = (id: Scalars['ID'], name: string) => (dispatch, getState) => {
  const profiles = getCustomerProfilesSelectors(getState());
  let selectedAvatar = null;

  if (profiles) {
    selectedAvatar = profiles.find(el => el.id === id).customerProfileAvatar.id;
  }
  return dispatch(
    createApiAction(UPDATE_CUSTOMER_PROFILE, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: UPDATE_CUSTOMER_PROFILE_QUERY,
        variables: { id, name, avatar: selectedAvatar },
      },
      authenticated: true,
      graphQL: true,
    }),
  );
};

export const deleteCustomerProfile = (id: Scalars['ID']) => (dispatch, getState) => {
  return dispatch(
    createApiAction(DELETE_CUSTOMER_PROFILE, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: DELETE_CUSTOMER_PROFILE_QUERY,
        variables: { id },
      },
      authenticated: true,
      graphQL: true,
      meta: { id },
      onSuccess: successDispatch => {
        const profiles = getCustomerProfilesSelectors(getState());
        const defaultProfile = profiles.find(el => el.isDefault === true);

        const selectedProfileID = selectedProfileId(getState());

        if (id === selectedProfileID) {
          successDispatch(setSelectedProfileId(defaultProfile.id));
        }
      },
    }),
  );
};

export const purchaseTvod = (tvodOfferId: string, deviceId: string) =>
  createApiAction(PURCHASE_TVOD, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: PURCHASE_TVOD_QUERY,
      variables: { tvodOfferId, deviceId },
    },
    authenticated: true,
    graphQL: true,
  });

export const purchasePpv = (payPerViewOfferId: string, deviceId: string) =>
  createApiAction(PURCHASE_PPV, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: PURCHASE_PPV_QUERY,
      variables: { payPerViewOfferId, deviceId },
    },
    authenticated: true,
    graphQL: true,
  });
