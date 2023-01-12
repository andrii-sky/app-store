import config, { setConfig, configKeys } from '../index';

describe('Config', () => {
  test('should set to config', () => {
    const cfg = {
      [configKeys.SPOTIFY_API_URL]: 'http://spotify.com',
      [configKeys.EXP_API_URL]: 'http://exp-api-url',
    };

    setConfig(cfg);

    expect(config.SPOTIFY_API_URL).toBe(cfg[configKeys.SPOTIFY_API_URL]);
    expect(config.EXP_API_URL).toBe(cfg[configKeys.EXP_API_URL]);
  });
});
