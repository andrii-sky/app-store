import { isNil } from 'ramda';
import { createApiAction } from '@/utils/api';
import { createAction } from '@reduxjs/toolkit';
import { CollectionOrder, ViewingContext } from '@/types/graph-ql';

import { GET_COLLECTION, PageInfo } from '@/modules/collections/queries/getCollection';
import GET_BROWSE_CATEGORIES from '@/modules/collections/queries/getBrowseCategories';
import {
  CLEAR_COLLECTION_FILTERS,
  COLLECTION_FILTER_GENRE,
  COLLECTION_FILTER_SORT,
  COLLECTION_FILTER_SUBSCRIPTION,
  COLLECTION_FILTER_VALUE_ALL,
  COLLECTION_FILTER_VALUE_DOWNLOADABLE,
  COLLECTION_FILTER_VALUE_MYSUBSCRIPTION,
  COLLECTION_FILTER_VALUE_ONDEMAND,
  COLLECTION_FILTER_VALUE_UPCOMING_ON_TV,
  COLLECTION_FILTER_VIEWINGCONTEXT,
  FETCH_BROWSE_CATEGORIES,
  FETCH_COLLECTION,
  FETCH_HOME_COLLECTION,
  SET_COLLECTION_FILTER,
  SET_COLLECTION_FILTERS,
} from './constants';
import { getCollection, getCollectionSelectedFilters } from './selectors';
import { user } from '../auth/selectors';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';

export const getInitialFiltersVal = (isLoggedIn: boolean) => ({
  [COLLECTION_FILTER_GENRE]: COLLECTION_FILTER_VALUE_ALL,
  [COLLECTION_FILTER_SUBSCRIPTION]: isLoggedIn
    ? COLLECTION_FILTER_VALUE_MYSUBSCRIPTION
    : COLLECTION_FILTER_VALUE_ALL,
});

export const browseMoreFiltersValues = {
  [COLLECTION_FILTER_GENRE]: COLLECTION_FILTER_VALUE_ALL,
  [COLLECTION_FILTER_SUBSCRIPTION]: COLLECTION_FILTER_VALUE_ALL,
  [COLLECTION_FILTER_VIEWINGCONTEXT]: COLLECTION_FILTER_VALUE_ALL,
  [COLLECTION_FILTER_SORT]: CollectionOrder.Newest,
};

const viewingContextValueMap = {
  [ViewingContext.Vod]: COLLECTION_FILTER_VALUE_ONDEMAND,
  [ViewingContext.Catchup]: COLLECTION_FILTER_VALUE_ONDEMAND,
  [ViewingContext.Linear]: COLLECTION_FILTER_VALUE_UPCOMING_ON_TV,
  [ViewingContext.Download]: COLLECTION_FILTER_VALUE_DOWNLOADABLE,
};

const onDemandViewingContexts = new Set([ViewingContext.Vod, ViewingContext.Catchup]);

const getDefaultFilters = (categoryOrCollection: any) => {
  const viewingContext =
    categoryOrCollection?.defaultContentFilter?.viewingContextsByContentType?.viewingContexts;
  let vcFilter;
  if (viewingContext?.length > 0) {
    if (viewingContext?.length > 1) {
      if (
        viewingContext.length === onDemandViewingContexts.size &&
        [...viewingContext].every(vc => onDemandViewingContexts.has(vc))
      ) {
        vcFilter = COLLECTION_FILTER_VALUE_ONDEMAND;
      } else {
        // error state, since it's just a filter we can go with 'all' to fail gracefully.
        vcFilter = COLLECTION_FILTER_VALUE_ALL;
      }
    } else {
      const filter = viewingContext?.[0];
      vcFilter = viewingContextValueMap?.[filter];
    }
  }

  return {
    [COLLECTION_FILTER_VIEWINGCONTEXT]: vcFilter,
    [COLLECTION_FILTER_SORT]: categoryOrCollection?.defaultContentSort,
  };
};

export const setCollectionFilters = (collectionId, filters) =>
  createAction<{ collectionId: string; filters: any }>(SET_COLLECTION_FILTERS)({
    collectionId,
    filters,
  });

export const fetchCollection = (
  collectionId: string,
  size?: number,
  isLoadMore = false,
  enabledFilters = [
    COLLECTION_FILTER_GENRE,
    COLLECTION_FILTER_SUBSCRIPTION,
    COLLECTION_FILTER_VIEWINGCONTEXT,
    COLLECTION_FILTER_SORT,
  ],
) => (dispatch, getState) => {
  const pageInfo: PageInfo = { size };
  if (isLoadMore) {
    const collection = getCollection(getState())(collectionId);
    pageInfo.after = collection?.contentPage?.pageInfo.endCursor;
  }
  let selectedFilters = getCollectionSelectedFilters(getState())(collectionId);
  const loggedInUser = user(getState());
  selectedFilters = {
    ...getInitialFiltersVal(!isNil(loggedInUser)),
    ...selectedFilters,
  };
  // for anonymous users, they should always see all the contents.
  if (isNil(loggedInUser)) {
    selectedFilters[COLLECTION_FILTER_SUBSCRIPTION] = COLLECTION_FILTER_VALUE_ALL;
  }
  const queryfilters = enabledFilters
    .filter(filter => !isNil(selectedFilters[filter]))
    .reduce((acc, key) => ({ ...acc, [key]: selectedFilters[key] }), {});

  return dispatch(
    createApiAction(FETCH_COLLECTION, {
      baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
      params: {
        query: GET_COLLECTION(queryfilters, pageInfo),
        variables: { collectionId },
      },
      meta: { collectionId, selectedFilters: queryfilters, isLoadMore },
      authenticated: true,
      graphQL: true,
      onlyLatest: true,
      onSuccess: (dispatch1, { payload }) => {
        dispatch1(
          setCollectionFilters(payload.collection?.id, {
            ...getDefaultFilters(payload.collection),
            ...selectedFilters,
          }),
        );
      },
    }),
  );
};

export const fetchHomeCollection = collectionId =>
  createApiAction(FETCH_HOME_COLLECTION, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_COLLECTION(),
      variables: { collectionId },
    },
    meta: { collectionId },
    authenticated: true,
    graphQL: true,
  });

export const setCollectionFilter = (collectionId, name, value) =>
  createAction<{ collectionId: string; name: string; value: string }>(SET_COLLECTION_FILTER)({
    collectionId,
    name,
    value,
  });

export const clearCollectionFilters = collectionId =>
  createAction<{ collectionId: string }>(CLEAR_COLLECTION_FILTERS)({
    collectionId,
  });

export const setBrowseMoreFilters = collectionId => {
  return setCollectionFilters(collectionId, browseMoreFiltersValues);
};

export const fetchBrowseCategories = (excludeDownloads = false) =>
  createApiAction(FETCH_BROWSE_CATEGORIES, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: GET_BROWSE_CATEGORIES,
      variables: { excludeViewingContexts: excludeDownloads ? [ViewingContext.Download] : [] },
    },
    authenticated: true,
    graphQL: true,
    onSuccess: (dispatch, { payload }) => {
      payload.section?.home?.categories.forEach(category => {
        dispatch(setCollectionFilters(category?.id, getDefaultFilters(category)));
      });
    },
  });
