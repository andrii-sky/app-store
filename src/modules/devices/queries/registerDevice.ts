const REGISTER_DEVICE_QUERY = `
    mutation RegisterDevice($registerDevice: RegisterDeviceInput) {
      registerDevice(registerDevice: $registerDevice) {
      __typename
       ... on Device {
        deviceId
        lastUsed
        registeredOn
        model
        name
      }
      ... on DeviceRegistrationLimitExceeded {
       maxDeviceLimit
      }
    }
  }
`;

export default REGISTER_DEVICE_QUERY;
