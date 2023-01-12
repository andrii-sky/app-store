import { MockStore } from 'redux-mock-store';

import { DVBThreeStepsInitStates } from '@/types/enums/DVBThreeStepsInitStates';
import { init } from '../../..';

import {
  SET_IS_MW_READY,
  SET_MW_CTX_COUNT,
  SET_MW_EVENT_SOURCE,
  SET_PLAYER_INSTANCE_ID,
  SET_SCAN_DVB_STATE,
  SET_HAS_MAIL,
  SET_IS_SERVICE_STATUS_OPEN,
  SET_IS_CAS_MODAL_DISPLAYED,
  SET_IS_CAS_HOME_SET,
  SET_DVB_RESERVATION_ID,
  SET_IS_PLAYER_SURFACE_SET,
  SET_PLAYER_ACTION_DONE,
  SET_QUERY_RECORDINGS_STATE,
  SET_IS_DVB_SIGAL_OK,
  SET_HAS_SATELLITE_CONNECTION,
} from '../constants';

import {
  setDvbSignalReservationId,
  setHasMail,
  setIsCasHomeSet,
  setIsMwReady,
  setIsPlayerSurfaceSet,
  setIsServiceStatusOpen,
  setIsCasErrorModalDisplayed,
  setMwCtxCount,
  setMwEventSource,
  setPlayerActionDone,
  setPlayerInstanceId,
  setQueryRecordingsState,
  setScanDvbState,
  setIsDvbSignalOk,
  setHasSatelliteConnection,
} from '../actions';

jest.mock('../../..');

const { createStore } = init();
const store = (createStore() as unknown) as MockStore;

describe('dvb actions', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    store.clearActions();
  });

  test('setDvbSignalReservationId', () => {
    const value = '2';

    const expectedActions = [
      {
        type: SET_DVB_RESERVATION_ID,
        payload: value,
      },
    ];

    store.dispatch(setDvbSignalReservationId(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setHasMail', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_HAS_MAIL,
        payload: value,
      },
    ];

    store.dispatch(setHasMail(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsCasHomeSet', () => {
    const value = DVBThreeStepsInitStates.ok;

    const expectedActions = [
      {
        type: SET_IS_CAS_HOME_SET,
        payload: value,
      },
    ];

    store.dispatch(setIsCasHomeSet(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsMwReady', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_MW_READY,
        payload: value,
      },
    ];

    store.dispatch(setIsMwReady(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsPlayerSurfaceSet', () => {
    const value = DVBThreeStepsInitStates.initiating;

    const expectedActions = [
      {
        type: SET_IS_PLAYER_SURFACE_SET,
        payload: value,
      },
    ];

    store.dispatch(setIsPlayerSurfaceSet(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsServiceStatusOpen', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_SERVICE_STATUS_OPEN,
        payload: value,
      },
    ];

    store.dispatch(setIsServiceStatusOpen(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsCasErrorModalDisplayed', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_CAS_MODAL_DISPLAYED,
        payload: value,
      },
    ];

    store.dispatch(setIsCasErrorModalDisplayed(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setMwCtxCount', () => {
    const value = 2;

    const expectedActions = [
      {
        type: SET_MW_CTX_COUNT,
        payload: value,
      },
    ];

    store.dispatch(setMwCtxCount(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setMwEventSource', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_MW_EVENT_SOURCE,
        payload: value,
      },
    ];

    store.dispatch(setMwEventSource(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setPlayerActionDone', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_PLAYER_ACTION_DONE,
        payload: value,
      },
    ];

    store.dispatch(setPlayerActionDone(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setPlayerInstanceId', () => {
    const value = '3';

    const expectedActions = [
      {
        type: SET_PLAYER_INSTANCE_ID,
        payload: value,
      },
    ];

    store.dispatch(setPlayerInstanceId(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setQueryRecordingsState', () => {
    const value = DVBThreeStepsInitStates.failed;

    const expectedActions = [
      {
        type: SET_QUERY_RECORDINGS_STATE,
        payload: value,
      },
    ];

    store.dispatch(setQueryRecordingsState(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setScanDvbState', () => {
    const value = DVBThreeStepsInitStates.ok;

    const expectedActions = [
      {
        type: SET_SCAN_DVB_STATE,
        payload: value,
      },
    ];

    store.dispatch(setScanDvbState(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setIsDvbSignalOk', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_IS_DVB_SIGAL_OK,
        payload: value,
      },
    ];

    store.dispatch(setIsDvbSignalOk(value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('setHasSatelliteConnection', () => {
    const value = true;

    const expectedActions = [
      {
        type: SET_HAS_SATELLITE_CONNECTION,
        payload: value,
      },
    ];

    store.dispatch(setHasSatelliteConnection(value));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
