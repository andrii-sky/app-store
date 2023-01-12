import { createApiAction } from '@/utils/api';

import { SkySubscription } from '@/types/graph-ql';

import GET_SUBSCRIPTIONS_QUERY from '@/modules/subscription/queries/getSubscriptions';

import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import { FETCH_USER_SUBSCRIPTIONS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchSubscriptions = () =>
  createApiAction<SkySubscription[]>(FETCH_USER_SUBSCRIPTIONS, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_SUBSCRIPTIONS_QUERY,
    },
    graphQL: true,
    authenticated: true,
  });
