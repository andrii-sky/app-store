import { combineReducers } from 'redux';
import { omit, prop } from 'ramda';
import { objFromListWith } from '@/utils/ObjFromListWith';
import { createCustomModuleReducer } from '@/utils/api';
import {
  REMOVE_DOWNLOAD_ASSET,
  SET_ALL_DOWNLOAD_ASSETS,
  SET_DOWNLOAD_ASSET,
  SET_DOWNLOAD_SETTINGS,
  SET_WIFI_ONLY,
} from './constants';

const reducers = {
  downloadAssetsById: createCustomModuleReducer<any>(
    {
      [SET_DOWNLOAD_ASSET]: (state, action) => {
        return {
          ...state,
          [action.payload.assetId]: action.payload,
        };
      },
      [SET_ALL_DOWNLOAD_ASSETS]: (state, action) =>
        objFromListWith(prop('assetId'), action.payload),
      [REMOVE_DOWNLOAD_ASSET]: (state, action) => omit([action.payload], state),
    },
    {},
  ),
  downloadSettings: createCustomModuleReducer<any>(
    {
      [SET_DOWNLOAD_SETTINGS]: (state, action) => {
        return action.payload;
      },
      [SET_WIFI_ONLY]: (state, action) => {
        return {
          ...state,
          wifiOnly: action.payload,
        };
      },
    },
    {},
  ),
};

export default combineReducers(reducers);
