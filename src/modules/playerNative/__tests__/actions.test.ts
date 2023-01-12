import { MockStore } from 'redux-mock-store';

import { init } from '../../..';
import {
  SET_IS_FULL_SCREEN,
  SET_IS_CHROMECAST_DEVICES_VISIBLE,
  SET_IS_CONTENT_RESTRICTED,
  SET_LAST_CHECKED_CONTENT,
} from '../constants';
import {
  setIsFullScreen,
  setIsChromecastDevicesVisible,
  setIsContentRestricted,
  setLastCheckedContent,
} from '../actions';

jest.mock('../../..');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('player actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('setIsFullScreen', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_FULL_SCREEN,
        payload: value,
      },
    ];

    store.dispatch(setIsFullScreen(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsChromecastVisible', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_CHROMECAST_DEVICES_VISIBLE,
        payload: value,
      },
    ];

    store.dispatch(setIsChromecastDevicesVisible(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsContentRestricted', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_CONTENT_RESTRICTED,
        payload: value,
      },
    ];

    store.dispatch(setIsContentRestricted(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setLastCheckedContent', () => {
    const value = 'episodeId1234';

    const expectedActions = [
      {
        type: SET_LAST_CHECKED_CONTENT,
        payload: value,
      },
    ];

    store.dispatch(setLastCheckedContent(value));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
