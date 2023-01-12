import { combineReducers } from 'redux';
import {
  SET_FAVOURITE_APP,
  namespace,
  SET_INSTALLED_APPS,
  SET_LAST_OPENED_APP,
  FETCH_ALL_APPS,
} from '@/modules/myApps/constants';
import { getReducers } from '@/utils/Section';
import { createApiModuleReducer, createApiReducer, createCustomModuleReducer } from '@/utils/api';
import { equals } from 'ramda';
import { BoxApp } from '@/types/graph-ql';

const getApp = (draftState: any, appId: string) => {
  const favRail = draftState?.data?.rails?.find(rail => equals(rail?.layout, 'FAVOURITE_APPS'));
  return favRail?.contentPage?.content?.find(application => equals(application.id, appId));
};

export default combineReducers({
  installed: createCustomModuleReducer<any>(
    {
      [SET_INSTALLED_APPS]: (state, action) => action.payload,
    },
    [],
  ),
  allApps: createApiModuleReducer<BoxApp[] | null>(
    {
      actionType: FETCH_ALL_APPS,
      onSuccess: (draftState, action) => {
        draftState.data = action.payload?.myBoxApps;
      },
      onFailure: draftState => {
        draftState.error = 'myBoxApps-error';
      },
    },
    [],
  ),
  ...getReducers(namespace, {
    ...createApiReducer({
      actionType: SET_FAVOURITE_APP,
      onSuccess: (draftState, action) => {
        const { appId, isFavourite, removeFromList } = action.meta;
        const app = getApp(draftState, appId);
        if (app) {
          app.favourite = isFavourite;
        }

        if (removeFromList) {
          const favRail = draftState?.data?.rails?.find(rail =>
            equals(rail?.layout, 'FAVOURITE_APPS'),
          );
          const favAppIndex = favRail?.contentPage?.content?.indexOf(app);
          favRail?.contentPage?.content?.splice(favAppIndex, 1);
        }
      },
      onFailure: draftState => {
        draftState.error = 'favourite-app';
      },
    }),
    ...createApiReducer({
      actionType: SET_LAST_OPENED_APP,
      onSuccess: (draftState, action) => {
        const { appId } = action.meta;
        const app = getApp(draftState, appId);
        if (app) {
          app.lastOpened = action.payload?.boxAppOpened;
        }
      },
      onFailure: draftState => {
        draftState.error = 'last-opened-app';
      },
    }),
  }),
});
