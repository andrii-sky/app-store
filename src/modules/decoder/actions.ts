import { createApiAction } from '@/utils/api';
import STB_ACTIVATE_QUERY from '@/modules/decoder/queries/stbActivateDevice';
import { createAction } from '@reduxjs/toolkit';
import { ACTIVATE_STB_DEVICE, SET_INITIATE_DEVICE_ACTIVATION } from './constants';
import STORE_CONFIG, { GRAPH_QL_PATH } from '../../config';

export const initiateDeviceActivation = (value: any) =>
  createAction<any>(SET_INITIATE_DEVICE_ACTIVATION)({ value });

export const activateStbDevice = (serialNumber: string, chipId: string) =>
  createApiAction(ACTIVATE_STB_DEVICE, {
    baseURL: STORE_CONFIG.EXP_API_URL + GRAPH_QL_PATH,
    params: {
      query: STB_ACTIVATE_QUERY,
      variables: { serialNumber, chipId },
    },
    authenticated: true,
    graphQL: true,
  });
