import { AnyAction, CaseReducer, Draft } from '@reduxjs/toolkit';

export enum APIActionTypeSuffix {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  CANCEL = 'CANCEL',
}

export interface BaseAction<Payload = any> extends AnyAction {
  payload: Payload;
}

export interface APIAction<Payload = any, Meta = any> extends BaseAction<Payload> {
  meta?: Meta;
  error?: boolean;
  isNotModified?: boolean;
}

export type APIReducer<State, Payload, Meta> = CaseReducer<
  APIModuleState<State>,
  APIAction<Payload, Meta>
>;

export interface APIReducerOptions<State, Payload, Meta> {
  actionType: string;
  onRequest?: APIReducer<State, Payload, Meta>;
  onSuccess?: APIReducer<State, Payload, Meta>;
  onFailure?: APIReducer<State, Payload, Meta>;
}

export interface APImoduleStatus {
  etag?: string;
  error?: any;
  isLoading?: boolean;
}

export interface APIModuleState<State> extends APImoduleStatus {
  data: State;
}

export type APIModuleDraftState<State> = Draft<APIModuleState<State>>;
