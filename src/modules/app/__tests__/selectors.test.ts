import { isEPGLoaded, isNavigationReady, isRealmSynced } from '../selectors';

test('get isNavigtationReady', () => {
  const defaultState = {
    app: {
      isNavigationReady: true,
    },
  };

  expect(isNavigationReady(defaultState)).toEqual(true);
});

test('get isRealmSynced', () => {
  const defaultState = {
    app: {
      isRealmSynced: true,
    },
  };

  expect(isRealmSynced(defaultState)).toEqual(true);
});

test('get isEPGLoaded', () => {
  const defaultState = {
    app: {
      isEPGLoaded: true,
    },
  };

  expect(isEPGLoaded(defaultState)).toEqual(true);
});
