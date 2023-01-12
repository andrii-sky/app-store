import { Dispatch } from 'redux';
import { path as pathRamda } from 'ramda';
import { APIError, NetworkError, UnauthorizedError } from '../../errors';
import ResponseError from '../../errors/ResponseError';
import Logging from '../../logging';

const getResponseData = response =>
  pathRamda(['data', 'data'], response) || pathRamda(['data'], response) || response;

/**
 *  A graphql error resopnse will be of following types
  Type 1: Data with attributes null Values
  {
          "errors": [
            {
              "message": "Unexpected error occurred",
              "locations": [
                {
                  "line": 2,
                  "column": 2
                }
              ],
              "path": [
                "group"
              ],
              "extensions": {
                "errorId": "9ef691af-cc84-46cd-a4e1-25ed37c5f72d",
                "stacktrace": [
                  "graphql.GraphqlErrorException",
                  "    at graphql.GraphqlErrorException$Builder.build(GraphqlErrorException.java:58)",
                  "    at nz.co.sky.digital.exp.graphql.common.DataFetchers.errorException(DataFetchers.java:72)",
                  "    at nz.co.sky.digital.exp.graphql.common.DataFetchers.errorResult(DataFetchers.java:45)",
                  "    ... 93 more"
                ],
                "classification": "DataFetchingException"
              }
            }
          ],
          "data": {
            "group": null
          }
        }

   Type 2: Data null value
   {
      "errors": [
        {
          "message": "Unexpected error occurred",
          "locations": [
            {
              "line": 2,
              "column": 2
            }
          ],
          "path": [
            "group"
          ],
          "extensions": {
            "errorId": "9ef691af-cc84-46cd-a4e1-25ed37c5f72d",
            "classification": "DataFetchingException"
          }
        }
      ],
      "data": null
}
 *
 */
const isErrorResponse = response => {
  const data = getResponseData(response);
  const isAllValuesNull = !data || Object.values(data).every(value => value === null);
  return !!response.errors && isAllValuesNull;
};

export const successHandler = async (
  dispatch: Dispatch,
  response: any,
  successType: string,
  errorType: string,
  meta: any = undefined,
  onSuccess: (Dispatch, any) => any,
  onError: (Dispatch, any) => any,
  hasResponseData: boolean,
) => {
  let res;
  if (hasResponseData && isErrorResponse(response)) {
    const err = new ResponseError();
    const errorAction = { type: errorType, payload: err, meta, error: true };
    res = dispatch(errorAction);

    if (onError) {
      onError(dispatch, { payload: err, meta });
    }

    // if request fails...
    Logging.captureException(err);
  } else {
    const data = getResponseData(response);
    const etag = response.headers?.etag || response.headers?.get?.('etag') || undefined;
    const successAction = { type: successType, payload: data, meta, etag };
    res = dispatch(successAction);

    if (onSuccess) {
      onSuccess(dispatch, { payload: data, meta });
    }
  }
  return res;
};

export const errorHandler = async (
  dispatch: Dispatch,
  error: any,
  errorType: string,
  authErrorType: string,
  meta: any = undefined,
  onError: (Dispatch, any) => any,
  requestParams?: string,
) => {
  let err: APIError;
  let sentryError: APIError;

  if (error.response) {
    const { status: resStatus, data: json } = error.response;
    const apiError = json?.error;
    const status = apiError?.status ? parseInt(apiError?.status, 10) : resStatus;
    const message = apiError?.message ?? error.message;
    const code = apiError?.code ?? error.code;
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    if (status === 401 || status === 403) {
      err = new UnauthorizedError(message, code);
      dispatch({ type: authErrorType, payload: err, meta, error: true });
    } else {
      err = new APIError(message, status, code);
    }
    sentryError = new APIError(
      message.replace(/\s|\\n/g, '').slice(0, 120) + requestParams,
      status,
      code,
    );
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    err = new NetworkError(error.message);
    sentryError = new NetworkError(error.message + requestParams);
  } else {
    // Something happened in setting up the request and triggered an Error
    err = new APIError(error.message);
    sentryError = new APIError(error.message + requestParams);
  }
  // console.log('sentryError', sentryError);
  Logging.captureException(sentryError);
  const errorAction = { type: errorType, payload: err, meta, error: true };
  const res = dispatch(errorAction);

  if (onError) {
    onError(dispatch, { payload: err, meta });
  }

  return res;
};
