import cancelLastAction, { CANCEL_RESPONSE } from '../racing';

const actionType = 'cancel_action';
const FirstActionResult = 'RESULT_A';
const SecondActionResult = 'RESULT_B';

/**
 * Mock a time break
 * @param timeout waiting time
 */
const mockTimeout = timeout => new Promise(resolve => setTimeout(resolve, timeout));

/**
 * Create an action by specific type and return value
 * @param result expected return value
 * @param timeout waiting time of the response
 */
const mockAsyncAction = (result, timeout) =>
  cancelLastAction(
    actionType,
    // Mock async action by Promise + setTimeout
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(result);
        }, timeout);
      }),
  );

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

test('when call second action immediately, the first action should be canceled', async () => {
  const targetPromise = mockAsyncAction(FirstActionResult, 1000);

  mockAsyncAction(SecondActionResult, 1000);

  jest.runAllTimers();

  return expect(targetPromise).resolves.toEqual(CANCEL_RESPONSE);
});

test('when call second action 400ms later, before first action return response, the first action should be canceled', async () => {
  const targetPromise = mockAsyncAction(FirstActionResult, 1000);

  // After 400ms, call the second action
  mockTimeout(400).then(() => mockAsyncAction(SecondActionResult, 1000));

  // Cannot use runAllTimers, because first action promise will be resolve as well.
  jest.advanceTimersByTime(400);

  return expect(targetPromise).resolves.toEqual(CANCEL_RESPONSE);
});

test('when call second action after first action return the response, the first action should return normal value', async () => {
  const targetPromise = mockAsyncAction(FirstActionResult, 300);

  // After 400ms, call the second action
  mockTimeout(400).then(() => mockAsyncAction(SecondActionResult, 300));

  jest.runAllTimers();

  return expect(targetPromise).resolves.toEqual(FirstActionResult);
});
