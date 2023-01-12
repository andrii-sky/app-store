import { createAction } from '@reduxjs/toolkit';

import { SET_EPG_LOADED, SET_NAVIGATION_READY, SET_REALM_SYNCED } from '../constants';
import reducer from '../reducer';

const appInitialState = {
  isNavigationReady: false,
  isRealmSynced: false,
  isEPGLoaded: false,
};

test('set navigation ready', () => {
  const setNavigationReady = createAction<any>(SET_NAVIGATION_READY)(true);

  expect(reducer(appInitialState, setNavigationReady)).toEqual({
    ...appInitialState,
    isNavigationReady: true,
  });
});

test('set realm synced', () => {
  const setRealmSynced = createAction<any>(SET_REALM_SYNCED)(true);

  expect(reducer(appInitialState, setRealmSynced)).toEqual({
    ...appInitialState,
    isRealmSynced: true,
  });
});

test('set EPG loaded', () => {
  const setRealmSynced = createAction<any>(SET_EPG_LOADED)(true);

  expect(reducer(appInitialState, setRealmSynced)).toEqual({
    ...appInitialState,
    isEPGLoaded: true,
  });
});
