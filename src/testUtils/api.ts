import { APIActionTypeSuffix } from '../utils/api/types';

export const createSuccessAPIActions = (actionType: string, responsePayload: any, meta?: any) => {
  return [
    { type: `${actionType}_${APIActionTypeSuffix.REQUEST}`, meta },
    { type: `${actionType}_${APIActionTypeSuffix.SUCCESS}`, payload: responsePayload, meta },
  ];
};

export const createFailureAPIActions = (actionType: string, errorPayload: Error, meta?: any) => {
  return [
    { type: `${actionType}_${APIActionTypeSuffix.REQUEST}`, meta },
    {
      type: `${actionType}_${APIActionTypeSuffix.FAILURE}`,
      payload: errorPayload,
      meta,
      error: true,
    },
  ];
};

export const createRequestAPIAction = (actionType: string, meta?: any) => ({
  type: `${actionType}_${APIActionTypeSuffix.REQUEST}`,
  meta,
});

export const createSuccessAPIAction = (actionType: string, responsePayload: any, meta?: any) => ({
  type: `${actionType}_${APIActionTypeSuffix.SUCCESS}`,
  payload: responsePayload,
  meta,
});

export const createFailureAPIAction = (actionType: string, errorPayload: Error, meta?: any) => ({
  type: `${actionType}_${APIActionTypeSuffix.FAILURE}`,
  payload: errorPayload,
  meta,
  error: true,
});

/**
 * Creates the api success state.
 *
 * @param data
 * @param state the init state
 */
export const createApiSuccessState = (data: any, state?: any) => ({
  ...state,
  data,
  isLoading: false,
});

/**
 * Creates the api failure state.
 *
 * @param error the error object
 * @param state the init state
 */
export const createApiFailureState = (error: Error, state?: any) => ({
  ...state,
  error,
  isLoading: false,
});
