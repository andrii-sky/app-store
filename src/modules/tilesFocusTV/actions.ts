import { createAction } from '@reduxjs/toolkit';
import {
  SET_FOCUSED_ROW,
  SET_FOCUSED_ELEMENT,
  SET_IS_FOCUSED,
  SET_FOCUSED_STATE,
} from './constants';

export const setFocusedRow = (rowIndex: number) => createAction<any>(SET_FOCUSED_ROW)(rowIndex);
export const setFocusedElement = (elementIndex: number) =>
  createAction<any>(SET_FOCUSED_ELEMENT)(elementIndex);
export const setIsFocused = (isFocused: boolean) => createAction<any>(SET_IS_FOCUSED)(isFocused);
export const setFocusedState = (isFocused: boolean, rowIndex: number, elementIndex: number) =>
  createAction<any>(SET_FOCUSED_STATE)({ isFocused, rowIndex, elementIndex });
