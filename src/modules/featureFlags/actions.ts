import { createAction } from '@reduxjs/toolkit';
import { SAVE_FEATURE_FLAG, SAVE_ALL_FEATURE_FLAGS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const saveFeatureFlag = (name: string, value: any) =>
  createAction<any>(SAVE_FEATURE_FLAG)({ name, value });

export const saveAllFeatureFlags = featureFlags =>
  createAction<any>(SAVE_ALL_FEATURE_FLAGS)(featureFlags);
