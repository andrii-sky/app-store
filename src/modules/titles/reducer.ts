/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';

import { BrandType } from '@/types/enums/BrandType';
import { Maybe, Show, Movie } from '@/types/graph-ql';

import { APIModuleState } from '@/utils/api/types';
import * as pagination from '@/utils/Pagination';
import {
  MY_LIST,
  FETCH_BRAND,
  SELECT_SEASON,
  FETCH_DEFAULT_EPISODE,
  SET_BRAND,
  FETCH_SHOW_HIGHLIGHTS,
} from './constants';
import {
  createCustomModuleReducer,
  createApiReducer,
  createApiInitialState,
} from '../../utils/api';

export interface BrandState {
  // TODO highlights:Array<Maybe<Episode>>
  [brandId: string]: Maybe<Show & { highlights: any }> | Maybe<Movie>;
}

const reducers = {
  brandById: createCustomModuleReducer<APIModuleState<BrandState>>(
    {
      ...createApiReducer({
        actionType: FETCH_BRAND,
        onSuccess: (draftState, action) => {
          const { isShow } = action.meta;
          const brand = action.payload[isShow ? 'show' : 'movie'];
          if (brand) {
            draftState.data[action.meta.brandId] = brand;
          }
        },
      }),

      [SET_BRAND]: (state, action) => {
        state.data[action.payload?.id] = action.payload;
      },

      ...createApiReducer({
        actionType: FETCH_DEFAULT_EPISODE,
        onSuccess: (draftState, action) => {
          const brand = action.payload.show;
          if (brand) {
            const draftBrand = draftState.data[brand.id];

            if (draftBrand && draftBrand.__typename === BrandType.Show) {
              draftBrand.defaultEpisode = brand.defaultEpisode;
            }
          }
        },
      }),
      // TODO utilize the reducers for pagination
      ...createApiReducer({
        actionType: FETCH_SHOW_HIGHLIGHTS,
        onRequest: (draftState, action) => {
          const { brandId } = action.meta;
          const draftBrand = draftState.data[brandId];
          if (draftBrand?.__typename === BrandType.Show && draftBrand.highlights) {
            pagination.reducerOnRequest(draftBrand.highlights);
          }
        },
        onSuccess: (draftState, action) => {
          const result = action.payload.show?.highlights;
          const { brandId } = action.meta;
          const draftBrand = draftState.data[brandId];
          if (draftBrand?.__typename === BrandType.Show && draftBrand.highlights) {
            pagination.reducerOnSuccess(draftBrand.highlights, result);
          }
        },
        onFailure: (draftState, action) => {
          const { brandId } = action.meta;
          const draftBrand = draftState.data[brandId];
          if (draftBrand?.__typename === BrandType.Show && draftBrand.highlights) {
            pagination.reducerOnFailure(draftBrand.highlights, action.payload);
          }
        },
      }),

      ...createApiReducer({
        actionType: MY_LIST,
        onSuccess: (draftState, action) => {
          const { brandId, isAdded } = action.meta;
          const brand = draftState.data[brandId];
          if (brand) {
            brand.onMyList = isAdded;
          }
        },
        onFailure: (draftState, action) => {
          const { brandId } = action.meta;
          const brand = draftState.data[brandId];
          if (brand) {
            brand.onMyList = false;
          }
          draftState.error = 'my-list';
        },
      }),
    },
    createApiInitialState({}),
  ),
  selectedSeasonByBrandId: createCustomModuleReducer<{ [brandId: string]: string }>(
    {
      [SELECT_SEASON]: (draftState, action) => {
        const { brandId, selectedSeasonId } = action.payload;
        if (brandId && selectedSeasonId) {
          draftState[brandId] = selectedSeasonId;
        }
      },
    },
    {},
  ),
};

export default combineReducers(reducers);
