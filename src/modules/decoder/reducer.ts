import { combineReducers } from 'redux';
import { Maybe, SkyDecoderActivationResponse } from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import { ACTIVATE_STB_DEVICE, SET_INITIATE_DEVICE_ACTIVATION } from './constants';
import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  activateStbDevice: createCustomModuleReducer<APIModuleState<Maybe<SkyDecoderActivationResponse>>>(
    {
      ...createApiReducer({
        actionType: ACTIVATE_STB_DEVICE,
        onSuccess: (draftState, action) => {
          draftState.data = action.payload?.activateSkyDecoder;
        },
      }),
    },
    createApiInitialState(null),
  ),
  deviceActivationInitiated: createCustomModuleReducer<any>(
    {
      [SET_INITIATE_DEVICE_ACTIVATION]: (_, action) => action.payload.value,
    },
    null,
  ),
};

export default combineReducers(reducers);
