import { DVBThreeStepsInitStates } from '@/types/enums/DVBThreeStepsInitStates';
import {
  mwCtxCount,
  isMwReady,
  mwEventSource,
  playerInstanceId,
  hasMail,
  isServiceStatusOpen,
  isCasErrorModalDisplayed,
  scanDvbState,
  dvbSignalReservationId,
  isCasHomeSet,
  isPlayerSurfaceSet,
  isPlayerActionDone,
  queryRecordingsState,
  isDvbSignalOk,
  hasSatelliteConnection,
} from '../selectors';

const initialState = {
  dvb: {
    mwCtxCount: -2,
    isMwReady: false,
    mwEventSource: null,
    playerInstanceId: null,
    hasMail: false,
    isServiceStatusOpen: false,
    isCasErrorModalDisplayed: false,
    scanDvbState: DVBThreeStepsInitStates.ready,
    isCasHomeSet: DVBThreeStepsInitStates.ready,
    dvbSignalReservationId: '',
    isPlayerSurfaceSet: DVBThreeStepsInitStates.ready,
    isPlayerActionDone: false,
    queryRecordingsState: DVBThreeStepsInitStates.ready,
    isDvbSignalOk: true,
    hasSatelliteConnection: true,
  },
};

test('initial state selectors', () => {
  expect(mwCtxCount(initialState)).toEqual(-2);
  expect(isMwReady(initialState)).toEqual(false);
  expect(mwEventSource(initialState)).toEqual(null);
  expect(playerInstanceId(initialState)).toEqual(null);
  expect(hasMail(initialState)).toEqual(false);
  expect(isServiceStatusOpen(initialState)).toEqual(false);
  expect(isCasErrorModalDisplayed(initialState)).toEqual(false);
  expect(scanDvbState(initialState)).toEqual(DVBThreeStepsInitStates.ready);
  expect(isCasHomeSet(initialState)).toEqual(DVBThreeStepsInitStates.ready);
  expect(dvbSignalReservationId(initialState)).toEqual('');
  expect(isPlayerSurfaceSet(initialState)).toEqual(DVBThreeStepsInitStates.ready);
  expect(isPlayerActionDone(initialState)).toEqual(false);
  expect(queryRecordingsState(initialState)).toEqual(DVBThreeStepsInitStates.ready);
  expect(isDvbSignalOk(initialState)).toEqual(true);
  expect(hasSatelliteConnection(initialState)).toEqual(true);
});
