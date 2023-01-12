import 'reflect-metadata';
import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { forEachObjIndexed, isEmpty, isNil, omit } from 'ramda';
import { Reducer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { REHYDRATE_STORE, RESET_STORE } from '@/modules/app/constants';
import { configKeys, setConfig } from './config';
import { setLogging } from './logging';
import { setAccessTokenProviderFunction } from './config/tokenProvider';

import apiMiddleware from './middleware/api';
import playbackMiddleware from './middleware/playback';

import reducers from './reducer';
import actions from './actions';
import selectors from './selectors';
import hooks from './hooks';

import * as gqlTypes from './types/graph-ql';
import * as enums from './types/enums';
import models from './types/models';
import ModuleName from './ModuleName';
import utils from './utils';

let middleware = [
  ...getDefaultMiddleware({
    // Turn this off to suspend the warning.
    // Because currently we use Classes in the types/models folder,
    // to have the `get id()` helper prop, or Date type conversion.
    // TODO: Enable after backend returned all necessary props and changed all the classes to interfaces
    // https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
    serializableCheck: false,
    immutableCheck: false,
  }),
  apiMiddleware,
  playbackMiddleware,
];

// TODO: the returned TYPE did not exclude the props, it still has all modules.
// so the TS compiler can not give compile warnings if the code is referring an excluded module.
const excludeModules = <T>(moduleNames: ModuleName[], data: T): T => {
  // Ramda type error, related to the todo above
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return omit(moduleNames, data);
};

const init = (config?, sentry?, excludedModules: ModuleName[] = []) => {
  setConfig(config);
  setLogging(sentry);

  const filteredReducers = excludeModules<typeof reducers>(excludedModules, reducers);
  const filteredActions = excludeModules<typeof actions>(excludedModules, actions);
  const filteredSelectors = excludeModules<typeof selectors>(excludedModules, selectors);
  let combinedReducers: Reducer = combineReducers(filteredReducers);

  middleware = middleware.concat(config.middleware || []);

  const rootReducer = (state: ReturnType<any>, action: any) => {
    if (action.type === RESET_STORE) {
      const storageClearingList =
        action?.payload?.storageClearingList || config?.storageClearingList;

      if (!isNil(storageClearingList) && !isEmpty(storageClearingList)) {
        return combinedReducers(omit(storageClearingList, state), { type: undefined });
      }
    }

    if (action.type === REHYDRATE_STORE) {
      const storeToPersist = action?.payload?.persistStore;

      if (!isNil(storeToPersist) && !isEmpty(storeToPersist)) {
        const newState = state;
        forEachObjIndexed((value: any, key: any) => {
          if (newState[key]) {
            newState[key] = value;
          }
        }, storeToPersist);

        return combinedReducers(newState, { type: undefined });
      }
    }

    return combinedReducers(state, action);
  };

  if (config?.persistenceConfig) {
    const { persistenceConfig } = config;
    combinedReducers = persistReducer(persistenceConfig, combinedReducers);
  }

  const createStore = (preloadedState?) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware,
      devTools: config?.devTools,
      enhancers: config?.enhancers || [],
    });
  };

  const createPersistor = store => {
    return persistStore(store);
  };

  return {
    createStore,
    createPersistor,
    actions: filteredActions,
    selectors: filteredSelectors,
    hooks,
    enums,
    models,
    gqlTypes,
    utils,
  };
};

export { configKeys, ModuleName, init, selectors, setAccessTokenProviderFunction };
