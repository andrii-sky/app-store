import { createApiAction } from '@/utils/api';
import { Classification, ParentalSettings } from '@/types/graph-ql';

import { createAction } from '@reduxjs/toolkit';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import GET_PARENTAL_SETTINGS_QUERY from './queries/getParentalSettings';
import SET_PARENTAL_CONTROLS_QUERY from './queries/setParentalControl';
import SET_PARENTAL_PIN_QUERY from './queries/setParentalPin';
import SET_PARENTALLY_APPROVED_CLASSIFICATION_QUERY from './queries/setParentallyApprovedClassification';
import ENTER_PARENTAL_PIN_QUERY from './queries/enterParentalPin';
import VALIDATE_PARENTAL_PIN_QUERY from './queries/validateParentalPin';
import RESET_PARENTAL_PIN_QUERY from './queries/resetParentalPin';

import { selectedProfileId } from '../customer/selectors';

import {
  FETCH_USER_PARENTAL_SETTINGS,
  SET_PARENTAL_CONTROLS,
  SET_PARENTAL_PIN,
  SET_PARENTALLY_APPROVED_CLASSIFICATION,
  ENTER_PARENTAL_PIN,
  RESET_PARENTAL_PIN,
  VALIDATE_PARENTAL_PIN,
  CLEAR_VALIDATE_PARENTAL_PIN,
} from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchParentalSettings = () =>
  createApiAction<ParentalSettings>(FETCH_USER_PARENTAL_SETTINGS, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_PARENTAL_SETTINGS_QUERY,
    },
    graphQL: true,
    authenticated: true,
  });

export const setParentalPin = (pin: string) =>
  createApiAction(SET_PARENTAL_PIN, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: SET_PARENTAL_PIN_QUERY,
      variables: { pin },
    },
    authenticated: true,
    graphQL: true,
  });

export const setParentalControl = (enabled: boolean) =>
  createApiAction(SET_PARENTAL_CONTROLS, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: SET_PARENTAL_CONTROLS_QUERY,
      variables: { enabled },
    },
    meta: { enabled },
    authenticated: true,
    graphQL: true,
    onSuccess: dispatch => {
      dispatch(fetchParentalSettings());
    },
  });

export const setParentalllyApprovedClassification = (code: Classification) =>
  createApiAction(SET_PARENTALLY_APPROVED_CLASSIFICATION, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: SET_PARENTALLY_APPROVED_CLASSIFICATION_QUERY,
      variables: { code },
    },
    meta: { code },
    authenticated: true,
    graphQL: true,
  });

export const enterParentalPin = (enteredPin: string) =>
  createApiAction(ENTER_PARENTAL_PIN, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: ENTER_PARENTAL_PIN_QUERY,
      variables: { enteredPin },
    },
    authenticated: true,
    graphQL: true,
  });

export const validateParentalPin = (enteredPin: string) => (dispatch, getState) => {
  const userProfileId = selectedProfileId(getState());

  return dispatch(
    createApiAction(VALIDATE_PARENTAL_PIN, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: VALIDATE_PARENTAL_PIN_QUERY,
        variables: { enteredPin },
      },
      authenticated: true,
      graphQL: true,
      meta: { lastEnteredPin: enteredPin, userProfileId },
    }),
  );
};

export const resetParentalPin = () =>
  createApiAction(RESET_PARENTAL_PIN, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: RESET_PARENTAL_PIN_QUERY,
    },
    authenticated: true,
    graphQL: true,
  });

export const clearParentalPinValidationResult = () => (dispatch, getState) => {
  const userProfileId = selectedProfileId(getState());
  return dispatch(createAction<any>(CLEAR_VALIDATE_PARENTAL_PIN)({ userProfileId }));
};
