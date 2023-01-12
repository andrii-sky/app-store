import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import {
  createFailureAPIActions,
  createRequestAPIAction,
  createSuccessAPIAction,
  createSuccessAPIActions,
} from '@/testUtils/api';
import APIError from '@/errors/APIError';
import { createAction } from '@reduxjs/toolkit';
import {
  getCustomerAccountResponse,
  getCustomerProfileByIdResponse,
  createCustomerProfileByResponse,
  updateCustomerProfileByResponse,
  purchaseTvodByResponse,
  purchasePpvByResponse,
} from './testData';
import {
  GET_CUSTOMER_ACCOUNT,
  GET_CUSTOMER_PROFILE_BY_ID,
  CREATE_CUSTOMER_PROFILE,
  UPDATE_CUSTOMER_PROFILE,
  DELETE_CUSTOMER_PROFILE,
  SET_SELECTED_CUSTOMER_PROFILE_ID,
  SET_SELECTED_PROFILE,
  PURCHASE_TVOD,
  PURCHASE_PPV,
} from '../constants';
import {
  getCustomerAccount,
  getCustomerProfileById,
  createCustomerProfile,
  updateCustomerProfile,
  deleteCustomerProfile,
  setSelectedProfile,
  purchaseTvod,
  purchasePpv,
} from '../actions';

const initState = {};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('profile-management', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('get customer profiles', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(getCustomerAccountResponse);
    const expectedActions = createSuccessAPIActions(
      GET_CUSTOMER_ACCOUNT,
      getCustomerAccountResponse,
    );

    await store.dispatch(getCustomerAccount());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('get customer profiles failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      GET_CUSTOMER_ACCOUNT,
      new APIError(error.message, error.status),
    );

    await store.dispatch(getCustomerAccount());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('get customer profiles by id', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(getCustomerProfileByIdResponse);
    const expectedActions = createSuccessAPIActions(
      GET_CUSTOMER_PROFILE_BY_ID,
      getCustomerProfileByIdResponse,
    );

    await store.dispatch(getCustomerProfileById('KO7C5KTNXXHAA'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('get customer profiles by id failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      GET_CUSTOMER_PROFILE_BY_ID,
      new APIError(error.message, error.status),
    );

    await store.dispatch(getCustomerProfileById('KO7C5KTNXXHAA'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('create customer profile', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(createCustomerProfileByResponse);
    const expectedActions = createSuccessAPIActions(
      CREATE_CUSTOMER_PROFILE,
      createCustomerProfileByResponse,
    );

    await store.dispatch(createCustomerProfile('Random-Name'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('create customer profile failure', async () => {
    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      CREATE_CUSTOMER_PROFILE,
      new APIError(error.message, error.status),
    );

    await store.dispatch(createCustomerProfile('Random-Name'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('update customer profile', async () => {
    const existingStore = (createStore({
      customer: {
        account: {
          data: {
            profiles: [
              {
                customerProfileAvatar: { id: 'default', image: [Object] },
                id: 'KO7C5KTNXXHAA',
                isDefault: true,
                name: 'Sharan',
              },
              {
                customerProfileAvatar: { id: 'person-blue', image: [Object] },
                id: 'M744ZICT2OGE6',
                isDefault: false,
                name: 'profile-3',
              },
            ],
          },
        },
      },
    }) as unknown) as MockStore;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(updateCustomerProfileByResponse);
    const expectedActions = createSuccessAPIActions(
      UPDATE_CUSTOMER_PROFILE,
      updateCustomerProfileByResponse,
    );

    await existingStore.dispatch(updateCustomerProfile('KO7C5KTNXXHAA', 'Random-Name') as any);

    expect(existingStore.getActions()).toEqual(expectedActions);
  });

  test('update customer profile failure', async () => {
    const existingStore = (createStore({
      customer: {
        account: {
          data: {
            profiles: [
              {
                customerProfileAvatar: { id: 'default', image: [Object] },
                id: 'KO7C5KTNXXHAA',
                isDefault: true,
                name: 'Sharan',
              },
              {
                customerProfileAvatar: { id: 'person-blue', image: [Object] },
                id: 'M744ZICT2OGE6',
                isDefault: false,
                name: 'profile-3',
              },
            ],
          },
        },
      },
    }) as unknown) as MockStore;

    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      UPDATE_CUSTOMER_PROFILE,
      new APIError(error.message, error.status),
    );

    await existingStore.dispatch(updateCustomerProfile('KO7C5KTNXXHAA', 'Random-Name') as any);

    expect(existingStore.getActions()).toEqual(expectedActions);
  });

  test('delete customer profile', async () => {
    const existingStore = (createStore({
      customer: {
        account: {
          data: {
            profiles: [
              {
                customerProfileAvatar: { id: 'default', image: [Object] },
                id: 'KO7C5KTNXXHAA',
                isDefault: true,
                name: 'Sharan',
              },
              {
                customerProfileAvatar: { id: 'person-blue', image: [Object] },
                id: 'M744ZICT2OGE6',
                isDefault: false,
                name: 'profile-3',
              },
            ],
          },
        },
        selectedProfileId: 'M744ZICT2OGE6',
      },
    }) as unknown) as MockStore;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(updateCustomerProfileByResponse);
    const expectedAction1 = createRequestAPIAction(DELETE_CUSTOMER_PROFILE, {
      id: 'M744ZICT2OGE6',
    });
    const expectedAction2 = createSuccessAPIAction(
      DELETE_CUSTOMER_PROFILE,
      updateCustomerProfileByResponse,
      { id: 'M744ZICT2OGE6' },
    );
    const expectedActions3 = createAction<any>(SET_SELECTED_CUSTOMER_PROFILE_ID)({
      id: 'KO7C5KTNXXHAA',
    });
    await existingStore.dispatch(deleteCustomerProfile('M744ZICT2OGE6') as any);
    expect(existingStore.getActions()).toEqual([
      expectedAction1,
      expectedAction2,
      expectedActions3,
    ]);
  });

  test('delete customer profile failure', async () => {
    const existingStore = (createStore({
      customer: {
        account: {
          data: {
            profiles: [
              {
                customerProfileAvatar: { id: 'default', image: [Object] },
                id: 'KO7C5KTNXXHAA',
                isDefault: true,
                name: 'Sharan',
              },
              {
                customerProfileAvatar: { id: 'person-blue', image: [Object] },
                id: 'M744ZICT2OGE6',
                isDefault: false,
                name: 'profile-3',
              },
            ],
          },
        },
        selectedProfileId: 'M744ZICT2OGE6',
      },
    }) as unknown) as MockStore;

    // setup
    const error = {
      status: 404,
      message: 'no data',
    };
    (graphQLClient as jest.Mock).mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      DELETE_CUSTOMER_PROFILE,
      new APIError(error.message, error.status),
      { id: 'M744ZICT2OGE6' },
    );

    await existingStore.dispatch(deleteCustomerProfile('M744ZICT2OGE6') as any);

    expect(existingStore.getActions()).toEqual(expectedActions);
  });

  test('set selected profile', async () => {
    const defaultAuth0Profile = { id: '123', name: 'test' };
    const expectedActions = [
      { payload: { profile: defaultAuth0Profile }, type: SET_SELECTED_PROFILE },
      { payload: { id: '123' }, type: SET_SELECTED_CUSTOMER_PROFILE_ID },
    ];

    store.dispatch(setSelectedProfile(defaultAuth0Profile) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('purchase tvod content', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(purchaseTvodByResponse);
    const expectedActions = createSuccessAPIActions(PURCHASE_TVOD, purchaseTvodByResponse);

    await store.dispatch(purchaseTvod('avengersMovieId', 'deviceId'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('purchase ppv content', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(purchasePpvByResponse);
    const expectedActions = createSuccessAPIActions(PURCHASE_PPV, purchasePpvByResponse);

    await store.dispatch(purchasePpv('avengersMovieId', 'deviceId'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
