import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createAction } from '@reduxjs/toolkit';

import {
  FETCH_CONFIG,
  SET_ACCESS_TOKEN,
  SET_AUTH_LOADING,
  SET_USER,
  UNAUTHORIZED_ERROR,
} from '../constants';
import reducer from '../reducer';
import configSuccess from './testData';

const authInitialState = {
  accessToken: '',
  user: null,
  error: null,
  config: {
    data: null,
    isLoading: false,
  },
  isLoading: null,
};

test('Set access token', () => {
  // Given
  const token = 'THIS_IS_A_TEST_TOKEN';
  const assetAction = createAction<string>(SET_ACCESS_TOKEN)(token);
  // when and Then
  expect(reducer(authInitialState, assetAction)).toEqual({
    ...authInitialState,
    accessToken: token,
  });
});

test('Set user', () => {
  const user = {
    'https://login-dev.skyone.co.nz/profiles': [
      {
        id: 'id1',
        name: 'default',
      },
    ],
    'https://login-dev.skyone.co.nz/connections': [
      {
        userId: 'id2',
        connection: 'Username-Password-Authentication',
        provider: 'auth0',
      },
    ],
    nickname: 'test',
    name: 'test user',
    picture: 'https://s.gravatar.com/avatar',
    updated_at: '2020-02-25T01:47:38.659Z',
    email: 'email@sky.co.nz',
    email_verified: true,
    sub: 'auth0|',
  };
  // Given
  const assetAction = createAction<any>(SET_USER)(user);
  // when and Then
  expect(reducer(authInitialState, assetAction)).toEqual({
    ...authInitialState,
    user,
  });
});

test('Set unauthorized error', () => {
  // Given
  const error = new Error('Unauthorized');
  const assetAction = createAction<any>(UNAUTHORIZED_ERROR)(error);
  // when and Then
  expect(reducer(authInitialState, assetAction)).toEqual({
    ...authInitialState,
    error,
  });
});

test('get config successful', () => {
  // Given
  const configAction = createSuccessAPIAction(FETCH_CONFIG, configSuccess);
  const expectedConfigState = createApiSuccessState(configSuccess);

  // When - invoke reducer, Then - verify state
  expect(reducer(authInitialState, configAction)).toEqual({
    ...authInitialState,
    config: expectedConfigState,
  });
});

test('set auth loading', () => {
  const setAuthLoading = createAction<any>(SET_AUTH_LOADING)(true);

  expect(reducer(authInitialState, setAuthLoading)).toEqual({
    ...authInitialState,
    isLoading: true,
  });
});
