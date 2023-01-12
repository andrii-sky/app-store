import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createSuccessAPIActions } from '@/testUtils/api';
import { FETCH_USER_ATTRIBUTES } from '../constants';
import { fetchUserAttributes } from '../actions';

const initState = {
  subscriptions: [],
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('attributes actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('fetch attributes success', async () => {
    // Given
    const data = {
      attributes: [
        {
          name: 'newSkyGoPlatform',
          value: 'optIn',
        },
        {
          name: 'accountId',
          value: 'auth0|63444fdf-a1cd-4d2e-983e-ae61a6a9c8feTEST',
        },
      ],
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);
    const expectedActions = createSuccessAPIActions(FETCH_USER_ATTRIBUTES, data);

    // When
    await store.dispatch(fetchUserAttributes());

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });
});
