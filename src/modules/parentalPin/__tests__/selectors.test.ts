import dayjs from 'dayjs';
import { F, T } from 'ramda';

import { Typename } from '@/types/enums/Typename';
import { Classification, ParentalControl } from '@/types/graph-ql';

import {
  parentalSettings,
  approvedClassification,
  parentalControl,
  pinValidationStatus,
  parentalPinValidation,
  hasPinExpired,
  pinExpiry,
} from '../selectors';

jest.mock('dayjs');

describe('Parental Settings Selectors', () => {
  test('select parentalSettings', () => {
    const subs = {
      parentalControlEnabled: true,
      approvedClassification: Classification.G,
    };

    const state = {
      parentalPin: {
        parentalSettings: {
          data: subs,
          isLoading: false,
          error: null,
        },
      },
    };

    // When
    const settings = parentalSettings(state);

    // Then
    expect(settings).toEqual(subs);
  });

  test('select parental control enabled', () => {
    const subs = {
      parentalControl: ParentalControl.Enabled,
      approvedClassification: Classification.G,
    };

    const state = {
      parentalPin: {
        parentalSettings: {
          data: subs,
          isLoading: false,
          error: null,
        },
      },
    };

    // When
    const settings = parentalControl(state);

    // Then
    expect(settings).toEqual(subs.parentalControl);
  });

  test('select approved classification', () => {
    const subs = {
      parentalControlEnabled: true,
      approvedClassification: Classification._16,
    };

    const state = {
      parentalPin: {
        parentalSettings: {
          data: subs,
          isLoading: false,
          error: null,
        },
      },
    };

    // When
    const settings = approvedClassification(state);

    // Then
    expect(settings).toEqual(subs.approvedClassification);
  });

  test('select pin validation status', () => {
    const subs = {
      parentalControlEnabled: true,
      approvedClassification: Classification._16,
      pinValidationStatus: {
        attempts: 3,
        timeoutEnd: 0,
      },
    };

    const state = {
      parentalPin: {
        parentalSettings: {
          data: subs,
          isLoading: false,
          error: null,
        },
      },
    };

    // When
    const settings = pinValidationStatus(state);

    // Then
    expect(settings).toEqual(subs.pinValidationStatus);
  });
});

const pinState = expected => ({
  parentalPin: {
    parentalPinValidation: {
      data: {
        'f7729c68-d1fa-4e34-b6a1-5cf8cf11b2ba': expected,
      },
      isLoading: false,
      error: null,
    },
  },
  customer: {
    selectedProfileId: 'f7729c68-d1fa-4e34-b6a1-5cf8cf11b2ba',
  },
});

describe('Parental Pin Validation Selectors', () => {
  test('select parental pin validation response', () => {
    const expected = {
      pinValidationResult: {
        isValid: true,
        attempts: 0,
        timeoutEnd: 0,
      },
      lastEnteredPin: 'xyz',
      expiryDate: dayjs(),
    };
    const pinValidation = parentalPinValidation(pinState(expected));

    expect(pinValidation).toBe(expected);
  });
});

describe('pinExpiry Selector', () => {
  test('test pinExpiry', () => {
    (dayjs as any).mockReturnValue({
      add: () => dayjs(),
      isAfter: () => T(),
      isBefore: () => T(),
    });

    const expected = {
      pinValidationResult: {
        __typename: Typename.PinValidationResult,
        isValid: true,
        attempts: 0,
        timeoutEnd: 0,
      },
      lastEnteredPin: 'xyz',
      expiryDate: dayjs().add(10, 'minute'),
    };

    const pinExpiryDate = pinExpiry(pinState(expected));

    expect(pinExpiryDate).toBeDefined();
    expect(
      pinExpiryDate.isAfter(dayjs().add(570, 'second')) &&
        pinExpiryDate.isBefore(dayjs().add(10, 'minute')),
    ).toBeTruthy();
  });

  test('test hasPinExpired true', () => {
    const date = undefined;

    const hasExpired = hasPinExpired(date);

    expect(hasExpired).toBeTruthy();
  });

  test('test hasPinExpired false', () => {
    (dayjs as any).mockReturnValue({
      add: () => jest.requireActual('jest'),
      isAfter: () => F(),
    });
    const date = dayjs().add(10, 'minute');

    const hasExpired = hasPinExpired(date);

    expect(hasExpired).toBeFalsy();
  });
});
