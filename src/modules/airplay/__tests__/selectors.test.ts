/* eslint-disable @typescript-eslint/camelcase */
import { isAvailable, isConnected } from '../selectors';

test('select is airplay connected', () => {
  // Given
  const state = {
    airplay: {
      isConnected: true,
    },
  };

  // when
  const isAirplayConnected = isConnected(state);

  // Then
  expect(isAirplayConnected).toEqual(true);
});

test('select is airplay available', () => {
  // Given
  const state = {
    airplay: {
      isAvailable: true,
    },
  };

  // when
  const isAirplayAvailable = isAvailable(state);

  // Then
  expect(isAirplayAvailable).toEqual(true);
});
