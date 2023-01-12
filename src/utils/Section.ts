import {
  createApiAction,
  createApiInitialState,
  createApiOnSuccessReducer,
  createApiReducer,
  createCustomModuleReducer,
} from '@/utils/api';
import STORE_CONFIG, { GRAPH_QL_PATH } from '@/config';
import GET_SECTION from '@/utils/queries/getSection';
import { createFetchRailAction, createRailReducer } from '@/utils/Rails';
import { APIModuleState } from '@/utils/api/types';
import { SectionContent } from '@/types/interfaces/SectionContent';

export const getActions = (namespace: string, railSelector: any) => {
  const fetchContent = (initialRailSize?: number) => dispatch => {
    return dispatch(
      createApiAction(`${namespace}/FETCH_CONTENT`, {
        baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
        params: {
          query: GET_SECTION(namespace.toLowerCase(), initialRailSize),
        },
        authenticated: true,
        graphQL: true,
      }),
    );
  };

  const fetchRailById = (railId: string, nextPageSize?: number) => (dispatch, getState) => {
    const railInfo = railSelector(getState())(railId);
    const endCursor = railInfo?.contentPage.pageInfo?.endCursor;
    return dispatch(
      createFetchRailAction(`${namespace}/FETCH_RAIL`, railId, endCursor, nextPageSize),
    );
  };

  return {
    fetchContent,
    fetchRailById,
  };
};

export const getReducers = (namespace: string, reducerMap?: any) => {
  return {
    content: createCustomModuleReducer<APIModuleState<SectionContent>>(
      {
        ...createApiReducer({
          actionType: `${namespace}/FETCH_CONTENT`,
          onSuccess: createApiOnSuccessReducer((_, action) => {
            const rails = action.payload.section?.home.groups;
            return {
              rails,
            };
          }),
        }),

        ...createRailReducer(`${namespace}/FETCH_RAIL`),
        ...reducerMap,
      },
      createApiInitialState<SectionContent>({ rails: [] }),
    ),
  };
};
