import { createApiSuccessState, createSuccessAPIAction } from '@/testUtils/api';
import { createApiInitialState } from '@/utils/api';
import { myListResponse } from '@/modules/myStuff/__tests__/testData';
import { createAction } from '@reduxjs/toolkit';
import { VideoQualityType } from '@/types/enums/VideoQualityType';
import { FETCH_MY_LIST, SET_DEVICE_VIDEO_QUALITY } from '../constants';
import reducer from '../reducer';

const contentState = {
  myList: createApiInitialState([]),
  deviceVideoQuality: createApiInitialState({}),
};

describe('fetch my list', () => {
  test('fetch my list ', () => {
    const fetchMyListAction = createSuccessAPIAction(FETCH_MY_LIST, myListResponse);

    const expectedMyListState = createApiSuccessState(myListResponse.myList);

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, fetchMyListAction)).toEqual({
      ...contentState,
      myList: expectedMyListState,
    });
  });
});

describe('device video quality', () => {
  test('set device video quality', () => {
    const setVideoQualityAction = createAction<any>(SET_DEVICE_VIDEO_QUALITY)({
      accountId: '1234567890123456789',
      videoQuality: VideoQualityType.SAVE_MOBILE_DATA,
    });

    // When - invoke reducer, Then - verify state
    expect(reducer(contentState, setVideoQualityAction)).toEqual({
      ...contentState,
      deviceVideoQuality: createApiSuccessState({
        '1234567890123456789': VideoQualityType.SAVE_MOBILE_DATA,
      }),
    });
  });
});
