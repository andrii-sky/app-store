import { createApiAction } from '@/utils/api';
import { createFetchRailAction } from '@/utils/Rails';
import { FETCH_CONTENT, FETCH_RAIL } from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';
import GET_HOME_PAGE from './queries/getHomePage';

import { rail } from './selectors';

/**
 *
 * @param initialRailSize initial loading size for each rail, load all if undefined
 * @param reloadRailId reload all the existing tile for the specific rail.
 * @param ignoreContinueWatching should query ignore pagination for continue watching rail or not
 */
export const fetchContent = (
  initialRailSize?: number,
  reloadRailId?: string,
  ignoreContinueWatching?: boolean,
  needReverseEPG?: boolean,
) => (dispatch, getState) => {
  let reloadRail;
  if (reloadRailId) {
    const railInfo = rail(getState())(reloadRailId);
    console.log('BUGAGA 3: ', railInfo?.contentPage?.content);
    reloadRail = {
      id: reloadRailId,
      size: Array.isArray(railInfo?.contentPage?.content)
        ? railInfo?.contentPage?.content?.length
        : undefined,
    };
  }
  return dispatch(
    createApiAction(FETCH_CONTENT, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: GET_HOME_PAGE(initialRailSize, reloadRail, ignoreContinueWatching, needReverseEPG),
        variables: reloadRail ? { railId: reloadRailId } : undefined,
      },
      authenticated: true,
      graphQL: true,
    }),
  );
};

export const fetchRailById = (railId: string, nextPageSize?: number) => (dispatch, getState) => {
  const railInfo = rail(getState())(railId);
  const endCursor = railInfo?.contentPage.pageInfo?.endCursor;
  return dispatch(createFetchRailAction(FETCH_RAIL, railId, endCursor, nextPageSize));
};
