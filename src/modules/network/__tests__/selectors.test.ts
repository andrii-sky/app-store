/* eslint-disable @typescript-eslint/camelcase */
import { internetSource, isInternetConnected } from '../selectors';

test('select is internet reachable', () => {
  // Given
  const state = {
    network: {
      isInternetConnected: true,
    },
  };

  // when
  const isReachable = isInternetConnected(state);

  // Then
  expect(isReachable).toEqual(true);
});

test('select internet source', () => {
  // Given
  const state = {
    network: {
      internetSource: 'wifi',
    },
  };

  // when
  const source = internetSource(state);

  // Then
  expect(source).toEqual('wifi');
});
