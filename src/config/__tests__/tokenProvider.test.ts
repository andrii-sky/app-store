import { setAccessTokenProviderFunction } from '../tokenProvider';
import TokenProvider from '../tokenProvider';

describe('Token Provider', () => {
  test('test if sets the token provider correctly', () => {
    const token = 'some test token';
    const getTokenFunction = () => token;

    setAccessTokenProviderFunction(getTokenFunction);

    expect(TokenProvider.getAccessToken()).toEqual(token);
  });
});
