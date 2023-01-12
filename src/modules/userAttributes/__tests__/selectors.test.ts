import { attributes } from '../selectors';

describe('Attributes Selectors', () => {
  test('select attributes', () => {
    // Given
    const userAttrbs = [
      {
        name: 'newSkyGoPlatform',
        value: 'optIn',
      },
      {
        name: 'accountId',
        value: 'auth0|63444fdf-a1cd-4d2e-983e-ae61a6a9c8feTEST',
      },
    ];

    const state = {
      userAttributes: {
        userAttributes: {
          data: userAttrbs,
        },
      },
    };

    // When
    const userAttributes = attributes(state);

    // Then
    expect(userAttributes).toEqual(userAttrbs);
  });
});
