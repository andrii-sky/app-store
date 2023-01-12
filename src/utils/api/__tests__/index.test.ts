import produce from 'immer';

import { CALL_API } from '../../../middleware/api/types';
import { APIActionTypeSuffix, APIModuleState } from '../types';

import { createApiAction, createApiReducer } from '../index';

describe('Utils API', () => {
  test('createApiAction', () => {
    const actionTypePrefix = 'test_action_type';

    const action = {
      baseURL: 'http://test',
      path: '/api',
    };

    const apiAction = createApiAction(actionTypePrefix, action);

    expect(apiAction).toHaveProperty(CALL_API);
    expect(apiAction[CALL_API]).toEqual({
      ...action,
      actionTypes: [
        `${actionTypePrefix}_${APIActionTypeSuffix.REQUEST}`,
        `${actionTypePrefix}_${APIActionTypeSuffix.SUCCESS}`,
        `${actionTypePrefix}_${APIActionTypeSuffix.FAILURE}`,
        `${actionTypePrefix}_${APIActionTypeSuffix.CANCEL}`,
      ],
    });
  });

  test('createApiReducer', () => {
    const actionType = 'test_action_type';
    const apiReducer = createApiReducer({ actionType });
    expect(apiReducer).toBeTruthy();

    const requestReducer = produce(apiReducer[`${actionType}_${APIActionTypeSuffix.REQUEST}`]);
    const successReducer = produce(apiReducer[`${actionType}_${APIActionTypeSuffix.SUCCESS}`]);
    const failureReducer = produce(apiReducer[`${actionType}_${APIActionTypeSuffix.FAILURE}`]);

    expect(typeof requestReducer).toBe('function');
    expect(typeof successReducer).toBe('function');
    expect(typeof failureReducer).toBe('function');

    const requestState = requestReducer(
      { data: null, isLoading: false },
      { type: '', payload: null },
    ) as APIModuleState<any>;
    expect(requestState.isLoading).toBe(true);

    const successPayload = 'test_data';
    const successState = successReducer(
      { data: null, isLoading: true },
      { type: '', payload: successPayload },
    ) as APIModuleState<any>;
    expect(successState.isLoading).toBe(false);
    expect(successState.data).toEqual(successPayload);
    expect(successState.error).toBeUndefined();

    const failurePayload = new Error('test error');
    const failureState = failureReducer(
      { data: null, isLoading: true },
      { type: '', payload: failurePayload },
    ) as APIModuleState<any>;
    expect(failureState.isLoading).toBe(false);
    expect(failureState.data).toBeNull();
    expect(failureState.error).toEqual(failurePayload);
  });

  test('immutable createApiReducer', () => {
    const actionType = 'test_action_type';
    const apiReducer = createApiReducer({
      actionType,
      onRequest: draft => draft,
      onSuccess: (draft, action) => {
        // eslint-disable-next-line no-param-reassign
        draft.data[action.payload.id] = action.payload;
      },
      onFailure: (draft, action) => {
        // eslint-disable-next-line no-param-reassign
        draft.error = action.payload;
      },
    });
    expect(apiReducer).toBeTruthy();

    const requestReducer = produce(apiReducer[`${actionType}_${APIActionTypeSuffix.REQUEST}`]);
    const successReducer = produce(apiReducer[`${actionType}_${APIActionTypeSuffix.SUCCESS}`]);
    const failureReducer = produce(apiReducer[`${actionType}_${APIActionTypeSuffix.FAILURE}`]);

    const testData = { id: 'test_id', text: 'test_data' };
    const initialState = { data: { [testData.id]: testData }, isLoading: false };

    const requestState = requestReducer(initialState, {
      type: '',
      payload: null,
    }) as APIModuleState<any>;
    expect(requestState.data).toBe(initialState.data);
    expect(requestState.isLoading).toBe(true);

    const successPayload = { id: 'request_id', text: 'request_data' };
    const successState = successReducer(requestState, {
      type: '',
      payload: successPayload,
    }) as APIModuleState<any>;
    expect(successState.isLoading).toBe(false);
    expect(successState.data[testData.id]).toBe(requestState.data[testData.id]);
    expect(successState.data[successPayload.id]).toEqual(successPayload);
    expect(successState.error).toBeUndefined();

    const failurePayload = new Error('test error');
    const failureState = failureReducer(requestState, {
      type: '',
      payload: failurePayload,
    }) as APIModuleState<any>;
    expect(failureState.data[testData.id]).toBe(requestState.data[testData.id]);
    expect(failureState.isLoading).toBe(false);
    expect(failureState.error).toEqual(failurePayload);
  });
});
