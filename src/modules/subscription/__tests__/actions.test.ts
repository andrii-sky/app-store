import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createSuccessAPIActions } from '@/testUtils/api';
import { FETCH_USER_SUBSCRIPTIONS } from '../constants';
import { fetchSubscriptions } from '../actions';

const initState = {
  subscriptions: [],
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('subscription actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('fetch subscriptions success', async () => {
    // Given
    const data = {
      subscriptions: [
        {
          id: 'PrimeLive',
          title: 'PrimeLive',
        },
      ],
    };
    (graphQLClient as jest.Mock).mockResolvedValue(data);
    const expectedActions = createSuccessAPIActions(FETCH_USER_SUBSCRIPTIONS, data);

    // When
    await store.dispatch(fetchSubscriptions());

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });
});
