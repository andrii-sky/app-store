import { MockStore } from 'redux-mock-store';

import { init } from '../../..';
import {
  SET_DATE_STRING,
  SET_IS_DISABLED_RCU,
  SET_IS_MENU_OPEN,
  SET_IS_ON_SCREEN_GUIDE_VISIBLE,
  SET_KEYBOARD_OPEN,
  SET_LONG_PRESS_MODE_ID,
} from '../constants';
import {
  setDateString,
  setDisableRCU,
  setIsMenuOpen,
  setIsOnScreenGuideVisible,
  setIsKeyBoardOpen,
  setLongPressModeId,
} from '../actions';

jest.mock('../../..');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('contextTV actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('setDateString', () => {
    const value = '6:30pm';

    const expectedActions = [
      {
        type: SET_DATE_STRING,
        payload: value,
      },
    ];

    store.dispatch(setDateString(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setDisableRCU', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_DISABLED_RCU,
        payload: value,
      },
    ];

    store.dispatch(setDisableRCU(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsMenuOpen', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_MENU_OPEN,
        payload: value,
      },
    ];

    store.dispatch(setIsMenuOpen(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsOnScreenGuideVisible', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_ON_SCREEN_GUIDE_VISIBLE,
        payload: value,
      },
    ];

    store.dispatch(setIsOnScreenGuideVisible(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setLongPressModeId', () => {
    const value = '123';

    const expectedActions = [
      {
        type: SET_LONG_PRESS_MODE_ID,
        payload: value,
      },
    ];

    store.dispatch(setLongPressModeId(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsKeyBoardOpen', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_KEYBOARD_OPEN,
        payload: value,
      },
    ];

    store.dispatch(setIsKeyBoardOpen(value));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
