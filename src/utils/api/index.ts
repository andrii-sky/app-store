import { createSelector } from 'reselect';
import { CaseReducer, createReducer } from '@reduxjs/toolkit';

import { APIActionObject, CALL_API } from '@/middleware/api/types';
import {
  APIAction,
  APIActionTypeSuffix,
  APIModuleDraftState,
  APIModuleState,
  APIReducerOptions,
  BaseAction,
} from './types';

/**
 * Creates the apiAction with actionTypes following the rules set by the middleware api.
 *
 * @param actionTypePrefix the action type prefix (namespace/actionType) such as "spotify/FETCH_ALBUM"
 * @param apiAction the apiAction object to create
 */
export function createApiAction<Payload = any, Meta = any>(
  actionTypePrefix: string,
  apiAction: APIActionObject<Payload, Meta>,
): any {
  return {
    type: CALL_API,
    [CALL_API]: {
      ...apiAction,
      actionTypes: [
        `${actionTypePrefix}_${APIActionTypeSuffix.REQUEST}`,
        `${actionTypePrefix}_${APIActionTypeSuffix.SUCCESS}`,
        `${actionTypePrefix}_${APIActionTypeSuffix.FAILURE}`,
        `${actionTypePrefix}_${APIActionTypeSuffix.CANCEL}`,
      ],
    },
  };
}

/**
 * Creates the initial api state for modules.
 *
 * @param initialState the initial state for the data key in the module state
 */
export function createApiInitialState<State>(initialState: State): APIModuleState<State> {
  return {
    data: initialState,
    isLoading: false,
  };
}

/**
 * Creates api onRequest reducer.
 *
 */
export function createApiOnRequestReducer<State = any, Payload = any, Meta = any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dataReducer = (data, action: APIAction<Payload, Meta>) => data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorReducer = (error, action: APIAction<Payload, Meta>) => error,
) {
  return (state, action) => ({
    ...state,
    data: dataReducer(state.data, action),
    error: errorReducer(state.error, action),
  });
}

/**
 * Creates api onSuccess reducer.
 *
 */
export function createApiOnSuccessReducer<State = any, Payload = any, Meta = any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dataReducer = (data, action: APIAction<Payload, Meta>) => action.payload,
) {
  return (state, action) => ({
    ...state,
    data: dataReducer(state.data, action),
    // If get a response success, clear the error state
    error: null,
  });
}

/**
 * Creates api onFailure reducer.
 *
 */
export function createApiOnFailureReducer<State = any, Payload = any, Meta = any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorReducer = (error, action: APIAction<Payload, Meta>) => action.payload,
) {
  return (state, action) => ({
    ...state,
    error: errorReducer(state.error, action),
  });
}

const updateImmutableState = (draftState: any, newState?: any, isLoading?: boolean) => {
  // Immer case reducer pattern 1: return a new state
  if (newState !== undefined) {
    return {
      ...newState,
      isLoading,
    };
  }
  // Immer case reducer pattern 2: directly mutate the draft state, return undefined
  // eslint-disable-next-line no-param-reassign
  draftState.isLoading = isLoading;
  return undefined;
};

/**
 * Creates api reducers following the rules set by the middleware api.
 *
 */
export function createApiReducer<State = any, Payload = any, Meta = any>({
  actionType,
  onRequest = createApiOnRequestReducer<State, Payload, Meta>(),
  onSuccess = createApiOnSuccessReducer<State, Payload, Meta>(),
  onFailure = createApiOnFailureReducer<State, Payload, Meta>(),
}: APIReducerOptions<State, Payload, Meta>): {
  [actionType: string]: CaseReducer<APIModuleState<State>, APIAction<Payload, Meta>>;
} {
  return {
    [`${actionType}_${APIActionTypeSuffix.REQUEST}`]: (state, action) => {
      const newState = onRequest(state, action);
      return updateImmutableState(state, newState, true);
    },

    [`${actionType}_${APIActionTypeSuffix.SUCCESS}`]: (
      state: APIModuleDraftState<State>,
      action: APIAction<Payload, Meta>,
    ) => {
      // persist the etag, to identify whether the response is not modified or not, as fetch would never get httpcode 304:
      // https://github.com/github/fetch/issues/241
      const { etag } = action;
      const newState = onSuccess(state, {
        ...action,
        isNotModified: !!state.etag && state.etag === etag,
      });
      if (newState) {
        newState.etag = etag;
        delete (newState as APIModuleState<State>).error;
      } else {
        state.etag = etag;
        delete state.error;
      }
      return updateImmutableState(state, newState, false);
    },

    [`${actionType}_${APIActionTypeSuffix.FAILURE}`]: (
      state: APIModuleDraftState<State>,
      action: APIAction<Payload, Meta>,
    ) => {
      const newState = onFailure(state, action);
      if (newState) {
        delete newState.etag;
      } else {
        delete state.etag;
      }
      return updateImmutableState(state, newState, false);
    },
  };
}

/**
 * Creates a api reducer function for a module.
 *
 * @param ApiReducer the apiReducer object containing actionType, onSuccess, onFailure
 * @param initialState
 */
export function createApiModuleReducer<State = any, Payload = any, Meta = any>(
  apiReducerOptions: APIReducerOptions<State, Payload, Meta>,
  initialState: State,
) {
  return createReducer(
    createApiInitialState<State>(initialState),
    createApiReducer(apiReducerOptions),
  );
}

/**
 * Creates a custom reducer function for a module.
 *
 * @param reducerMap a map of actionType to reducer function
 * @param initialState
 */
export function createCustomModuleReducer<State = any, Payload = any>(
  reducerMap: {
    [actionType: string]: CaseReducer<State, BaseAction<Payload>>;
  },
  initialState: State,
) {
  return createReducer(initialState, reducerMap);
}

/**
 * Creates a selector for apiActions that deal with getting the correct state.
 *
 * @param moduleState the module state object
 * @param stateKey the state key name in the module state object that we are interested in
 */
export const createApiSelector = (moduleState: any, stateKey: string) =>
  createSelector(moduleState, (state: any) => state[stateKey]);

/**
 * Creates a selector for apiActions that deal with getting the correct state from the data prop.
 *
 * @param moduleState the module state object
 * @param stateKey the state key name in the module state object that we are interested in
 */
export const createApiDataSelector = (moduleState: any, stateKey: string) =>
  createSelector(moduleState, (state: any) => state[stateKey].data);
