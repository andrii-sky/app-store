import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '@/index';
import { createSuccessAPIActions } from '@/testUtils/api';
import { InstalledApp } from '@/types/interfaces/InstalledApp';
import {
  FETCH_ALL_APPS,
  FETCH_CONTENT,
  FETCH_RAIL,
  SET_FAVOURITE_APP,
  SET_INSTALLED_APPS,
  SET_LAST_OPENED_APP,
} from '../constants';
import {
  addToFavourites,
  fetchAllApps,
  fetchContent,
  fetchRailById,
  removeFromFavourites,
  setInstalledApps,
  setLastOpenedApp,
} from '../actions';

const initState = {
  myHub: {
    content: {
      data: {
        rails: [],
      },
    },
  },
};

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore(initState) as unknown) as MockStore;

describe('actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch myApps default content data from api success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({});
    const expectedActions = createSuccessAPIActions(FETCH_CONTENT, {});

    await store.dispatch(fetchContent(10) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch rail data from api success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({});
    const railId = 'fakeRailId';
    const expectedActions = createSuccessAPIActions(FETCH_RAIL, {}, { railId });

    await store.dispatch(fetchRailById(railId) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set installed apps', async () => {
    // setup
    const apps: InstalledApp[] = [
      {
        appName: 'Netflix',
        packageName: 'com.netflix.app',
        banner: 'very long base 64 image content netflix',
      },
      {
        appName: 'Disney+',
        packageName: 'com.disney.app',
        banner: 'mickey mouse is true new evil empire base 64 image',
      },
    ];
    const expectedActions = [
      {
        type: SET_INSTALLED_APPS,
        payload: apps,
      },
    ];

    await store.dispatch(setInstalledApps(apps));

    expect(store.getActions()).toEqual(expectedActions);
  });

  const appId = 'com.redbul.app';

  test('add to my favourite', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({ data: {} });

    const expectedActions = createSuccessAPIActions(
      SET_FAVOURITE_APP,
      {},
      {
        appId,
        isFavourite: true,
      },
    );

    await store.dispatch(addToFavourites(appId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('remove from my list success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({ data: {} });

    const expectedActions = createSuccessAPIActions(
      SET_FAVOURITE_APP,
      {},
      {
        appId,
        isFavourite: false,
        removeFromList: true,
      },
    );

    await store.dispatch(removeFromFavourites(appId, true));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set last opened app date', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue({ data: {} });

    const expectedActions = createSuccessAPIActions(
      SET_LAST_OPENED_APP,
      {},
      {
        appId,
      },
    );

    await store.dispatch(setLastOpenedApp(appId));

    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('fetch all apps', async () => {
  // setup
  (graphQLClient as jest.Mock).mockResolvedValue({ data: {} });

  const expectedActions = createSuccessAPIActions(FETCH_ALL_APPS, {});

  await store.dispatch(fetchAllApps());

  expect(store.getActions()).toEqual(expectedActions);
});
