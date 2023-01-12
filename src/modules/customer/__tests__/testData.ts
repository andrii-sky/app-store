import { SkyCustomerAccountStatus } from '@/types/graph-ql';

export const getCustomerAccountResponse = {
  customer: {
    tier: {
      __typename: 'SkyCustomerAccountTier',
      status: SkyCustomerAccountStatus.Active,
    },
    profiles: [
      {
        customerProfileAvatar: { id: 'default', image: [Object] },
        id: 'KO7C5KTNXXHAA',
        isDefault: true,
        name: 'Sharan',
      },
      {
        customerProfileAvatar: { id: 'person-blue', image: [Object] },
        id: 'M744ZICT2OGE6',
        isDefault: false,
        name: 'profile-3',
      },
    ],
    tvodPurchases: [
      {
        purchasedAt: '2020-02-25T01:47:38.659Z',
        offer: {
          rentalPeriod: 'PT1D1H',
          content: {
            title: 'Meet the Fockers',
            id: 'movieId',
          },
        },
        deviceId: 'moms Iphone',
      },
      {
        purchasedAt: '2020-02-25T01:47:38.659Z',
        offer: {
          rentalPeriod: 'PT1D1H',
          content: {
            title: 'Batman',
            id: 'movieId2',
          },
        },
        deviceId: 'dads Iphone',
      },
    ],
  },
};

export const getCustomerProfileByIdResponse = {
  customer: {
    profile: {
      customerProfileAvatar: { id: 'default', image: [Object] },
      id: 'KO7C5KTNXXHAA',
      isDefault: true,
      name: 'Sharan',
    },
  },
};

export const createCustomerProfileByResponse = {
  createProfile: {
    customerProfileAvatar: { id: 'default', image: [Object] },
    id: 'KO7C5KTNXXHXX',
    isDefault: true,
    name: 'Sharan',
  },
};

export const updateCustomerProfileByResponse = {
  updateProfile: {
    customerProfileAvatar: { id: 'default', image: [Object] },
    id: 'KO7C5KTNXXHAA',
    isDefault: true,
    name: 'Random-Name',
  },
};

export const purchaseTvodByResponse = {
  purchasedAt: '2020-02-25T01:47:38.659Z',
  offer: {
    rentalPeriod: 'PT1D1H',
    content: {
      title: 'Avengers',
      id: 'avengersMovieId',
    },
  },
};

export const purchasePpvByResponse = {
  offer: {
    purchasedAt: '2020-02-25T01:47:38.659Z',
    purchases: [
      {
        offer: {},
      },
    ],
  },
};

export const deleteCustomerProfileByResponse = {
  deleteProfile: null,
};
