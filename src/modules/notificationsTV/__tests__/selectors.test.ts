import { notificationCount, notificationsSeen } from '../selectors';

const initialState = {
  notificationsTV: {
    notificationCount: 3,
    notificationsSeen: false,
  },
};

test('initial state selectors', () => {
  expect(notificationCount(initialState)).toEqual(3);
  expect(notificationsSeen(initialState)).toEqual(false);
});
