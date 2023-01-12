/* eslint-disable @typescript-eslint/camelcase */
import { globalMessage } from '../selectors';

test('select is internet reachable', () => {
  // Given
  const state = {
    messaging: {
      globalMessage: 'We all gonna die!',
    },
  };

  // when
  const message = globalMessage(state);

  // Then
  expect(message).toEqual(state.messaging.globalMessage);
});
