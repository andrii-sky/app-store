import { createAction } from '@reduxjs/toolkit';
import {
  RESET_STORE,
  REHYDRATE_STORE,
  SET_NAVIGATION_READY,
  SET_REALM_SYNCED,
  SET_EPG_LOADED,
} from '@/modules/app/constants';

export const resetStore = (storageClearingList?) =>
  createAction<any>(RESET_STORE)({ storageClearingList });

export const rehydrateStore = persistStore => createAction<any>(REHYDRATE_STORE)({ persistStore });

export const setNavigationReady = (isLoading: boolean) =>
  createAction<boolean>(SET_NAVIGATION_READY)(isLoading);

export const setRealmSynced = (isSynced: boolean) =>
  createAction<boolean>(SET_REALM_SYNCED)(isSynced);

export const setEPGLoaded = (isEPGLoaded: boolean) =>
  createAction<boolean>(SET_EPG_LOADED)(isEPGLoaded);
