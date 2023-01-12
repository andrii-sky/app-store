const FETCH_CONFIG_QUERY = `
  query getConfig($appId: AppId!) {
    experience(appId: $appId) {
      config {
        auth {
          connectionId
        }
      }
    }
  }
`;

export default FETCH_CONFIG_QUERY;
