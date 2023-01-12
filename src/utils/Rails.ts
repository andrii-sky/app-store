/* eslint-disable no-param-reassign */
import { createApiAction, createApiReducer } from '@/utils/api';
import STORE_CONFIG, { GRAPH_QL_PATH } from '@/config';
import GET_RAIL from '@/utils/queries/getRailById';
import { createSelector } from 'reselect';
import memoize from '@/utils/fastMemoize';
import { Reducer } from 'redux';
import { GroupLayout } from '@/types/graph-ql';

export const createRailsSelectors = (namespace: string, reducer: Reducer<any>) => {
  type State = {
    namespace: ReturnType<typeof reducer>;
  };

  return {
    rails: createSelector(
      (state: State) => state[namespace].content.data?.rails,
      r =>
        r &&
        r
          ?.filter(i => i)
          .map(rail => ({
            ...rail,
            contentPage: rail.contentPage
              ? {
                  ...rail.contentPage,
                  content: rail.contentPage?.content?.filter(i => i),
                }
              : null,
          })),
    ),
    rail: createSelector(
      (state: State) => state?.[namespace]?.content?.data?.rails,
      data => memoize((railId: string) => data?.find(({ id }) => id === railId)),
    ),
    isLoading: createSelector(
      (state: State) => state?.[namespace]?.content?.isLoading,
      l => l,
    ),
    error: createSelector(
      (state: State) => state?.[namespace]?.content?.error,
      e => e,
    ),
    railsShallow: createSelector(
      (state: State) => state?.[namespace]?.content?.data?.rails,
      r => r && r?.filter(i => i).map(i => i.id),
    ),
    continueWatchingRailId: createSelector(
      (state: State) => state?.[namespace]?.content?.data?.rails,
      data => data?.find(({ layout }) => layout === GroupLayout.ContinueWatching)?.id,
    ),
  };
};

export const createFetchRailAction = (
  actionType: string,
  railId: string,
  endCursor: any,
  nextPageSize?: number,
) => {
  return createApiAction(actionType, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_RAIL(nextPageSize, endCursor),
      variables: { railId },
    },
    meta: { railId },
    authenticated: true,
    graphQL: true,
  });
};

export const createRailReducer = (actionType: string) => {
  return createApiReducer({
    actionType,
    onRequest: (draftState, action) => {
      console.log('BUGAGA 6: ', draftState.data?.rails);
      if (Array.isArray(draftState.data?.rails)) {
        draftState.data.rails.some(rail => {
          if (rail.id === action.meta.railId) {
            rail.isLoading = true;
            return true;
          }
          return false;
        });
      }
    },
    onSuccess: (draftState, action) => {
      const groupRes = action.payload.group;
      draftState.data.rails?.some(rail => {
        if (rail.id === action.meta.railId) {
          rail.isLoading = false;
          // Nullify the error state on a successful api response so that user can scroll more rails
          // in subsequent attempts. Enhance when implementing https://skynz.atlassian.net/browse/SAAA-4881
          rail.error = null;
          rail.contentPage.pageInfo = groupRes?.contentPage?.pageInfo;
          console.log('BUGAGA 7: ', groupRes?.contentPage?.content);
          if (Array.isArray(groupRes?.contentPage?.content)) {
            rail.contentPage.content = rail?.contentPage?.content || [];
            rail.contentPage.content.push(...groupRes?.contentPage?.content);
          }
          return true;
        }
        return false;
      });
    },
    onFailure: (draftState, action) => {
      draftState.data.rails?.some(rail => {
        if (rail.id === action.meta.railId) {
          rail.isLoading = false;
          // UPDATE: due to implementation on native-app error somehow should be set to null after a shot pause
          // as there is no way for user to do it by scrolling back like in WEB
          rail.error = action.payload;
          return true;
        }
        return false;
      });
    },
  });
};
