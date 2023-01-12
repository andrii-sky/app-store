import {
  createApiSuccessState,
  createFailureAPIAction,
  createSuccessAPIAction,
} from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { Classification, ParentalControl } from '@/types/graph-ql';
import dayjs from 'dayjs';
import { createAction } from '@reduxjs/toolkit';
import reducer from '../reducer';
import {
  CLEAR_VALIDATE_PARENTAL_PIN,
  FETCH_USER_PARENTAL_SETTINGS,
  SET_PARENTAL_CONTROLS,
  SET_PARENTALLY_APPROVED_CLASSIFICATION,
  SET_PIN_VALIDATION_STATUS,
  VALIDATE_PARENTAL_PIN,
} from '../constants';

jest.mock('dayjs');
(dayjs as any).mockReturnValue({
  add: () => dayjs('2020-01-01T00:00:00.000Z'),
});

const contentState = {
  parentalSettings: createApiInitialState({
    parentalControlEnabled: false,
    parentalControl: ParentalControl.Disabled,
    approvedClassification: Classification.G,
  }),
  parentalPinValidation: createApiInitialState({
    'test-user-a': {
      pinValidationResult: {
        isValid: false,
        attempts: 0,
        timeoutEnd: 0,
      },
      expiryDate: null,
      lastEnteredPin: '',
    },
  }),
};

describe('Parental Pin reducer', () => {
  test('fetch parental settings', () => {
    const parentalSettingsResult = {
      user: {
        parentalSettings: {
          parentalControl: ParentalControl.Enabled,
          approvedClassification: Classification.G,
        },
      },
      parentalPinValidation: {
        isValid: false,
        remainingAttempts: 3,
        attempts: 0,
        timeoutEnd: 0,
      },
    };

    const fetchAction = createSuccessAPIAction(
      FETCH_USER_PARENTAL_SETTINGS,
      parentalSettingsResult,
    );
    const expectedChannelsState = createApiSuccessState(
      parentalSettingsResult.user.parentalSettings,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchAction)).toEqual({
      ...contentState,
      parentalSettings: expectedChannelsState,
    });
  });

  test('set parental controls', () => {
    const parentalSettingsResult = {
      user: {
        parentalSettings: {
          parentalControlEnabled: false,
          parentalControl: ParentalControl.Disabled,
          approvedClassification: Classification.G,
        },
        parentalPinValidation: {
          isValid: false,
          remainingAttempts: 3,
          attempts: 0,
          timeoutEnd: 0,
        },
      },
    };

    const fetchAction = createSuccessAPIAction(SET_PARENTAL_CONTROLS, null, { enabled: false });
    const expectedChannelsState = createApiSuccessState(
      parentalSettingsResult.user.parentalSettings,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchAction)).toEqual({
      ...contentState,
      parentalSettings: expectedChannelsState,
    });
  });

  test('set parental controls failure', () => {
    const error = 'Network error';

    const fetchAction = createFailureAPIAction(SET_PARENTAL_CONTROLS, error as any, {
      enabled: false,
    });

    // When - invoke reducer, Then - verify state
    const actualState = reducer(contentState, fetchAction) as any;
    expect(actualState.parentalSettings.error).toEqual(error);
  });

  test('set parentally approved classification', () => {
    const parentalSettingsResult = {
      user: {
        parentalSettings: {
          parentalControlEnabled: false,
          parentalControl: ParentalControl.Disabled,
          approvedClassification: Classification.Pg,
        },
      },
      parentalPinValidation: {
        isValid: false,
        remainingAttempts: 3,
        attempts: 0,
        timeoutEnd: 0,
      },
    };

    const fetchAction = createSuccessAPIAction(SET_PARENTALLY_APPROVED_CLASSIFICATION, null, {
      code: Classification.Pg,
    });
    const expectedChannelsState = createApiSuccessState(
      parentalSettingsResult.user.parentalSettings,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchAction)).toEqual({
      ...contentState,
      parentalSettings: expectedChannelsState,
    });
  });

  test('set pin validatin status', () => {
    const parentalSettingsResult = {
      user: {
        parentalSettings: {
          parentalControlEnabled: false,
          parentalControl: ParentalControl.Disabled,
          approvedClassification: Classification.G,
          pinValidationStatus: {
            attempts: 3,
            timeoutEnd: 0,
          },
        },
      },
      parentalPinValidation: {
        isValid: false,
        remainingAttempts: 3,
        attempts: 0,
        timeoutEnd: 0,
      },
    };

    const fetchAction = createSuccessAPIAction(SET_PIN_VALIDATION_STATUS, null, {
      status: {
        attempts: 3,
        timeoutEnd: 0,
      },
    });
    const expectedChannelsState = createApiSuccessState(
      parentalSettingsResult.user.parentalSettings,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchAction)).toEqual({
      ...contentState,
      parentalSettings: expectedChannelsState,
    });
  });
  test('fetch parental pin validation', () => {
    const parentalPinValidationResult = {
      user: {
        parentalSettings: {
          parentalControl: ParentalControl.Enabled,
          approvedClassification: Classification.G,
        },
      },
      validateParentalPin: {
        isValid: true,
        remainingAttempts: 2,
        attempts: 1,
        timeoutEnd: 0,
      },
    };

    const fetchAction = createSuccessAPIAction(VALIDATE_PARENTAL_PIN, parentalPinValidationResult, {
      lastEnteredPin: 'xyz',
      userProfileId: 'test-user-a',
    });
    const expectedState = createApiSuccessState({
      'test-user-a': {
        pinValidationResult: parentalPinValidationResult.validateParentalPin,
        lastEnteredPin: 'xyz',
        expiryDate: dayjs().add(10, 'minute'),
      },
    });

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchAction)).toEqual({
      ...contentState,
      parentalPinValidation: expectedState,
    });
  });

  test('clear parental pin validation result', () => {
    const clearAction = createAction<any>(CLEAR_VALIDATE_PARENTAL_PIN)({
      userProfileId: 'test-user-a',
    });

    const expectedState = {
      data: { 'test-user-a': { pinValidationResult: {}, expiryDate: null, lastEnteredPin: '' } },
      isLoading: false,
    };

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, clearAction)).toEqual({
      ...contentState,
      parentalPinValidation: expectedState,
    });
  });
});
