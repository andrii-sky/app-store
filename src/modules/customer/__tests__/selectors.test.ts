import { getCustomerAccountResponse } from '@/modules/customer/__tests__/testData';
import { SkyCustomerAccountStatus } from '@/types/graph-ql';
import {
  getCustomerProfiles,
  selectedProfileId,
  selectedProfile,
  accountError,
  accountIsLoading,
  getTvodPurchasesByContentId,
  isPurchasingAvailable,
} from '../selectors';

const defaultState = {
  customer: {
    account: {
      data: {
        profiles: [],
      },
      isLoading: true,
      error: null,
    },
    selectedProfileId: {},
  },
};

describe('customer profile management', () => {
  test('default state ', () => {
    // When default state

    const getCustomerProfilesState = getCustomerProfiles(defaultState);

    // Then
    expect(getCustomerProfilesState).toEqual([]);
  });

  test('get customer profiles success', () => {
    const updatedState = {
      customer: {
        account: {
          data: {
            profiles: getCustomerAccountResponse.customer.profiles,
          },
          isLoading: false,
          error: null,
        },
        selectedProfileId: {},
      },
    };

    const customerProfilesState = getCustomerProfiles(updatedState);

    // Then
    expect(customerProfilesState).toEqual(getCustomerAccountResponse.customer.profiles);
    expect(accountIsLoading(updatedState)).toEqual(false);

    expect(accountError(updatedState)).toEqual(null);
  });

  test('get customer profile by id success', () => {
    const updatedState = {
      ...defaultState,
      customer: {
        ...defaultState.customer,
        selectedProfileId: 'ABC1',
      },
    };

    const customerProfilesState = selectedProfileId(updatedState);

    // Then
    expect(customerProfilesState).toEqual('ABC1');
  });

  test('selected customer profile', () => {
    const updatedState = {
      customer: {
        account: {
          data: {
            profiles: getCustomerAccountResponse.customer.profiles,
          },
          isLoading: false,
          error: null,
        },
        selectedProfileId: 'M744ZICT2OGE6',
      },
    };

    const customerProfilesState = selectedProfile(updatedState);

    // Then
    expect(customerProfilesState).toEqual(getCustomerAccountResponse.customer.profiles[1]);
  });

  test('get tvod purchase by content id', () => {
    const updatedState = {
      customer: {
        account: {
          data: {
            tvodPurchases: getCustomerAccountResponse.customer.tvodPurchases,
          },
          isLoading: false,
          error: null,
        },
      },
    };

    const customerPurchaseState = getTvodPurchasesByContentId(updatedState)(
      'movieId',
      'moms Iphone',
    );
    // Then
    expect(customerPurchaseState).toEqual(getCustomerAccountResponse.customer.tvodPurchases[0]);
  });

  test('isPurchasingAvailable - false', () => {
    const updatedState = {
      customer: {
        account: {
          data: {
            tier: {
              ...getCustomerAccountResponse.customer.tier,
              status: SkyCustomerAccountStatus.Suspended,
            },
          },
          isLoading: false,
          error: null,
        },
      },
    };

    const customerPurchaseState = isPurchasingAvailable(updatedState);
    // Then
    expect(customerPurchaseState).toEqual(false);
  });

  test('isPurchasingAvailable - true', () => {
    const updatedState = {
      customer: {
        account: {
          data: {
            tier: getCustomerAccountResponse.customer.tier,
          },
          isLoading: false,
          error: null,
        },
      },
    };

    const customerPurchaseState = isPurchasingAvailable(updatedState);
    // Then
    expect(customerPurchaseState).toEqual(true);
  });
});
