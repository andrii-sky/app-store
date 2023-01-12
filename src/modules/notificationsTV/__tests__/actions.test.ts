import { MockStore } from 'redux-mock-store';

import { init } from '../../..';
import { SET_NOTIFICATION_COUNT, SET_NOTIFICATIONS_SEEN } from '../constants';
import { setNotificationCount, setNotificationsSeen } from '../actions';

jest.mock('../../..');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('notifications actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('setNotificationCount', () => {
    const value = 4;

    const expectedActions = [
      {
        type: SET_NOTIFICATION_COUNT,
        payload: value,
      },
    ];

    store.dispatch(setNotificationCount(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setNotificationsSeen', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_NOTIFICATIONS_SEEN,
        payload: value,
      },
    ];

    store.dispatch(setNotificationsSeen(value));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
