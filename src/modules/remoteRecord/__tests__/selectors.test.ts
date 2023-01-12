import { decodersResponse } from '@/modules/remoteRecord/__tests__/testData';
import {
  decoders,
  decodersIsLoading,
  decodersError,
  recordIsLoading,
  recordError,
} from '../selectors';

describe('fetch decoders', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      remoteRecord: {
        decoders: {
          data: [],
          isLoading: true,
          error: '',
        },
      },
    };
    const decodersData = decoders(defaultState);

    // Then
    expect(decodersData).toEqual([]);

    expect(decodersIsLoading(defaultState)).toEqual(true);

    expect(decodersError(defaultState)).toEqual('');
  });

  test('decoders loaded', () => {
    // When default state
    const defaultState = {
      remoteRecord: {
        decoders: {
          data: decodersResponse.user.decoders,
          isLoading: false,
          error: null,
        },
      },
    };
    const decodersState = decoders(defaultState);

    // Then
    expect(decodersState).toEqual(decodersResponse.user.decoders);

    expect(decodersIsLoading(defaultState)).toEqual(false);

    expect(decodersError(defaultState)).toEqual(null);
  });
});

describe('request remote record', () => {
  test('default state ', () => {
    // When default state
    const defaultState = {
      remoteRecord: {
        record: {
          data: null,
          isLoading: true,
          error: 'Error',
        },
      },
    };

    // Then

    expect(recordIsLoading(defaultState)).toEqual(true);

    expect(recordError(defaultState)).toEqual('Error');
  });
});
