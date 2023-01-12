const DEACTIVATE_DEVICE_QUERY = `
  mutation DeactivateDevice($deviceId: ID!) {
  deactivateDevice(deviceId: $deviceId) {
        __typename
        ... on GenericDeviceResponse {
           message
        }
        ... on DeviceDeactivationLimitExceeded {
         maxDeviceLimit
        }
  }
}`;

export default DEACTIVATE_DEVICE_QUERY;
