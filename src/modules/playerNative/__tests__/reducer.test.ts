import { createAction } from '@reduxjs/toolkit';
import reducer from '../reducer';
import {
  SET_IS_FULL_SCREEN,
  SET_IS_CHROMECAST_DEVICES_VISIBLE,
  SET_IS_CONTENT_RESTRICTED,
  SET_LAST_CHECKED_CONTENT,
} from '../constants';

const initialState = {
  isFullScreen: true,
  isChromecastDevicesVisible: false,
  isContentRestricted: false,
  lastCheckedContent: null,
};

test('set full screen', () => {
  const action = createAction<boolean>(SET_IS_FULL_SCREEN)(false);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isFullScreen: false,
  });
});

test('is Chromecast Visible', () => {
  const action = createAction<boolean>(SET_IS_CHROMECAST_DEVICES_VISIBLE)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isChromecastDevicesVisible: true,
  });
});
test('is content restricted', () => {
  const action = createAction<boolean>(SET_IS_CONTENT_RESTRICTED)(true);
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    isContentRestricted: true,
  });
});
test('is content the last checked', () => {
  const action = createAction<string>(SET_LAST_CHECKED_CONTENT)('episodeId1234');
  // when and Then
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    lastCheckedContent: 'episodeId1234',
  });
});
