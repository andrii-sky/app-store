import { MockStore } from 'redux-mock-store';

import { init } from '../../..';
import { setInternetSource, setIsInternetConnected } from '../actions';
import { SET_INTERNET_CONNECTED, SET_INTERNET_SOURCE } from '../constants';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('network actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('set is internet connected', async () => {
    const isConnected = true;
    const expectedActions = [
      {
        type: SET_INTERNET_CONNECTED,
        payload: isConnected,
      },
    ];

    store.dispatch(setIsInternetConnected(isConnected));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set internet source', async () => {
    const source = 'cellular';
    const expectedActions = [
      {
        type: SET_INTERNET_SOURCE,
        payload: 'cellular',
      },
    ];

    store.dispatch(setInternetSource(source));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
