import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { createAction } from '@reduxjs/toolkit';
import {
  getCustomerAccountResponse,
  createCustomerProfileByResponse,
  updateCustomerProfileByResponse,
  deleteCustomerProfileByResponse,
  purchaseTvodByResponse,
} from '@/modules/customer/__tests__/testData';
import {
  CREATE_CUSTOMER_PROFILE,
  DELETE_CUSTOMER_PROFILE,
  GET_CUSTOMER_ACCOUNT,
  PURCHASE_TVOD,
  SET_SELECTED_CUSTOMER_PROFILE_ID,
  UPDATE_CUSTOMER_PROFILE,
} from '../constants';
import reducer from '../reducer';

const initialState = {
  account: createApiInitialState({ profiles: [], tvodPurchases: [] }),
  selectedProfileId: null,
};

describe('customer profile managemenet', () => {
  test('get customer profiles', () => {
    // Given

    const getCustomerProfilesAction = createSuccessAPIAction(
      GET_CUSTOMER_ACCOUNT,
      getCustomerAccountResponse,
    );
    const expectedGetCustomerProfilesState = createApiSuccessState(
      getCustomerAccountResponse.customer,
    );

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, getCustomerProfilesAction)).toEqual({
      ...initialState,
      account: expectedGetCustomerProfilesState,
    });
  });

  test('get customer profile by id', () => {
    // Given
    const id = 'ABC1';
    const assetAction = createAction<any>(SET_SELECTED_CUSTOMER_PROFILE_ID)({ id });
    // when and Then
    expect(reducer(initialState, assetAction)).toEqual({
      ...initialState,
      selectedProfileId: 'ABC1',
    });
  });

  test('create customer profile', () => {
    // Given
    const createCustomerProfileAction = createSuccessAPIAction(
      CREATE_CUSTOMER_PROFILE,
      createCustomerProfileByResponse,
    );
    const expectedCreateCustomerProfilesState = createApiSuccessState({
      tvodPurchases: [],
      profiles: [createCustomerProfileByResponse?.createProfile],
    });

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, createCustomerProfileAction)).toEqual({
      ...initialState,
      account: expectedCreateCustomerProfilesState,
    });
  });

  test('update customer profile', () => {
    // Given

    const updateCustomerProfileAction = createSuccessAPIAction(
      UPDATE_CUSTOMER_PROFILE,
      updateCustomerProfileByResponse,
    );
    const expectedUpdateCustomerProfilesState = createApiSuccessState({
      tvodPurchases: [],
      profiles: [updateCustomerProfileByResponse?.updateProfile],
    });

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, updateCustomerProfileAction)).toEqual({
      ...initialState,
      account: expectedUpdateCustomerProfilesState,
    });
  });

  test('delete customer profile', () => {
    // Given
    const deleteCustomerProfileAction = createSuccessAPIAction(
      DELETE_CUSTOMER_PROFILE,
      deleteCustomerProfileByResponse,
      { id: getCustomerAccountResponse.customer.profiles[1].id },
    );
    const expectedDeleteCustomerProfilesState = createApiSuccessState({
      tvodPurchases: [],
      profiles: [getCustomerAccountResponse.customer.profiles[0]],
    });

    const deleteInitialState = {
      account: createApiInitialState({
        profiles: getCustomerAccountResponse.customer.profiles,
        tvodPurchases: [],
      }),
      selectedProfileId: null,
    };

    // When - invoke reducer, Then - verify state
    expect(reducer(deleteInitialState, deleteCustomerProfileAction)).toEqual({
      ...deleteInitialState,
      account: expectedDeleteCustomerProfilesState,
    });
  });

  test('purchase tvod', () => {
    // Given
    const purchaseTvodAction = createSuccessAPIAction(PURCHASE_TVOD, purchaseTvodByResponse);
    const expectedCreateCustomerProfilesState = createApiSuccessState({
      profiles: [],
      tvodPurchases: [purchaseTvodByResponse],
    });

    // When - invoke reducer, Then - verify state
    expect(reducer(initialState, purchaseTvodAction)).toEqual({
      ...initialState,
      account: expectedCreateCustomerProfilesState,
    });
  });
});
