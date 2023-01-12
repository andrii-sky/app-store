import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createSuccessAPIActions } from '@/testUtils/api';
import { FETCH_CONTENT, FETCH_RAIL } from '../constants';
import { fetchContent, fetchRailById } from '../actions';

const initState = {
  myHub: {
    content: {
      data: {
        rails: [],
      },
    },
  },
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch myHub favourites content data from api success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({});
    const expectedActions = createSuccessAPIActions(FETCH_CONTENT, {});

    await store.dispatch(fetchContent(10) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch rail data from api success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({});
    const railId = 'fakeRailId';
    const expectedActions = createSuccessAPIActions(FETCH_RAIL, {}, { railId });

    await store.dispatch(fetchRailById(railId) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
