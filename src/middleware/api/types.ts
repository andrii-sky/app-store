import { Dispatch } from 'redux';

export const CALL_API = 'CALL_API';

export interface APIAuth {
  tokenSelector: (state: any) => string | null;
  profileIdSelector?: (state: any) => string | null;
  errorActionType: string;
}

export interface CallAPIAction<Payload, Meta> {
  CALL_API: APIActionWithTypes<Payload, Meta>;
}

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface APIActionObject<Payload, Meta> {
  baseURL: string;
  path?: string;
  // optional: the http method type. By default it is HTTPMethod.GET
  method?: HTTPMethod;
  // optional: the request query string params for the API Call
  params?: any;
  // optional: the request body for the API Call
  data?: any;
  // optional: whether the request should be graphQL or not. false by default
  graphQL?: boolean;
  // optional: the response meta object passed to the reducers and onSuccess function
  meta?: Meta;
  // optional: whether the request should be authenticated or not. false by default
  authenticated?: boolean;
  // optional: whether to include active user profile id in http header or not. true by default
  includeProfileId?: boolean;
  // optional: whether to include our sky custom headers in http header or not. true by default
  includeSkyHeaders?: boolean;
  // optional: whether the request should under racing condition, only fetch the latest created request, no matter which one response firstly
  onlyLatest?: boolean;
  // optional: authentication object to use for getting the auth token. By default uses our own sky auth token.
  auth?: APIAuth;
  // optional: to get the response data from the json api response. By default it gets the 'data' property from the json response.
  getResponseData?: (json: any) => any;
  // optional: to dispatch preceding actions before sending the request.
  onRequest?: (dispatch: Dispatch, requestData: { meta: Meta }) => void;
  // optional: to dispatch follow up actions when the request succeeds.
  onSuccess?: (dispatch: Dispatch, responseData: { payload: Payload; meta: Meta }) => void;
  // optional: to dispatch follow up actions when the request fails.
  onError?: (dispatch: Dispatch, errorData: { payload: any; meta: Meta }) => void;
  hasResponseData?: boolean;
  // optional: fetch API options
  fetchOptions?: any;
  fetchFunc?: Function;
}

export interface APIActionWithTypes<Payload, Meta> extends APIActionObject<Payload, Meta> {
  actionTypes: string[];
}
