import STORE_CONFIG, { GRAPH_QL_PATH } from '@/config';
import { createApiAction } from '@/utils/api';
import GET_USER_ATTRIBUTES_QUERY from '@/modules/userAttributes/queries/getUserAttributes';
import { FETCH_USER_ATTRIBUTES } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchUserAttributes = () =>
  createApiAction(FETCH_USER_ATTRIBUTES, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_USER_ATTRIBUTES_QUERY,
    },
    authenticated: true,
    graphQL: true,
  });
