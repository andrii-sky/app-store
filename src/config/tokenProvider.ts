const TokenProvider: any = {
  getAccessToken: null,
};

export const setAccessTokenProviderFunction = (getAccessTokenFunction: () => string) => {
  TokenProvider.getAccessToken = getAccessTokenFunction;
};

export default TokenProvider;
