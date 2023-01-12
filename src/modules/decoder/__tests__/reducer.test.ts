import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { activationSuccess, alreadyActivatedSuccess } from '@/modules/decoder/__tests__/testData';
import { createAction } from '@reduxjs/toolkit';
import { ACTIVATE_STB_DEVICE, SET_INITIATE_DEVICE_ACTIVATION } from '../constants';
import reducer from '../reducer';

const initialState = {
  activateStbDevice: createApiInitialState(null),
  deviceActivationInitiated: null,
};

describe('decoder activation', () => {
  test('activation successful', () => {
    // Given

    const activateDecoderAction = createSuccessAPIAction(ACTIVATE_STB_DEVICE, activationSuccess);
    const expectedActivateDecoderState = createApiSuccessState(
      activationSuccess.activateSkyDecoder,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, activateDecoderAction)).toEqual({
      ...initialState,
      activateStbDevice: expectedActivateDecoderState,
    });
  });

  test('already activated', () => {
    // Given

    const activateDecoderAction = createSuccessAPIAction(
      ACTIVATE_STB_DEVICE,
      alreadyActivatedSuccess,
    );
    const expectedActivateDecoderState = createApiSuccessState(
      alreadyActivatedSuccess.activateSkyDecoder,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, activateDecoderAction)).toEqual({
      ...initialState,
      activateStbDevice: expectedActivateDecoderState,
    });
  });

  test('initiate device activation', () => {
    // Given

    const initiateDeviceActivationAction = createAction<{ value: boolean }>(
      SET_INITIATE_DEVICE_ACTIVATION,
    )({
      value: true,
    });
    const expectedActivateDecoderState = true;

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, initiateDeviceActivationAction)).toEqual({
      ...initialState,
      deviceActivationInitiated: expectedActivateDecoderState,
    });
  });
});
