import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { decodersResponse } from '@/modules/remoteRecord/__tests__/testData';
import { createAction } from '@reduxjs/toolkit';
import { FETCH_DECODERS, RECORD, RESET_REMOTE_RECORD } from '../constants';
import reducer from '../reducer';

const contentState = {
  decoders: createApiInitialState([]),
  record: createApiInitialState(null),
};

describe('fetch decoders', () => {
  test('fetch decoders', () => {
    const fetchDevicesDecoders = createSuccessAPIAction(FETCH_DECODERS, decodersResponse);

    const expectedDecodersState = createApiSuccessState(decodersResponse.user.decoders);

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchDevicesDecoders)).toEqual({
      ...contentState,
      decoders: expectedDecodersState,
    });
  });
});

describe('request record', () => {
  test('request record ', () => {
    const requestRecordAction = createSuccessAPIAction(RECORD, 'ok');

    const expectedRecordState = createApiSuccessState('ok');

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, requestRecordAction)).toEqual({
      ...contentState,
      record: expectedRecordState,
    });
  });
});

describe('reset record', () => {
  test('reeset record ', () => {
    const initialState = {
      decoders: createApiInitialState([]),
      record: {
        data: null,
        isLoading: false,
        error: { name: 'ResponseError', message: 'Response does not have data', stack: 'APIError' },
      },
    };
    const newState = { record: { data: null, error: null, isLoading: false } };
    const action = createAction<any>(RESET_REMOTE_RECORD)(newState);
    // when and Then
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ...newState,
    });
  });
});
