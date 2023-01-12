import { createSelector } from 'reselect';
import { CollectionOrder } from '@/types/graph-ql';
import { isEmpty } from 'ramda';
import {
  namespace,
  COLLECTION_FILTER_GENRE,
  COLLECTION_FILTER_SUBSCRIPTION,
  COLLECTION_FILTER_VIEWINGCONTEXT,
  COLLECTION_FILTER_SORT,
  COLLECTION_FILTER_VALUE_ALL,
  COLLECTION_FILTER_VALUE_MYSUBSCRIPTION,
  COLLECTION_FILTER_VALUE_ONDEMAND,
  COLLECTION_FILTER_VALUE_UPCOMING_ON_TV,
  COLLECTION_FILTER_VALUE_DOWNLOADABLE,
} from './constants';
import reducer from './reducer';
import memoize from '../../utils/fastMemoize';

interface State {
  [namespace]: ReturnType<typeof reducer>;
}

export const getCollection = createSelector(
  (state: State) => state[namespace].collectionsById?.data,
  data => memoize((collectionId: string) => data[collectionId]),
);

export const getCollectionSelectedFilters = createSelector(
  (state: State) => state[namespace].filtersById?.data,
  data => memoize((collectionId: string) => data[collectionId]),
);

export const getGenreFilterOptions = createSelector(
  (state: State) => state[namespace].collectionsById?.data,
  data =>
    memoize((collectionId: string) => {
      let options: Array<any> = [];
      const namedFilters = data[collectionId]?.namedFilters;
      console.log('BUGAGA 2: ', namedFilters);
      if (Array.isArray(namedFilters) && !isEmpty(namedFilters)) {
        options = [{ id: COLLECTION_FILTER_VALUE_ALL, title: 'All' }].concat(namedFilters);
      }
      return {
        name: COLLECTION_FILTER_GENRE,
        options,
      };
    }),
);
export const getSubscriptionFilterOptions = (isTV = false) => ({
  name: COLLECTION_FILTER_SUBSCRIPTION,
  options: [
    { id: COLLECTION_FILTER_VALUE_MYSUBSCRIPTION, title: 'My Subscription' },
    { id: COLLECTION_FILTER_VALUE_ALL, title: isTV ? 'All' : 'All of Sky Go' },
  ],
});

export const getViewingContextFilterOptions = (excludeDownloads = false) => {
  const options = [
    { id: COLLECTION_FILTER_VALUE_ONDEMAND, title: 'On Demand' },
    { id: COLLECTION_FILTER_VALUE_UPCOMING_ON_TV, title: 'Upcoming On TV' },
  ];
  if (!excludeDownloads) {
    options.push({ id: COLLECTION_FILTER_VALUE_DOWNLOADABLE, title: 'Downloadable' });
  }
  options.push({ id: COLLECTION_FILTER_VALUE_ALL, title: 'All' });
  return {
    name: COLLECTION_FILTER_VIEWINGCONTEXT,
    options,
  };
};

export const getSortOptions = () => ({
  name: COLLECTION_FILTER_SORT,
  options: Object.keys(CollectionOrder).map(key => {
    return {
      id: CollectionOrder[key],
      title: CollectionOrder[key] === CollectionOrder.Alphabetical ? 'A-Z' : key,
    };
  }),
});

export const isLoading = createSelector(
  (state: State) => state[namespace].collectionsById,
  contentRoot => contentRoot.isLoading,
);

export const error = createSelector(
  (state: State) => state[namespace].collectionsById,
  contentRoot => contentRoot.error,
);

export const getBrowseCategories = createSelector(
  (state: State) => state[namespace].browseCategories.data,
  data => data,
);

export const browseCategoriesIsLoading = createSelector(
  (state: State) => state[namespace].browseCategories.isLoading,
  l => l,
);

export const browseCategoriesError = createSelector(
  (state: State) => state[namespace].browseCategories.error,
  e => e,
);
