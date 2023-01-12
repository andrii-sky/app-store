export const limitNotExceededResponse = {
  registerDevice: {
    __typename: 'Device',
    deviceId: '1234567890123456789',
    lastUsed: '2020-09-11T04:38:11.368384Z',
    registeredOn: '2020-09-11T04:38:11.368384Z',
    model: 'Sd',
    name: 'nick-name 3',
  },
};

export const limitExceededResponse = {
  registerDevice: {
    __typename: 'DeviceRegistrationLimitExceeded',
    maxDeviceLimit: 17,
  },
};

export const devicesResponse = {
  user: {
    devices: [
      {
        deviceId: '1234567890123456789',
        model: 'Sd',
        lastUsed: '2020-09-11T04:38:11.368384Z',
        name: 'nick-name 3',
        active: true,
        family: 'TABLET',
      },
      {
        deviceId: '12323',
        model: 'KS',
        lastUsed: '2020-09-11T04:37:45.640297Z',
        name: 'My Phone 4',
        active: true,
        family: 'HANDSET',
      },
    ],
  },
};

export const updateDeviceNameResponse = {
  updateDeviceName: {
    deviceId: 'DC3D3EFA-D919-4929-AC52-B74635906E11',
    model: 'Simulator',
    family: 'HANDSET',
    name: 'Serge Simulator',
  },
};

export const deactivateDeviceSuccessResponse = {
  deactivateDevice: null,
};
