import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { FETCH_USER_SUBSCRIPTIONS } from '../constants';
import reducer from '../reducer';

const contentState = {
  subscriptions: createApiInitialState([]),
};

describe('Subscription reducer', () => {
  test('fetch subscriptions', () => {
    const subscriptionsResult = {
      user: {
        subscriptions: [
          {
            id: 'PrimeLive',
            title: 'PrimeLive',
          },
        ],
      },
    };

    const fetchAction = createSuccessAPIAction(FETCH_USER_SUBSCRIPTIONS, subscriptionsResult);
    const expectedChannelsState = createApiSuccessState(subscriptionsResult.user.subscriptions);

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchAction)).toEqual({
      ...contentState,
      subscriptions: expectedChannelsState,
    });
  });
});
