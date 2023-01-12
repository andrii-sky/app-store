import { createAction } from '@reduxjs/toolkit';

import { SAVE_ALL_FEATURE_FLAGS, SAVE_FEATURE_FLAG } from '../constants';
import reducer from '../reducer';

const initialState = {
  flags: {
    DOWNLOADS: false,
  },
};

test('save feature flag', () => {
  // Given
  const name = 'DOWNLOADS';
  const value = true;
  const assetAction = createAction<any>(SAVE_FEATURE_FLAG)({ name, value });
  // when and Then
  expect(reducer(initialState, assetAction)).toEqual({
    ...initialState,
    flags: {
      [name]: value,
    },
  });
});

test('save all feature flags', () => {
  // Given
  const name = 'DOWNLOADS';
  const value = true;

  const featureFlags = { [name]: value };
  const assetAction = createAction<any>(SAVE_ALL_FEATURE_FLAGS)(featureFlags);
  // when and Then
  expect(reducer(initialState, assetAction)).toEqual({
    ...initialState,
    flags: {
      [name]: value,
    },
  });
});
