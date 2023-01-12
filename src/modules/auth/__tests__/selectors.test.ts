/* eslint-disable @typescript-eslint/camelcase */
import { createApiInitialState } from '@/utils/api';
import { accessToken, user, error, getDecodeConfig, config, isAuthLoading } from '../selectors';
import configSuccess from './testData';

test('select access token', () => {
  // Given
  const state = {
    auth: {
      accessToken: 'aef123',
    },
  };

  // when
  const token = accessToken(state);

  // Then
  expect(token).toEqual('aef123');
});

test('select user', () => {
  // Given
  const loggedInUser = {
    // Below keyname modified from org name https://login-dev.skyone.co.nz/profiles due to variable naming syntax
    https_login_dev_skyone_co_nz_profiles: [
      {
        id: '449748f0-6c70-4f91-a92f-4c946daed944',
        name: 'default',
      },
    ],
    nickname: 'dhanabal thangavelu',
    name: 'dhanabal.thangavelu@sky.co.nz',
    picture:
      'https://s.gravatar.com/avatar/eafbff14de33167ef7a6a51b8ea7d112?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdh.png',
    updated_at: '2019-12-16T01:48:07.149Z',
    email: 'dhanabal.thangavelu@sky.co.nz',
    email_verified: false,
    sub: 'auth0|5de448c816dbcc0f2fa16a50',
  };

  const state = {
    auth: {
      user: loggedInUser,
    },
  };

  // When
  const currentUser = user(state);

  // Then
  expect(currentUser).toEqual(loggedInUser);
});

test('select auth error', () => {
  // Given
  const testError = new Error('Test Auth Error');

  const state = {
    auth: {
      error: testError,
    },
  };

  // When
  const authError = error(state);

  // Then
  expect(authError).toEqual(testError);
});

test('select Decode config', () => {
  // Given
  const state = {
    auth: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  };

  expect(getDecodeConfig(state)('name')).toEqual('John Doe');
});

test('select Decode config without token', () => {
  // Given
  const state = {
    auth: {
      accessToken: '',
    },
  };

  expect(getDecodeConfig(state)('name')).toEqual(undefined);
});

test('get config', () => {
  // Given
  const state = {
    auth: {
      config: createApiInitialState(configSuccess),
    },
  };

  // when
  const configs = config(state);

  // Then
  expect(configs).toEqual(configSuccess.experience.config.auth);
});

test('get serial number', () => {
  const defaultState = {
    auth: {
      isLoading: true,
    },
  };

  const authLoadingState = isAuthLoading(defaultState);
  expect(authLoadingState).toEqual(true);
});
