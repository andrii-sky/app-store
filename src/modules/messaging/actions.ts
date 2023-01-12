import { createAction } from '@reduxjs/toolkit';
import { SET_GLOBAL_MESSAGE } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const setGlobalMessage = message => createAction<string>(SET_GLOBAL_MESSAGE)(message);
