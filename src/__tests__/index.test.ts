import { createAction } from '@reduxjs/toolkit';
import { REHYDRATE_STORE, RESET_STORE } from '@/modules/app/constants';
import { DVBThreeStepsInitStates } from '@/types/enums/DVBThreeStepsInitStates';
import { configKeys, init } from '../index';

import allActions from '../actions';
import allSelectors from '../selectors';
import ModuleName from '../ModuleName';

const CONFIG = {
  [configKeys.EXP_API_URL]: 'http://exp-api-url',
  [configKeys.SPOTIFY_API_URL]: 'http://spotify.com',
};

const LOGGER = {
  captureMessage() {},
  captureException() {},
  addBreadcrumb() {},
};

const defaultState = {
  app: {
    isNavigationReady: false,
    isRealmSynced: false,
    isEPGLoaded: false,
  },
  auth: {
    accessToken: '',
    error: null,
    user: null,
    config: {
      data: null,
      isLoading: false,
    },
    isLoading: null,
  },
  channels: {
    categoryById: {
      data: {},
      isLoading: false,
    },
    channelById: {},
    channelsByCategoryId: {
      data: {},
      isLoading: false,
    },
    selectedCategoryId: '',
    selectedChannelId: '',
    selectedChannelSlot: {
      data: {},
      isLoading: false,
    },
  },
  chromecast: {
    casting: {
      data: {},
      error: null,
      isLoading: false,
    },
    connectedDevice: null,
    connectingError: null,
    devices: [],
    isConnected: false,
    isReadyToCast: false,
    isAttemptingToCast: false,
    isDeviceModalOpen: false,
    isConnecting: false,
    isPlayerExpanded: false,
    isPlayerSeasonsSelectorVisible: false,
    volume: null,
  },
  collections: {
    collectionsById: {
      data: {},
      isLoading: false,
    },
    filtersById: {
      data: {},
      isLoading: false,
    },
    browseCategories: {
      data: [],
      isLoading: false,
    },
  },
  decoder: {
    activateStbDevice: {
      data: null,
      isLoading: false,
    },
    deviceActivationInitiated: null,
  },
  devices: {
    deactivateDevice: {
      data: null,
      isLoading: false,
    },
    devices: {
      data: [],
      isLoading: false,
    },
    registerDevice: {
      data: null,
      isLoading: false,
    },
    serialNumber: null,
    updateDeviceName: {
      data: null,
      isLoading: false,
    },
    playbackDevice: null,
  },
  download2Go: {
    downloadAssetsById: {},
    downloadSettings: {},
  },
  epg: {
    slotsByChannelId: {
      data: {},
      isLoading: false,
    },
    selectedSlot: {
      data: null,
      isLoading: false,
    },
  },
  home: {
    content: {
      data: {
        heroSet: undefined,
        rails: [],
      },
      isLoading: false,
    },
  },
  myStuff: {
    deviceVideoQuality: {
      data: {},
      isLoading: false,
    },
    myList: {
      data: [],
      isLoading: false,
    },
  },
  network: {
    isInternetConnected: true,
    internetSource: '',
  },
  parentalPin: {
    parentalPinValidation: {
      data: {},
      isLoading: false,
    },
    parentalSettings: {
      data: {
        parentalControlEnabled: false,
        approvedClassification: '_G',
        parentalControl: 'DISABLED',
      },
      isLoading: false,
    },
  },
  playback: {
    playbackConcurrencyById: {
      data: {},
      isLoading: false,
    },
    playbackMetaByMediaAssetId: {
      data: {},
      isLoading: false,
    },
    offlinePlaybackMetaByMediaAssetId: {
      data: {},
      isLoading: false,
    },
  },
  playerNative: {
    isChromecastDevicesVisible: false,
    isFullScreen: false,
    isContentRestricted: false,
    lastCheckedContent: null,
  },
  remoteRecord: {
    decoders: {
      data: [],
      isLoading: false,
    },
    record: {
      data: null,
      isLoading: false,
    },
  },
  search: {
    popular: {
      data: [],
      isLoading: false,
    },
    query: '',
    result: {
      data: null,
      isLoading: false,
    },
    similar: {
      data: [],
      isLoading: false,
    },
    suggestions: {
      data: [],
      isLoading: false,
    },
  },
  spotify: {
    accessToken: null,
    albumsById: {
      data: {},
      isLoading: false,
    },
    albumsSavedById: {
      data: {},
      isLoading: false,
    },
    authError: null,
    playerState: {
      data: {
        lastSeekTime: 0,
        player: null,
      },
      isLoading: false,
    },
    profile: {
      data: {},
      isLoading: false,
    },
  },
  subscription: {
    subscriptions: {
      data: [],
      isLoading: false,
    },
  },
  titles: {
    brandById: {
      data: {},
      isLoading: false,
    },
    selectedSeasonByBrandId: {},
  },
  userAttributes: {
    userAttributes: {
      data: null,
      isLoading: false,
    },
  },
  messaging: {
    globalMessage: null,
  },
  featureFlags: {
    flags: {},
  },
  airplay: {
    isConnected: false,
    isAvailable: false,
  },
  myHub: {
    content: {
      data: {
        rails: [],
      },
      isLoading: false,
    },
  },
  myApps: {
    content: {
      data: {
        rails: [],
      },
      isLoading: false,
    },
    installed: [],
    allApps: {
      data: [],
      isLoading: false,
    },
  },
  recordings: {
    scheduledRecordingsByProgrammeId: {},
    recordings: [],
    recordingSettings: {},
    plannerSorting: 'newest',
    scheduledSeries: [],
  },
  customer: {
    account: {
      data: {},
      isLoading: false,
    },
    selectedProfileId: null,
  },
  notificationsTV: {
    notificationCount: 0,
    notificationsSeen: false,
  },
  dvb: {
    mwCtxCount: -2,
    isMwReady: false,
    mwEventSource: null,
    playerInstanceId: null,
    hasMail: false,
    isServiceStatusOpen: false,
    isCasErrorModalDisplayed: false,
    scanDvbState: DVBThreeStepsInitStates.ready,
    isCasHomeSet: DVBThreeStepsInitStates.ready,
    dvbSignalReservationId: '',
    isPlayerSurfaceSet: DVBThreeStepsInitStates.ready,
    isPlayerActionDone: false,
    queryRecordingsState: DVBThreeStepsInitStates.ready,
    isDvbSignalOk: true,
    hasSatelliteConnection: true,
  },
  contextTV: {
    dateString: '',
    isMenuOpen: false,
    isDisabledRCU: false,
    isOnScreenGuideVisible: false,
    longPressModeId: '',
    isKeyBoardOpen: false,
  },
  tilesFocusTV: {
    focusedRow: 0,
    focusedElement: 0,
    isFocused: false,
  },
};

describe('Store - init()', () => {
  test('should be able to work with initial state', () => {
    const { createStore } = init(CONFIG, LOGGER);
    expect(createStore).toBeDefined();

    const testToken = 'test_access_token';

    const initState = {
      auth: {
        accessToken: testToken,
      },
    };
    const store = createStore(initState);

    expect(store.dispatch).toBeDefined();
    expect(store.getState().auth.accessToken).toBe(testToken);
  });
  test('should not work without config', () => {
    expect(() => {
      init();
    }).toThrow();
  });
  test('should work without logger or excludedModules', () => {
    expect(() => {
      init(CONFIG);
    }).not.toThrow();
  });
  test('should be able to exclude modules', () => {
    const { actions, selectors } = init(CONFIG, LOGGER, [ModuleName.Spotify]);

    // expect other modules to be there
    expect(actions.auth).toBeDefined();
    expect(selectors.auth).toBeDefined();
    // expect spotify actions and selectors to not be included
    expect(actions.spotify).toBeUndefined();
    expect(selectors.spotify).toBeUndefined();
  });
  test('should export all modules if excluded modules are empty', () => {
    const { actions, selectors } = init(CONFIG, LOGGER, []);

    // expect all modules to be there
    Object.keys(allActions).forEach(action => {
      expect(actions[action]).toBeDefined();
    });
    Object.keys(allSelectors).forEach(selector => {
      expect(selectors[selector]).toBeDefined();
    });
  });
  test('should export all modules if no modules are excluded', () => {
    const { actions, selectors } = init(CONFIG, LOGGER);

    // expect all modules to be there
    Object.keys(allActions).forEach(action => {
      expect(actions[action]).toBeDefined();
    });
    Object.keys(allSelectors).forEach(selector => {
      expect(selectors[selector]).toBeDefined();
    });
  });
  test('should not throw if excludedModule does not exist', () => {
    expect(() => {
      // Intentionally testing a runtime-error case
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { actions, selectors } = init(CONFIG, LOGGER, ['RONALDO']);

      // expect other modules to be there
      expect(actions.auth).toBeDefined();
      expect(selectors.auth).toBeDefined();

      // expect spotify actions and selectors to not be included
      // Intentionally testing a runtime-error case
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(actions.RONALDO).toBeUndefined();
      // Intentionally testing a runtime-error case
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(selectors.RONALDO).toBeUndefined();
    }).not.toThrow();
  });

  test('reset store reducer', () => {
    const currentState = {
      auth: { accessToken: 'cbjebcje' },
      myStuff: {
        deviceVideoQuality: {
          data: { deviceId: 'wifi-only' },
          isLoading: false,
        },
        myList: {
          data: [],
          isLoading: false,
        },
      },
    };

    const assetAction = createAction<any>(RESET_STORE)({ storageClearingList: ['auth'] });
    const { createStore } = init(CONFIG, LOGGER);
    expect(createStore).toBeDefined();
    const store = createStore(currentState);
    const { dispatch } = store;
    dispatch(assetAction);
    // console.log('state after', store.getState());
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(store.getState()).toEqual({ ...defaultState, myStuff: currentState.myStuff });
  });

  test('rehydrate store reducer', () => {
    const currentState = {
      auth: {
        accessToken: '',
      },
      channels: {
        channelById: {},
        selectedChannelId: null,
        categoryById: {},
        channelsByCategoryId: {
          data: {},
          isLoading: false,
        },
        selectedCategoryId: '',
        selectedChannelSlot: {
          data: {},
          isLoading: false,
        },
      },
    };

    const persistedState = {
      auth: {
        accessToken: 'cbjebcje',
        error: null,
        user: null,
        config: {
          data: null,
          isLoading: false,
        },
        isLoading: false,
      },
      channels: {
        channelById: { SS7: { title: 'SS7', id: 'SS7' }, SS1: { title: 'SS1', id: 'SS1' } },
        selectedChannelId: 'SS7',
        categoryById: {},
        channelsByCategoryId: {
          data: {},
          isLoading: false,
        },
        selectedCategoryId: '',
        selectedChannelSlot: {
          data: {},
          isLoading: false,
        },
      },
    };

    const assetAction = createAction<any>(REHYDRATE_STORE)({ persistStore: persistedState });
    const { createStore } = init(CONFIG, LOGGER);
    expect(createStore).toBeDefined();
    const store = createStore(currentState);
    const { dispatch } = store;
    dispatch(assetAction);
    // console.log('state after', store.getState());
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(store.getState()).toEqual({ ...defaultState, ...persistedState });
  });
});
