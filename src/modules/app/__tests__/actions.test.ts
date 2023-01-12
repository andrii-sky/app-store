import { MockStore } from 'redux-mock-store';
import { init } from '../../..';
import { resetStore, setEPGLoaded, setNavigationReady, setRealmSynced } from '../actions';
import { RESET_STORE, SET_EPG_LOADED, SET_NAVIGATION_READY, SET_REALM_SYNCED } from '../constants';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('app actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('reset store', async () => {
    const expectedActions = [
      {
        type: RESET_STORE,
        payload: {
          storageClearingList: [],
        },
      },
    ];

    store.dispatch(resetStore([]));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set navigation ready', async () => {
    const expectedActions = [
      {
        type: SET_NAVIGATION_READY,
        payload: true,
      },
    ];

    store.dispatch(setNavigationReady(true));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set realm syncing', async () => {
    const expectedActions = [
      {
        type: SET_REALM_SYNCED,
        payload: true,
      },
    ];

    store.dispatch(setRealmSynced(true));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set EPG loaded', async () => {
    const expectedActions = [
      {
        type: SET_EPG_LOADED,
        payload: true,
      },
    ];

    store.dispatch(setEPGLoaded(true));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
