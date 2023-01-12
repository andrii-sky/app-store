import { combineReducers } from 'redux';
import {
  Classification,
  ParentalControl,
  ParentalSettings,
  PinValidationResponse,
  Scalars,
} from '@/types/graph-ql';
import { APIModuleState } from '@/utils/api/types';
import dayjs from 'dayjs';
import { isNil } from 'ramda';
import {
  CLEAR_VALIDATE_PARENTAL_PIN,
  FETCH_USER_PARENTAL_SETTINGS,
  SET_PARENTAL_CONTROLS,
  SET_PARENTALLY_APPROVED_CLASSIFICATION,
  SET_PIN_VALIDATION_STATUS,
  VALIDATE_PARENTAL_PIN,
} from './constants';
import {
  createApiInitialState,
  createApiReducer,
  createCustomModuleReducer,
} from '../../utils/api';

const reducers = {
  parentalSettings: createCustomModuleReducer<APIModuleState<ParentalSettings>>(
    {
      ...createApiReducer({
        actionType: FETCH_USER_PARENTAL_SETTINGS,
        onSuccess: (draftState, action) => {
          draftState.data = action.payload?.user?.parentalSettings;
        },
      }),

      ...createApiReducer({
        actionType: SET_PARENTAL_CONTROLS,
        onFailure: (draftState, action) => {
          draftState.error = action.payload;
        },
        onSuccess: () => {},
      }),

      ...createApiReducer({
        actionType: SET_PARENTALLY_APPROVED_CLASSIFICATION,
        onSuccess: (draftState, action) => {
          const { code } = action.meta;
          draftState.data.approvedClassification = code;
        },
      }),

      ...createApiReducer({
        actionType: SET_PIN_VALIDATION_STATUS,
        onSuccess: (draftState, action) => {
          const { status } = action.meta;
          draftState.data.pinValidationStatus = status;
        },
      }),
    },
    createApiInitialState({
      parentalControlEnabled: false,
      parentalControl: ParentalControl.Disabled,
      approvedClassification: Classification.G,
    }),
  ),

  parentalPinValidation: createCustomModuleReducer<
    APIModuleState<{
      [userProfileId: string]: {
        pinValidationResult: PinValidationResponse;
        expiryDate: Scalars['DateTime'];
        lastEnteredPin: Scalars['String'];
      };
    }>
  >(
    {
      ...createApiReducer({
        actionType: VALIDATE_PARENTAL_PIN,
        onSuccess: (draftState, action) => {
          const { userProfileId, lastEnteredPin } = action.meta;

          draftState.data[userProfileId] = {
            pinValidationResult: action.payload?.validateParentalPin,
            expiryDate: dayjs().add(10, 'minute'),
            lastEnteredPin,
          };
        },
      }),

      [CLEAR_VALIDATE_PARENTAL_PIN]: (draftState, action) => {
        const { userProfileId } = action.payload;
        if (isNil(draftState.data[userProfileId]) || isNil(userProfileId)) {
          return;
        }
        draftState.data[userProfileId].pinValidationResult = {} as PinValidationResponse;
        draftState.data[userProfileId].expiryDate = null;
      },
    },
    createApiInitialState({}),
  ),
};

export default combineReducers(reducers);
