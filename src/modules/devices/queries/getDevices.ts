const GET_DEVICES_QUERY = `
  query Devices {
    user {
      devices {
        deviceId
        model
        lastUsed
        registeredOn
        name
        active
        family
      }
    }
  }
`;

export default GET_DEVICES_QUERY;
