import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createSuccessAPIActions, createRequestAPIAction } from '@/testUtils/api';
import { Classification } from '@/types/graph-ql';
import {
  FETCH_USER_PARENTAL_SETTINGS,
  SET_PARENTAL_PIN,
  SET_PARENTALLY_APPROVED_CLASSIFICATION,
  ENTER_PARENTAL_PIN,
  RESET_PARENTAL_PIN,
  VALIDATE_PARENTAL_PIN,
  SET_PARENTAL_CONTROLS,
  CLEAR_VALIDATE_PARENTAL_PIN,
} from '../constants';
import {
  fetchParentalSettings,
  setParentalControl,
  setParentalPin,
  setParentalllyApprovedClassification,
  enterParentalPin,
  resetParentalPin,
  validateParentalPin,
  clearParentalPinValidationResult,
} from '../actions';

const initState = {
  customer: {
    selectedProfileId: 'f7729c68-d1fa-4e34-b6a1-5cf8cf11b2ba',
  },
  parentalPin: {
    parentalSettings: null,
  },
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('parentalSetetings actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('fetch parental settings success', async () => {
    // Given
    const data = {
      parentalSettings: {
        parentalControlEnabled: true,
        approvedClassification: Classification.G,
      },
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);
    const expectedActions = createSuccessAPIActions(FETCH_USER_PARENTAL_SETTINGS, data);

    // When
    await store.dispatch(fetchParentalSettings());

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set parental control', async () => {
    // Given
    const data = {
      parentalSettings: {
        parentalControlEnabled: false,
        approvedClassification: Classification.G,
      },
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);

    const expectedActions = [
      ...createSuccessAPIActions(SET_PARENTAL_CONTROLS, data, { enabled: false }),
      createRequestAPIAction(FETCH_USER_PARENTAL_SETTINGS),
    ];

    // When
    await store.dispatch(setParentalControl(false));
    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set parentallly approved classification', async () => {
    // Given
    const data = {
      parentalSettings: {
        parentalControlEnabled: false,
        approvedClassification: Classification.Pg,
      },
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);
    const expectedActions = createSuccessAPIActions(SET_PARENTALLY_APPROVED_CLASSIFICATION, data, {
      code: Classification.Pg,
    });

    // When
    await store.dispatch(setParentalllyApprovedClassification(Classification.Pg));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set parental pin success', async () => {
    const pin = '1234';
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const expectedActions = createSuccessAPIActions(SET_PARENTAL_PIN, {
      parentalSettings: {
        parentalControlEnabled: false,
        approvedClassification: Classification.Pg,
      },
    });

    await store.dispatch(setParentalPin(pin));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('enter parental pin success', async () => {
    const pin = '1234';
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const expectedActions = createSuccessAPIActions(ENTER_PARENTAL_PIN, {
      parentalSettings: {
        parentalControlEnabled: false,
        approvedClassification: Classification.Pg,
      },
    });

    await store.dispatch(enterParentalPin(pin));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('reset pin success', async () => {
    const data = {
      resetParentalPin: null,
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const expectedActions = createSuccessAPIActions(RESET_PARENTAL_PIN, {
      resetParentalPin: null,
    });

    await store.dispatch(resetParentalPin());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('pin validation success', async () => {
    const data = {
      validateParentalPin: {
        isValid: true,
        attempts: 0,
      },
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);

    const expectedActions = createSuccessAPIActions(
      VALIDATE_PARENTAL_PIN,
      {
        validateParentalPin: {
          isValid: true,
          attempts: 0,
        },
      },
      { lastEnteredPin: '1235', userProfileId: 'f7729c68-d1fa-4e34-b6a1-5cf8cf11b2ba' },
    );

    await store.dispatch(validateParentalPin('1235') as any);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('clear pin validation', async () => {
    const data = {
      validateParentalPin: {
        isValid: true,
        attempts: 0,
      },
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);

    const expectedActions = [
      {
        type: CLEAR_VALIDATE_PARENTAL_PIN,
        payload: {
          userProfileId: 'f7729c68-d1fa-4e34-b6a1-5cf8cf11b2ba',
        },
      },
    ];

    await store.dispatch(clearParentalPinValidationResult() as any);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
