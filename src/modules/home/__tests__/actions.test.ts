import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '../../..';
import { FETCH_CONTENT, FETCH_RAIL } from '../constants';
import { fetchContent, fetchRailById } from '../actions';
import { createSuccessAPIActions } from '../../../testUtils/api';

const initState = {
  home: {
    content: {
      data: {
        heroSet: null,
        rails: [],
      },
    },
  },
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('hero content actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch home content data from api success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({});
    const expectedActions = createSuccessAPIActions(FETCH_CONTENT, {});

    await store.dispatch(fetchContent(10) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch home content data with specific rail from api success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({});
    const expectedActions = createSuccessAPIActions(FETCH_CONTENT, {});

    await store.dispatch(fetchContent(10, 'fakeRailId', false) as any);

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
