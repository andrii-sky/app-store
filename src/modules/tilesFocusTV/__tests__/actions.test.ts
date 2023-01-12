import {
  setFocusedElement,
  setFocusedRow,
  setIsFocused,
  setFocusedState,
} from '@/modules/tilesFocusTV/actions';
import { init } from '@/index';
import { MockStore } from 'redux-mock-store';
import {
  SET_FOCUSED_ELEMENT,
  SET_FOCUSED_ROW,
  SET_IS_FOCUSED,
  SET_FOCUSED_STATE,
} from '@/modules/tilesFocusTV/constants';

jest.mock('../../..');
jest.mock('../../../middleware/api/clients/graphQLClient');

const { createStore } = init();
const store = (createStore({}) as unknown) as MockStore;

describe('collection actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('set focused row', async () => {
    const payload = 3;
    const expectedActions = [{ payload, type: SET_FOCUSED_ROW }];

    store.dispatch(setFocusedRow(3) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set focused element', async () => {
    const payload = 4;
    const expectedActions = [{ payload, type: SET_FOCUSED_ELEMENT }];

    store.dispatch(setFocusedElement(4) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set is focused', async () => {
    const payload = true;
    const expectedActions = [{ payload, type: SET_IS_FOCUSED }];

    store.dispatch(setIsFocused(true) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set  focused state', async () => {
    const payload = { isFocused: true, rowIndex: 1, elementIndex: 2 };
    const expectedActions = [{ payload, type: SET_FOCUSED_STATE }];

    store.dispatch(setFocusedState(true, 1, 2) as any);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
