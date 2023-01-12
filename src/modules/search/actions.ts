import { createAction } from '@reduxjs/toolkit';

import SEARCH_QUERY from '@/modules/search/queries/search';
import SEARCH_SUGGESTIONS from '@/modules/search/queries/suggestions';
import { createApiAction } from '../../utils/api';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import { FETCH_POPULAR, SEARCH, SET_SEARCH_QUERY, SUGGESTIONS, FETCH_SIMILAR } from './constants';

export const query = searchQuery => createAction<string>(SET_SEARCH_QUERY)(searchQuery);

export const search = term =>
  createApiAction(SEARCH, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: SEARCH_QUERY,
      variables: { term: `${term}` },
    },
    authenticated: true,
    graphQL: true,
    onRequest: dispatch => {
      dispatch(query(term));
    },
  });

export const suggestions = term =>
  createApiAction(SUGGESTIONS, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: SEARCH_SUGGESTIONS,
      variables: { term: `${term}` },
    },
    authenticated: true,
    graphQL: true,
    onRequest: dispatch => {
      dispatch(query(term));
    },
  });

/**  TODO This endpoint is removed from backend api due to incorrect data returned by skylark apis.
 *  This functionality is descoped temporarily after discussing with David. The code is just kept in place
 *  as a placeholder for future implementation
 */
export const fetchPopular = railUrl =>
  createApiAction(FETCH_POPULAR, {
    baseURL: STORE_CONFIG.EXP_API_URL,
    path: '/rails',
    params: { url: railUrl },
    authenticated: true,
  });

/**  TODO This endpoint is removed from backend api due to incorrect data returned by skylark apis.
 *  This functionality is descoped temporarily after discussing with David. The code is just kept in place
 *  as a placeholder for future implementation
 */
export const fetchSimilar = searchQuery =>
  createApiAction(FETCH_SIMILAR, {
    baseURL: STORE_CONFIG.EXP_API_URL,
    path: '/search',
    params: { query: searchQuery },
    onlyLatest: true,
    authenticated: true,
  });
