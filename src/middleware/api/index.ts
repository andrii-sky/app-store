import { MiddlewareAPI } from 'redux';
import TokenProvider from '@/config/tokenProvider';
import { accessToken } from '@/modules/auth/selectors';
import { selectedProfileId } from '@/modules/customer/selectors';
import { UNAUTHORIZED_ERROR } from '@/modules/auth/constants';
import STORE_CONFIG from '@/config';
import axiosClient from './clients/axiosClient';
import graphQLClient from './clients/graphQLClient';
import { APIActionWithTypes, CALL_API, HTTPMethod } from './types';
import { errorHandler, successHandler } from './handlers';
import cancelLastAction, { CANCEL_RESPONSE } from './racing';
import Logging from '../../logging';

const callApi = async ({
  baseURL,
  path,
  token,
  profileId,
  method,
  params,
  data,
  includeSkyHeaders,
  graphQL,
  fetchFunc,
  fetchOptions,
  authenticated,
}) => {
  const config: any = {
    baseURL,
    method,
    url: path,
  };

  if (includeSkyHeaders) {
    config.headers = {
      'x-session-id': Logging.getSessionId(),
      'x-release': Logging.getRelease(),
      'x-correlation-id': Logging.getCorrelationId(),
      'x-product-id': STORE_CONFIG.PRODUCT_ID,
    };
  }
  if (authenticated) {
    let accToken;
    if (TokenProvider.getAccessToken) {
      try {
        accToken = await TokenProvider.getAccessToken();
      } catch (error) {
        return Promise.resolve(CANCEL_RESPONSE);
      }
    } else if (token) {
      accToken = token;
    }

    if (accToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accToken}` };
    }
  }

  if (profileId) {
    config.headers = { ...config.headers, 'x-user-profile': profileId };
  }

  config.fetchOptions = {
    credentials: 'include',
    jsonSerializer: JSON,
    method,
    ...fetchOptions,
  };

  config.params = params;
  config.data = data;

  if (fetchFunc) {
    return fetchFunc(config);
  }

  return graphQL ? graphQLClient(config) : axiosClient(config);
};

const dispatchActionsForApiCall = async (
  dispatch,
  getState,
  apiAction: APIActionWithTypes<any, any>,
) => {
  const {
    actionTypes: [requestType, successType, errorType, cancelType],
    baseURL,
    path,
    method,
    params,
    data,
    meta,
    graphQL = false,
    authenticated = false,
    includeSkyHeaders = true,
    includeProfileId = true,
    onlyLatest = false,
    hasResponseData = true,
    onRequest = () => undefined,
    onSuccess = () => undefined,
    onError = () => undefined,
    auth = {
      tokenSelector: accessToken,
      profileIdSelector: selectedProfileId,
      errorActionType: UNAUTHORIZED_ERROR,
    },
    fetchFunc,
    fetchOptions = {},
  } = apiAction;

  const state = getState();

  // if authentication is required, retrieve the user's JWT from the store

  const token = (authenticated && auth.tokenSelector(state)) ?? '';
  const profileId = (includeProfileId && auth.profileIdSelector?.(state)) ?? '';

  onRequest(dispatch, { meta });

  // dispatch the provided request action
  const requestAction = { type: requestType, meta };
  dispatch(requestAction);

  try {
    const callApiFunc = async () =>
      callApi({
        baseURL,
        path,
        token,
        profileId,
        method: method || (graphQL ? HTTPMethod.POST : HTTPMethod.GET),
        params,
        data,
        includeSkyHeaders,
        graphQL,
        fetchFunc,
        fetchOptions,
        authenticated,
      });

    // call the provided endpoint
    const response = await (onlyLatest ? cancelLastAction(cancelType, callApiFunc) : callApiFunc());

    if (response === CANCEL_RESPONSE) {
      const cancelAction = { type: cancelType, meta };
      return dispatch(cancelAction);
    }

    // if request succeeds, dispatch the provided success action
    return successHandler(
      dispatch,
      response,
      successType,
      errorType,
      meta,
      onSuccess,
      onError,
      hasResponseData,
    );
  } catch (errorResponse) {
    // if request fails...
    const requestParams = graphQL
      ? ` -gql:${JSON.stringify(params)
          .replace(/\s|\\n/g, '')
          .slice(0, 80)}`
      : `-path:${path}`;

    return errorHandler(
      dispatch,
      errorResponse,
      errorType,
      auth.errorActionType,
      meta,
      onError,
      requestParams,
    );
  }
};

export default (store: MiddlewareAPI) => next => (action: any) => {
  const apiAction = action[CALL_API];

  // if the current action does not have a CALL_API property, let the dispatch chain continue
  if (apiAction === undefined) {
    return next(action);
  }

  return dispatchActionsForApiCall(store.dispatch, store.getState, apiAction);
};
