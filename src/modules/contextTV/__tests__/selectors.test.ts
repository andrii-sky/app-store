import {
  dateString,
  isMenuOpen,
  isDisabledRCU,
  isOnScreenGuideVisible,
  longPressModeId,
  isKeyBoardOpen,
} from '../selectors';

const initialState = {
  contextTV: {
    dateString: '8:00pm',
    isMenuOpen: true,
    isDisabledRCU: false,
    isOnScreenGuideVisible: false,
    longPressModeId: '',
    isKeyBoardOpen: false,
  },
};

test('initial state selectors', () => {
  expect(dateString(initialState)).toEqual('8:00pm');
  expect(isMenuOpen(initialState)).toEqual(true);
  expect(isDisabledRCU(initialState)).toEqual(false);
  expect(isOnScreenGuideVisible(initialState)).toEqual(false);
  expect(longPressModeId(initialState)).toEqual('');
  expect(isKeyBoardOpen(initialState)).toEqual(false);
});
