import { MockStore } from 'redux-mock-store';

import { init } from '../../..';
import { saveAllFeatureFlags, saveFeatureFlag } from '../actions';
import { SAVE_ALL_FEATURE_FLAGS, SAVE_FEATURE_FLAG } from '../constants';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('featureFlags actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('save feature flag', async () => {
    const name = 'RAIL_LAZY_LOADING';
    const value = {
      value: true,
      config: {
        initialRailSize: {
          handset: 10,
          tablet: 20,
          tv: 20,
        },
      },
    };
    const expectedActions = [
      {
        type: SAVE_FEATURE_FLAG,
        payload: { name, value },
      },
    ];

    store.dispatch(saveFeatureFlag(name, value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('save all feature flags', async () => {
    const name = 'RAIL_LAZY_LOADING';
    const value = {
      value: true,
      config: {
        initialRailSize: {
          handset: 10,
          tablet: 20,
          tv: 20,
        },
      },
    };

    const allFeatureFlags = { [name]: value };
    const expectedActions = [
      {
        type: SAVE_ALL_FEATURE_FLAGS,
        payload: allFeatureFlags,
      },
    ];

    store.dispatch(saveAllFeatureFlags(allFeatureFlags));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
