import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { FETCH_USER_ATTRIBUTES } from '../constants';
import reducer from '../reducer';

const contentState = {
  userAttributes: createApiInitialState(null),
};

describe('Attributes reducer', () => {
  test('fetch attributes', () => {
    const attributesResult = {
      user: {
        attributes: [
          {
            name: 'newSkyGoPlatform',
            value: 'optIn',
          },
          {
            name: 'accountId',
            value: 'auth0|63444fdf-a1cd-4d2e-983e-ae61a6a9c8feTEST',
          },
        ],
      },
    };

    const fetchAction = createSuccessAPIAction(FETCH_USER_ATTRIBUTES, attributesResult);
    const expectedChannelsState = createApiSuccessState(attributesResult.user.attributes);

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchAction)).toEqual({
      ...contentState,
      userAttributes: expectedChannelsState,
    });
  });
});
