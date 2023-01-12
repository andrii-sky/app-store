import { MockStore } from 'redux-mock-store';

import { init } from '../../..';
import { setIsAvailable, setIsConnected } from '../actions';
import { SET_AIRPLAY_AVAILABLE, SET_AIRPLAY_CONNECTED } from '../constants';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('airplay actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('set is airplay connected', async () => {
    const isConnected = true;
    const expectedActions = [
      {
        type: SET_AIRPLAY_CONNECTED,
        payload: isConnected,
      },
    ];

    store.dispatch(setIsConnected(isConnected));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set is airplay available', async () => {
    const isAvailable = true;
    const expectedActions = [
      {
        type: SET_AIRPLAY_AVAILABLE,
        payload: isAvailable,
      },
    ];

    store.dispatch(setIsAvailable(isAvailable));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
