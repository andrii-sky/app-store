import {
  getAlbum,
  authError,
  playerState,
  profile,
  getIsAlbumSaved,
  accessToken,
} from '../selectors';

test('select spotify access token', () => {
  // Given
  const spotifyAccessToken =
    'BQBsAEd0WVnmUOq36AgqxGmZHTl18Au1KyigVFqv1D_8X4Oqc0RwdR_SOQ80gT4kS72AvwT8KodhmH15nryjqnhhrpHN8Q83nqpY4NBg2_bO3agFW_16NnnKmY5kjClZb0nLA_sCeqqAZXz_H0oqzloqwsV7fUk7Lp4t0gL3gOXU6DgwfYHO3Z9l4c5a72QnYjVQGWR7xz2fG6B';
  const state = {
    spotify: {
      accessToken: spotifyAccessToken,
    },
  };

  // When
  const token = accessToken(state);

  // Then
  expect(token).toEqual(spotifyAccessToken);
});

test('select spotify error', () => {
  // Given
  const state = {
    spotify: {
      authError: 'Failed to login to Spotify',
    },
  };

  // When
  const error = authError(state);

  // Then
  expect(error).toEqual('Failed to login to Spotify');
});

test('select spotify profile', () => {
  // Given
  const state = {
    spotify: {
      profile: {
        data: {
          id: '12345',
        },
      },
    },
  };

  // When
  const spotifyProfile = profile(state);

  // Then
  expect(spotifyProfile.id).toEqual('12345');
});

test('select spotify album', () => {
  // Given
  const state = {
    spotify: {
      albumsById: {
        data: {
          '12345': {
            id: '12345',
            name: 'Aquaman soundtrack',
          },
        },
      },
    },
  };

  // When
  const albumResult = getAlbum(state)('12345');

  // Then
  expect(albumResult.id).toEqual('12345');
  expect(albumResult.name).toEqual('Aquaman soundtrack');
});

test('select spotify player state', () => {
  // Given
  const state = {
    spotify: {
      playerState: {
        data: {
          player: {
            isPlaying: true,
          },
        },
      },
    },
  };

  // When
  const playerStateResult = playerState(state);

  // Then
  expect(playerStateResult.isPlaying).toEqual(true);
});

test('select spotify is saved album', () => {
  // Given
  const state = {
    spotify: {
      albumsSavedById: {
        data: { '12345': false },
      },
    },
  };

  // When
  const savedAlbumResult = getIsAlbumSaved(state)('12345');

  // Then
  expect(savedAlbumResult).toEqual(false);
});
