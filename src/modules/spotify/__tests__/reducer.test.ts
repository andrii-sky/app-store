import { createAction } from '@reduxjs/toolkit';
import reducer from '../reducer';
import {
  FETCH_BRAND_ALBUMS,
  FETCH_PLAYER_STATE,
  FETCH_PROFILE,
  FETCH_IS_SAVED_ALBUM,
  SET_ACCESS_TOKEN,
  SPOTIFY_UNAUTHORIZED_ERROR,
} from '../constants';
import { createApiSuccessState, createSuccessAPIAction } from '../../../testUtils/api';
import { createApiInitialState } from '../../../utils/api';

const initState = {
  albumsById: createApiInitialState({}),
  playerState: createApiInitialState({ player: null, lastSeekTime: 0 }),
  albumsSavedById: createApiInitialState({}),
  profile: createApiInitialState({}),
  accessToken: null,
  authError: null,
};

test('Set spotify access token', () => {
  const accessToken =
    'BQBsAEd0WVnmUOq36AgqxGmZHTl18Au1KyigVFqv1D_8X4Oqc0RwdR_SOQ80gT4kS72AvwT8KodhmH15nryjqnhhrpHN8Q83nqpY4NBg2_bO3agFW_16NnnKmY5kjClZb0nLA_sCeqqAZXz_H0oqzloqwsV7fUk7Lp4t0gL3gOXU6DgwfYHO3Z9l4c5a72QnYjVQGWR7xz2fG6B-GlYTBjU8fdv1QwFS2S0eozfiLa325K3ytM9SJ7ioRivaHNzmjmjP8V6dnDAFGmsa4bs';

  const action = createAction<string>(SET_ACCESS_TOKEN)(accessToken);
  // when and Then
  expect(reducer(initState, action)).toEqual({
    ...initState,
    accessToken,
  });
});

test('set spotify unauthorized error', () => {
  // Given
  const error = 'We all die!';

  const setSpotifyUnauthorizedErrorAction = {
    type: SPOTIFY_UNAUTHORIZED_ERROR,
    payload: error,
  };

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, setSpotifyUnauthorizedErrorAction)).toEqual({
    ...initState,
    authError: error,
  });
});

test('fetch spotify album', () => {
  // Given
  const payload = {
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

  const data = {
    '4YU2XJH8yVtQh5oPylvoDw': {
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
  };

  let fetchSpotifyAlbumAction = createSuccessAPIAction(FETCH_BRAND_ALBUMS, payload, {
    isShow: true,
  });
  const expectedAlbumState = createApiSuccessState(data);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchSpotifyAlbumAction)).toEqual({
    ...initState,
    albumsById: expectedAlbumState,
  });

  // When - the backend's response returns empty show
  fetchSpotifyAlbumAction = createSuccessAPIAction(
    FETCH_BRAND_ALBUMS,
    { show: null },
    {
      isShow: true,
    },
  );

  expect(reducer(initState, fetchSpotifyAlbumAction)).toEqual(initState);
});

test('fetch spotify player state', () => {
  // Given
  const mockPlayer = {
    isPlaying: true,
    currentTrack: 'lannisters always pay their debts',
    volume: '40%',
    // eslint-disable-next-line @typescript-eslint/camelcase
    progress_ms: 1000,
  };

  const fetchSpotifyPlayerStateAction = createSuccessAPIAction(FETCH_PLAYER_STATE, mockPlayer);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchSpotifyPlayerStateAction)).toEqual({
    ...initState,
  });
});

test('fetch spotify player state should change', () => {
  // Given
  const mockPlayer = {
    isPlaying: true,
    currentTrack: 'lannisters always pay their debts',
    volume: '40%',
    // eslint-disable-next-line @typescript-eslint/camelcase
    progress_ms: 10000,
  };

  const data = {
    player: mockPlayer,
    lastSeekTime: 0,
  };

  const fetchSpotifyPlayerStateAction = createSuccessAPIAction(FETCH_PLAYER_STATE, mockPlayer);
  const expectedplayerState = createApiSuccessState(data);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchSpotifyPlayerStateAction)).toEqual({
    ...initState,
    playerState: expectedplayerState,
  });
});

test('fetch spotify is saved album', () => {
  // Given
  const data = { '12345': true };
  const payload = [true];

  const fetchIsSavedAlbumAction = createSuccessAPIAction(FETCH_IS_SAVED_ALBUM, payload, {
    albumId: '12345',
  });

  const expectedIsSavedAlbumState = createApiSuccessState(data);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchIsSavedAlbumAction)).toEqual({
    ...initState,
    albumsSavedById: expectedIsSavedAlbumState,
  });
});

test('fetch spotify profile', () => {
  // Given
  const data = {
    id: 'Crazy Frog',
    product: 'premium',
    type: 'user',
    uri: 'spotify:user:wizzler',
  };
  const fetchProfileAction = createSuccessAPIAction(FETCH_PROFILE, data);
  const expectedProfileState = createApiSuccessState(data);

  // When - invoke reducer, Then - verify state
  expect(reducer(initState, fetchProfileAction)).toEqual({
    ...initState,
    profile: expectedProfileState,
  });
});
