import { subscriptions } from '../selectors';

describe('Subscription Selectors', () => {
  test('select subscriptions', () => {
    // Given
    const subs = [
      {
        id: 'PrimeLive',
        title: 'PrimeLive',
      },
    ];

    const state = {
      subscription: {
        subscriptions: {
          data: subs,
        },
      },
    };

    // When
    const userSubscriptions = subscriptions(state);

    // Then
    expect(userSubscriptions).toEqual(subs);
  });
});
