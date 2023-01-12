import { combineReducers } from 'redux';
import { Maybe, SkyDecoderBox } from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import { FETCH_DECODERS, RECORD, RESET_REMOTE_RECORD } from './constants';
import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  decoders: createCustomModuleReducer<APIModuleState<SkyDecoderBox[]>>(
    {
      ...createApiReducer({
        actionType: FETCH_DECODERS,
        onSuccess: (draftState, action) => {
          // eslint-disable-next-line no-param-reassign
          draftState.data = action.payload?.user?.decoders;
        },
      }),
    },
    createApiInitialState([]),
  ),
  record: createCustomModuleReducer<APIModuleState<Maybe<any>>>(
    {
      ...createApiReducer({
        actionType: RECORD,
      }),
      [RESET_REMOTE_RECORD]: draftState => {
        draftState.data = null;
        draftState.error = null;
      },
    },
    createApiInitialState(null),
  ),
};

export default combineReducers(reducers);
