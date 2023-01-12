/* eslint-disable @typescript-eslint/camelcase */
import { getFeatureConfig, isFeatureEnabled } from '../selectors';

// GIVEN
const config = {
  initialRailSize: {
    handset: 10,
    tablet: 20,
    tv: 20,
  },
};

const state = {
  featureFlags: {
    flags: {
      DOWNLOADS: { value: true, config: null },
      RAIL_LAZY_LOADING: { value: true, config },
    },
  },
};

test('select is feature enabled', () => {
  // when
  const isEnabled = isFeatureEnabled(state)('DOWNLOADS');

  // Then
  expect(isEnabled).toEqual(true);
});

test('select is feature not available', () => {
  // when
  const isEnabled = isFeatureEnabled(state)('VIDEO_QUALITY');

  // Then
  expect(isEnabled).toEqual(false);
});

test('getFeatureConfig', () => {
  // when
  const conf = getFeatureConfig(state)('RAIL_LAZY_LOADING');

  // Then
  expect(conf).toEqual(config);
});
