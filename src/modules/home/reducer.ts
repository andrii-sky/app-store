import { combineReducers } from 'redux';
import { createRailReducer } from '@/utils/Rails';
import { APIModuleState } from '@/utils/api/types';
import { HomeContent } from '@/types/interfaces/HomeContent';
import { FETCH_CONTENT, FETCH_RAIL } from './constants';
import {
  createApiInitialState,
  createApiOnSuccessReducer,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  content: createCustomModuleReducer<APIModuleState<HomeContent>>(
    {
      ...createApiReducer({
        actionType: FETCH_CONTENT,
        onSuccess: createApiOnSuccessReducer((_, action) => {
          let rails = action.payload.section?.home.groups;
          if (action.payload.group) {
            rails = rails.map(rail => {
              if (rail.id === action.payload.group.id) {
                return action.payload.group;
              }
              return rail;
            });
          }
          return {
            heroSet: action.payload.section?.home.heroSet,
            rails,
          };
        }),
      }),

      ...createRailReducer(FETCH_RAIL),
    },
    createApiInitialState<HomeContent>({ heroSet: undefined, rails: [] }),
  ),
};

export default combineReducers(reducers);
