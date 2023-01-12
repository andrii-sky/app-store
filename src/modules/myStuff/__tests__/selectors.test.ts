import { myListResponse } from '@/modules/myStuff/__tests__/testData';
import { VideoQualityType } from '@/types/enums/VideoQualityType';
import { myList, myListError, myListIsLoading, deviceVideoQuality } from '../selectors';

describe('my list', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      myStuff: {
        myList: {
          data: [],
          isLoading: true,
          error: '',
        },
      },
    };
    const myListEmpty = myList(defaultState);

    // Then
    expect(myListEmpty).toEqual([]);

    expect(myListIsLoading(defaultState)).toEqual(true);

    expect(myListError(defaultState)).toEqual('');
  });

  test('my list loaded', () => {
    // When default state
    const defaultState = {
      myStuff: {
        myList: {
          data: myListResponse.myList,
          isLoading: false,
          error: null,
        },
      },
    };
    const devicesState = myList(defaultState);

    // Then
    expect(devicesState).toEqual(myListResponse.myList);

    expect(myListIsLoading(defaultState)).toEqual(false);

    expect(myListError(defaultState)).toEqual(null);
  });
});

describe('set device video quality', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      myStuff: {
        deviceVideoQuality: {
          data: {},
          isLoading: true,
          error: '',
        },
      },
      auth: {
        user: {
          sub: 'auth0|5de448c816dbcc0f2fa16a50',
        },
      },
    };

    // Then
    expect(deviceVideoQuality(defaultState)).toEqual(VideoQualityType.AUTOMATIC);
  });

  test('state after set', () => {
    // When default state
    const defaultState = {
      myStuff: {
        deviceVideoQuality: {
          data: {
            'auth0|5de448c816dbcc0f2fa16a50': VideoQualityType.SAVE_MOBILE_DATA,
          },
          isLoading: true,
          error: '',
        },
      },
      auth: {
        user: {
          sub: 'auth0|5de448c816dbcc0f2fa16a50',
        },
      },
    };

    // Then
    expect(deviceVideoQuality(defaultState)).toEqual(VideoQualityType.SAVE_MOBILE_DATA);
    expect(deviceVideoQuality(defaultState)).not.toEqual(VideoQualityType.AUTOMATIC);
  });
});
