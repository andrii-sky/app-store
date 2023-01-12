import { MockStore } from 'redux-mock-store';

import { init } from '../../..';
import { setGlobalMessage } from '../actions';
import { SET_GLOBAL_MESSAGE } from '../constants';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('Global message actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('set global message', async () => {
    const globalMessage = 'We all gonna die!';
    const expectedActions = [
      {
        type: SET_GLOBAL_MESSAGE,
        payload: globalMessage,
      },
    ];

    store.dispatch(setGlobalMessage(globalMessage));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
