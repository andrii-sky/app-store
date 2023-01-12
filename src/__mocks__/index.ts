import configureMockStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { configKeys, setConfig } from '../config';

import apiMiddleware from '../middleware/api';
import playbackMiddleware from '../middleware/playback';

import actions from '../actions';
import selectors from '../selectors';

const middlewares = [thunk, apiMiddleware, playbackMiddleware];

const defaultConfig = {
  EXP_API_URL: 'http://exp-api-url',
  SPOTIFY_API_URL: 'http://spotify.com',
};

const defaultState = {
  auth: {
    accessToken: '',
  },
  customer: {
    selectedProfileId: 'testActiveProfile',
  },
  spotify: {
    accessToken: {
      data: '',
    },
  },
};

const init = (config?) => {
  setConfig({
    ...defaultConfig,
    ...config,
  });

  const createStore = (preloadedState?): MockStore => {
    return configureMockStore(middlewares)({
      ...defaultState,
      ...preloadedState,
    });
  };

  return {
    createStore,
    actions,
    selectors,
  };
};

export { configKeys, init };
