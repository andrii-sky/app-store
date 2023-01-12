import { activationSuccess } from '@/modules/decoder/__tests__/testData';
import {
  activateStbDeviceSuccess,
  activateStbDeviceIsLoading,
  activateStbDeviceError,
  isDeviceActivationInitiated,
} from '../selectors';

describe('activate decoder', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      decoder: {
        activateStbDevice: {
          data: null,
          isLoading: true,
          error: null,
        },
      },
    };
    const success = activateStbDeviceSuccess(defaultState);

    // Then
    expect(success).toEqual(null);

    expect(activateStbDeviceIsLoading(defaultState)).toEqual(true);

    expect(activateStbDeviceError(defaultState)).toEqual(null);
  });

  test('activate stb success', () => {
    const defaultState = {
      decoder: {
        activateStbDevice: {
          data: activationSuccess.activateSkyDecoder,
          isLoading: false,
          error: null,
        },
      },
    };

    const successState = activateStbDeviceSuccess(defaultState);

    // Then
    expect(successState).toEqual(activationSuccess.activateSkyDecoder);
    expect(activateStbDeviceIsLoading(defaultState)).toEqual(false);

    expect(activateStbDeviceError(defaultState)).toEqual(null);
  });

  test('initiate device activation', () => {
    const defaultState = {
      decoder: {
        activateStbDevice: {
          data: activationSuccess.activateSkyDecoder,
          isLoading: false,
          error: null,
        },
        deviceActivationInitiated: true,
      },
    };

    const successState = isDeviceActivationInitiated(defaultState);

    // Then
    expect(successState).toEqual(true);
  });
});
