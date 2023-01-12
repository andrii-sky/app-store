/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';

import { Title } from '@/types/graph-ql';
import { createApiModuleReducer, createCustomModuleReducer } from '../../utils/api';
import { FETCH_POPULAR, SEARCH, SET_SEARCH_QUERY, SUGGESTIONS, FETCH_SIMILAR } from './constants';
import { RailItem } from '../../types/models/RailItem';

const reducers = {
  query: createCustomModuleReducer<string, string>(
    {
      [SET_SEARCH_QUERY]: (_, action) => action.payload,
    },
    '',
  ),
  result: createApiModuleReducer<Title[] | null>(
    {
      actionType: SEARCH,
      onSuccess: (draftState, action) => {
        draftState.data = action.payload.search.groupResults;
      },
    },
    null,
  ),
  suggestions: createApiModuleReducer<Title[] | []>(
    {
      actionType: SUGGESTIONS,
      onRequest: draftState => {
        draftState.data = [];
      },
      onSuccess: (draftState, action) => {
        draftState.data = action.payload.search.results;
      },
    },
    [],
  ),
  popular: createApiModuleReducer<RailItem[]>(
    {
      actionType: FETCH_POPULAR,
      onSuccess: (draftState, action) => {
        draftState.data = RailItem.createInstances(action.payload?.data);
      },
    },
    [],
  ),
  similar: createApiModuleReducer<RailItem[]>(
    {
      actionType: FETCH_SIMILAR,
      onSuccess: (draftState, action) => {
        draftState.data = RailItem.createInstances(action.payload);
      },
    },
    [],
  ),
};

export default combineReducers(reducers);
