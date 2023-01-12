import mockAxios from 'jest-mock-axios';
import { MockStore } from 'redux-mock-store';

import graphQLClient from '@/middleware/api/clients/graphQLClient';
import { init } from '../../..';
import {
  FETCH_PLAYER_STATE,
  FETCH_PROFILE,
  FETCH_IS_SAVED_ALBUM,
  PLAYBACK_PAUSE,
  PLAYBACK_PLAY,
  SAVE_ALBUM,
  TRANSFER_PLAYBACK,
  SET_ACCESS_TOKEN,
  REMOVE_ALBUM,
  FETCH_BRAND_ALBUMS,
} from '../constants';
import {
  fetchBrandAlbums,
  fetchPlayerState,
  fetchProfile,
  pause,
  play,
  saveAlbum,
  fetchIsSavedAlbum,
  transferPlayback,
  setAccessToken,
  removeAlbum,
} from '../actions';
import { createSuccessAPIActions } from '../../../testUtils/api';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

const mockShowAlbumsResponse = {
  show: {
    seasons: [
      {
        soundtrack: {
          id: '4YU2XJH8yVtQh5oPylvoDw',
          tracks: [
            {
              id: '4vVRdmiVXWeT0UxkF5Nenj',
              name: 'Cold Little Heart',
            },
            {
              id: '5n8kTIxonZzmM9jPrvXV5A',
              name: 'Victim Of Love',
            },
            {
              id: '0HLxYZsciDiAbuIZhGmQvO',
              name: 'Bloody Mother Fucking Asshole',
            },
          ],
        },
      },
    ],
  },
};

const mockMovieAlbumsResponse = {
  movie: {
    soundtrack: {
      id: '4YU2XJH8yVtQh5oPylvoDw',
      tracks: [
        {
          id: '4vVRdmiVXWeT0UxkF5Nenj',
          name: 'Cold Little Heart',
        },
        {
          id: '5n8kTIxonZzmM9jPrvXV5A',
          name: 'Victim Of Love',
        },
        {
          id: '0HLxYZsciDiAbuIZhGmQvO',
          name: 'Bloody Mother Fucking Asshole',
        },
      ],
    },
  },
};

describe('spotify actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('fetch show albums data from api with success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockShowAlbumsResponse);

    const expectedActions = [
      ...createSuccessAPIActions(FETCH_BRAND_ALBUMS, mockShowAlbumsResponse, { isShow: true }),
    ];

    await store.dispatch(fetchBrandAlbums('brandId', true) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch movie albums data from api with success', async () => {
    // setup
    (graphQLClient as jest.Mock).mockResolvedValue(mockMovieAlbumsResponse);

    const expectedActions = [
      ...createSuccessAPIActions(FETCH_BRAND_ALBUMS, mockMovieAlbumsResponse, { isShow: false }),
    ];

    await store.dispatch(fetchBrandAlbums('brandId', false) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch player state', async () => {
    // Given
    const data = {
      isPlaying: true,
    };

    // setup
    mockAxios.mockResolvedValue({ data: { data } });

    // work
    const expectedActions = createSuccessAPIActions(FETCH_PLAYER_STATE, data);

    // When
    await store.dispatch(fetchPlayerState());

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('transfer playback', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: {} });

    // work
    const expectedActions = createSuccessAPIActions(TRANSFER_PLAYBACK, { data: undefined });

    // When
    await store.dispatch(transferPlayback('device'));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('play', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: {} });

    // work
    const expectedActions = createSuccessAPIActions(PLAYBACK_PLAY, { data: undefined });

    // When
    await store.dispatch(play('spotify:album:3AOeatEAPjy1CKtdkaXaDq'));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('pause', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: {} });

    // work
    const expectedActions = createSuccessAPIActions(PLAYBACK_PAUSE, { data: undefined });

    // When
    await store.dispatch(pause());

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('save album', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: {} });

    // work
    const expectedActions = createSuccessAPIActions(SAVE_ALBUM, { data: undefined });

    // When
    await store.dispatch(saveAlbum('albumId'));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('remove album', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: {} });

    // work
    const expectedActions = createSuccessAPIActions(REMOVE_ALBUM, { data: undefined });

    // When
    await store.dispatch(removeAlbum('albumId'));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('is saved album', async () => {
    // setup
    mockAxios.mockResolvedValue({ data: {} });

    // work
    const expectedActions = createSuccessAPIActions(
      FETCH_IS_SAVED_ALBUM,
      { data: undefined },
      { albumId: 'albumId' },
    );

    // When
    await store.dispatch(fetchIsSavedAlbum('albumId'));

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetch spotify profile', async () => {
    // Given
    const data = {
      id: 'Crazy Frog',
      product: 'premium',
      type: 'user',
      uri: 'spotify:user:wizzler',
    };

    // setup
    mockAxios.mockResolvedValue({ data: { data } });

    // work
    const expectedActions = createSuccessAPIActions(FETCH_PROFILE, data);

    // When
    await store.dispatch(fetchProfile());

    // Then
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set spotify access token', () => {
    const accessToken =
      'BQBsAEd0WVnmUOq36AgqxGmZHTl18Au1KyigVFqv1D_8X4Oqc0RwdR_SOQ80gT4kS72AvwT8KodhmH15nryjqnhhrpHN8Q83nqpY4NBg2_bO3agFW_16NnnKmY5kjClZb0nLA_sCeqqAZXz_H0oqzloqwsV7fUk7Lp4t0gL3gOXU6DgwfYHO3Z9l4c5a72QnYjVQGWR7xz2fG6B-GlYTBjU8fdv1QwFS2S0eozfiLa325K3ytM9SJ7ioRivaHNzmjmjP8V6dnDAFGmsa4bs';
    const expectedActions = [
      {
        type: SET_ACCESS_TOKEN,
        payload: accessToken,
      },
    ];

    store.dispatch(setAccessToken(accessToken));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
