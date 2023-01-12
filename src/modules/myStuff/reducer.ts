import { combineReducers } from 'redux';
import { MyListContent } from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import { VideoQualityType } from '@/types/enums/VideoQualityType';
import { FETCH_MY_LIST, SET_DEVICE_VIDEO_QUALITY } from './constants';
import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  myList: createCustomModuleReducer<APIModuleState<MyListContent[]>>(
    {
      ...createApiReducer({
        actionType: FETCH_MY_LIST,
        onSuccess: (draftState, action) => {
          // eslint-disable-next-line no-param-reassign
          draftState.data = action.payload?.myList;
        },
      }),
    },
    createApiInitialState([]),
  ),
  deviceVideoQuality: createCustomModuleReducer<
    APIModuleState<{
      [accountId: string]: VideoQualityType;
    }>
  >(
    {
      [SET_DEVICE_VIDEO_QUALITY]: (draftState, action) => {
        const { accountId, videoQuality } = action.payload;
        draftState.data[accountId] = videoQuality;
      },
    },
    createApiInitialState({}),
  ),
};

export default combineReducers(reducers);
