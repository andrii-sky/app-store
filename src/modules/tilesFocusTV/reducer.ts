import { createCustomModuleReducer } from '@/utils/api';
import { combineReducers } from 'redux';
import {
  SET_FOCUSED_ROW,
  SET_FOCUSED_ELEMENT,
  SET_IS_FOCUSED,
  SET_FOCUSED_STATE,
} from './constants';

const reducers = {
  isFocused: createCustomModuleReducer<boolean>(
    {
      [SET_IS_FOCUSED]: (state, action) => action.payload,
      [SET_FOCUSED_STATE]: (state, action) => action.payload.isFocused,
    },
    false,
  ),
  focusedRow: createCustomModuleReducer<number>(
    {
      [SET_FOCUSED_ROW]: (state, action) => action.payload,
      [SET_FOCUSED_STATE]: (state, action) => action.payload.rowIndex,
    },
    0,
  ),
  focusedElement: createCustomModuleReducer<number>(
    {
      [SET_FOCUSED_ELEMENT]: (state, action) => action.payload,
      [SET_FOCUSED_STATE]: (state, action) => action.payload.elementIndex,
    },
    0,
  ),
};

export default combineReducers(reducers);
