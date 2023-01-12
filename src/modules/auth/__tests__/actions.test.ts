import mockAxios from 'jest-mock-axios';
import { MockStore } from 'redux-mock-store';
import graphQLClient from '@/middleware/api/clients/graphQLClient';

import { AppId } from '@/types/graph-ql';
import { init } from '../../..';
import { createSuccessAPIActions, createFailureAPIActions } from '../../../testUtils/api';
import { APIError, UnauthorizedError } from '../../../errors';
import {
  setAccessToken,
  setUser,
  unauthorizedError,
  linkAccount,
  optOut,
  fetchConfig,
  setAuthLoading,
} from '../actions';
import {
  SET_ACCESS_TOKEN,
  SET_USER,
  UNAUTHORIZED_ERROR,
  LINK_ACCOUNT,
  OPT_OUT,
  FETCH_CONFIG,
  SET_AUTH_LOADING,
} from '../constants';
import configSuccess from './testData';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

const idToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJESkdOMEZFUmpSRVFUTTBNRE5HT0VWRFFUZENRamRHTWtaRlJrUkRPREV6TVRFNVFUSkZRUSJ9.eyJuaWNrbmFtZSI6InQuZGhhbmNpaSIsIm5hbWUiOiJ0LmRoYW5jaWlAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzA5NGNlNjQ0YThlMWQ1NWE2NWZlNjk4ZDMyNGM5ZTdhP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0wMS0wNlQyMTozNjozNy40OTNaIiwiZW1haWwiOiJ0LmRoYW5jaWlAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9za3lvbmUtZGV2LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJvYXV0aDJ8c3BvdGlmeXw4NWJibjF4cmE5aGd6eWZxMW5obGIwZ3hyIiwiYXVkIjoiNjRrNTYyR1ZKbXQxNmFvdTMwaWpUVlhnV2NMOTd4QmYiLCJpYXQiOjE1NzgzNDY1OTcsImV4cCI6MTU3ODM4MjU5Nywibm9uY2UiOiJsakhsZGZvYnVraDhLeUtGbXRnMWs3VDJyUm5QaExFYyJ9.g1uKdt9H-nGElwEs77dDX8FdrbBfvxZGGmkip7Hj9AJ13RXb2iky7jiqnoIi9hoBCx_RL_bCadeM9pbMYgPNCch61BeNduO1HtPKD6DBXjOJ2EvKqNMfbbTlzblEojHvHuQf1gNgHTiLRC3w5mfaKPbzQla2JH9CyakJfaGlsPenudWR_H-E-hcoh8XZNvWh-N_ezvfBv7bKY7Jot8Y8cVMcmmZ9QZuppcA_Uuoc5t8IQXwL7Z9YapuztVSpVcTSc_7ubbCuJNlQ6wWmE5G8tA6ClYLhVp0WQ_FquU-laVXOopOHHC2SLq3ElnaI5UnmxOjvRLtXor5ebecuA3IHKw';

describe('auth actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  test('set access token', async () => {
    const token = 'THIS_IS_A_TEST_TOKEN';
    const expectedActions = [
      {
        type: SET_ACCESS_TOKEN,
        payload: token,
      },
    ];

    store.dispatch(setAccessToken(token));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set user', async () => {
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
    const expectedActions = [
      {
        type: SET_USER,
        payload: user,
      },
    ];

    store.dispatch(setUser(user));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set unauthorized error', async () => {
    const err = new UnauthorizedError();
    const expectedActions = [
      {
        type: UNAUTHORIZED_ERROR,
        payload: err,
      },
    ];

    store.dispatch(unauthorizedError(err));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('link account api without accessToken should fail', async () => {
    // Given
    const error = {
      status: 401,
      message: 'Unauthorized',
    };
    mockAxios.mockRejectedValue(error);
    const expectedActions = createFailureAPIActions(
      LINK_ACCOUNT,
      new APIError(error.message, error.status),
    );

    // When
    await store.dispatch(linkAccount(idToken));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('link account api without idToken should fail', async () => {
    // Given
    const error = {
      status: 400,
      message: 'Access token and secondary user Idtoken are mandatory',
    };
    mockAxios.mockRejectedValue(error);
    const expectedActions = createFailureAPIActions(
      LINK_ACCOUNT,
      new APIError(error.message, error.status),
    );

    // When
    await store.dispatch(linkAccount(null));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('link account api success', async () => {
    // Given
    const data = {
      message: 'account linked successfully',
    };
    mockAxios.mockResolvedValue({ data: { data } });
    const expectedActions = createSuccessAPIActions(LINK_ACCOUNT, data);

    // When
    await store.dispatch(linkAccount(idToken));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('linking an already linked account should fail', async () => {
    // Given
    const error = {
      status: 409,
      message: 'account already linked',
    };
    mockAxios.mockRejectedValue(error);

    const expectedActions = createFailureAPIActions(
      LINK_ACCOUNT,
      new APIError(error.message, error.status),
    );

    // When
    await store.dispatch(linkAccount(idToken));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('opt-out of skygo', async () => {
    const expectedAction = createSuccessAPIActions(OPT_OUT, {});
    mockAxios.mockResolvedValue({});

    await store.dispatch(optOut('account123'));

    expect(store.getActions()).toEqual(expectedAction);
  });

  test('get config success', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLClient.mockResolvedValue(configSuccess);
    const expectedActions = createSuccessAPIActions(FETCH_CONFIG, configSuccess);

    await store.dispatch(fetchConfig(AppId.SkyBox));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set auth loading', async () => {
    const expectedActions = [
      {
        type: SET_AUTH_LOADING,
        payload: true,
      },
    ];

    store.dispatch(setAuthLoading(true));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
