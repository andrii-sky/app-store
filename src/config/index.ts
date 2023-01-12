export const configKeys = {
  EXP_API_URL: 'EXP_API_URL',
  SPOTIFY_API_URL: 'SPOTIFY_API_URL',
  PRODUCT_ID: 'PRODUCT_ID',
};

const config = {
  [configKeys.EXP_API_URL]: '',
  [configKeys.SPOTIFY_API_URL]: '',
  [configKeys.PRODUCT_ID]: '',
};

export const setConfig = cfg => {
  Object.keys(configKeys).forEach(key => {
    config[key] = cfg[key];
  });
};
export const GRAPH_QL_PATH = '/exp/graph';

export default config;
