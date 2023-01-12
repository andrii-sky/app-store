import { combineReducers } from 'redux';
import { Collection } from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import {
  FETCH_BROWSE_CATEGORIES,
  SET_COLLECTION_FILTER,
  FETCH_COLLECTION,
  FETCH_HOME_COLLECTION,
  CLEAR_COLLECTION_FILTERS,
  SET_COLLECTION_FILTERS,
} from './constants';
import {
  createApiInitialState,
  createApiOnSuccessReducer,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

type SelectedFilters = {
  [filterName: string]: string;
};
const reducers = {
  collectionsById: createCustomModuleReducer<
    APIModuleState<{ [collectionId: string]: Collection }>
  >(
    {
      ...createApiReducer({
        actionType: FETCH_COLLECTION,
        onSuccess: (draftState, action) => {
          const { collectionId, isLoadMore } = action.meta;
          const { collection } = action.payload;
          if (!isLoadMore || !draftState.data[collectionId]) {
            draftState.data[collectionId] = collection;
          } else {
            const targetCollection = draftState.data[collectionId];
            targetCollection.contentPage.pageInfo = collection?.contentPage?.pageInfo;
            console.log('BUGAGA 1: ', collection?.contentPage?.content);
            if (Array.isArray(collection?.contentPage?.content)) {
              targetCollection.contentPage.content = targetCollection?.contentPage?.content || [];
              targetCollection.contentPage.content?.push(...collection?.contentPage?.content);
            }
          }
        },
      }),
      ...createApiReducer({
        actionType: FETCH_HOME_COLLECTION,
        onSuccess: (draftState, action) => {
          const { collectionId } = action.meta;
          const { collection } = action.payload;
          draftState.data[collectionId] = collection;
        },
      }),
    },
    createApiInitialState({}),
  ),
  filtersById: createCustomModuleReducer<
    APIModuleState<{ [collectionId: string]: SelectedFilters }>
  >(
    {
      [SET_COLLECTION_FILTER]: (draftState, action) => {
        const { collectionId, name, value } = action.payload;
        const collection = draftState.data[collectionId];
        if (collection) {
          collection[name] = value;
        } else {
          draftState.data[collectionId] = { [name]: value };
        }
      },
      [SET_COLLECTION_FILTERS]: (draftState, action) => {
        const { collectionId, filters } = action.payload;
        draftState.data[collectionId] = { ...filters };
      },
      [CLEAR_COLLECTION_FILTERS]: (draftState, action) => {
        const { collectionId } = action.payload;
        delete draftState.data[collectionId];
      },
    },
    createApiInitialState({}),
  ),
  browseCategories: createCustomModuleReducer<APIModuleState<Collection[]>>(
    {
      ...createApiReducer({
        actionType: FETCH_BROWSE_CATEGORIES,
        onSuccess: createApiOnSuccessReducer((_, action) => {
          return action.payload.section?.home?.categories;
        }),
      }),
    },
    createApiInitialState([]),
  ),
};

export default combineReducers(reducers);
