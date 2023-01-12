import {
  isFullScreen,
  isChromecastDevicesVisible,
  isContentRestricted,
  getLastCheckedContent,
} from '../selectors';

const initialState = {
  playerNative: {
    isFullScreen: true,
    isChromecastDevicesVisible: false,
    isContentRestricted: true,
    lastCheckedContent: null,
  },
};

test('initial state selectors', () => {
  expect(isFullScreen(initialState)).toEqual(true);
  expect(isChromecastDevicesVisible(initialState)).toEqual(false);
  expect(isContentRestricted(initialState)).toEqual(true);
  expect(getLastCheckedContent(initialState)).toEqual(null);
});
