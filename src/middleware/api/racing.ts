export const CANCEL_RESPONSE = '__CANCEL_RESPONSE__';

// Global cancel promise map
const cancelPromiseMap = {};

/**
 * Running racing condition control. only enable the latest request call. Ignore all the previous ones.
 * @param racingLatestActionType Specify the action type want to racing.
 * @param actionFunc Action func to be running.
 */
const cancelLastAction = (racingLatestActionType: string, actionFunc) => {
  // Get the cancel reject function from by the racingActionType
  const cancelResolve = cancelPromiseMap[racingLatestActionType];
  if (cancelResolve) {
    // Run the reject action to cancel the previous ongoing request
    cancelResolve(CANCEL_RESPONSE);
  }

  // Initialize a rejecting promise. push the reject function into the racingActionType,
  // So other request flow will be able to get it then cancel
  const cancelResolvePromise = new Promise(resolve => {
    cancelPromiseMap[racingLatestActionType] = resolve;
  });

  // Racing request action and rejecting promise.
  return Promise.race([actionFunc(), cancelResolvePromise]);
};

export default cancelLastAction;
