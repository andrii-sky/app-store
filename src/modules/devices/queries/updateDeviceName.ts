const UPDATE_DEVICE_NAME_QUERY = `
    mutation UpdateDeviceName($deviceId: ID!, $deviceName: String!) {
      updateDeviceName(deviceId: $deviceId, deviceName: $deviceName) {
        deviceId
        model
        family
        name
      }
    }
`;

export default UPDATE_DEVICE_NAME_QUERY;
