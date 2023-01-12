import { Episode, Movie, Show } from '@/types/graph-ql';
import { createSelector } from 'reselect';
import { isShow } from '@/utils/Slot';
import { RecordingPlaybackMeta } from '@/types/models/RecordingMeta';
import { PlannerSorting } from '@/types/enums/PlannerSorting';
import { RecordingMetaStatus } from '@/types/enums/RecordingMetaStatus';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

const scheduledRecordingsByProgrammeIdState = createSelector(
  moduleState,
  state => state.scheduledRecordingsByProgrammeId,
);

const recordingsState = createSelector(moduleState, state => state.recordings);

export const scheduledRecordings = createSelector(scheduledRecordingsByProgrammeIdState, rs =>
  Object.values(rs),
);

export const scheduledRecording = createSelector(
  scheduledRecordingsByProgrammeIdState,
  rs => (programmeId: string) => rs[programmeId],
);

export const recordings = createSelector(recordingsState, rs => rs);

export const getSortOptions = () => [
  {
    id: PlannerSorting.NEWEST,
    title: 'Newest',
  },
  {
    id: PlannerSorting.OLDEST,
    title: 'Oldest',
  },
  {
    id: PlannerSorting.ALPHABETICAL,
    title: 'A-Z',
  },
];

export const selectedPlannerSorting = createSelector(moduleState, state => state.plannerSorting);

interface ShowWithRecordingsMeta extends Show {
  size: number;
  recordings: Array<RecordingPlaybackMeta>;
}
interface MovieWithRecordingsMeta extends Movie {
  size: number;
  recordings: Array<RecordingPlaybackMeta>;
}
export type BrandWithRecordingsMeta = ShowWithRecordingsMeta | MovieWithRecordingsMeta;
export const recordingsMetaGroupByBrand = createSelector(
  recordingsState,
  selectedPlannerSorting,
  (rs, sorting): Array<BrandWithRecordingsMeta> => {
    const sortedRecordings = [...rs];
    // by default, all the recordings would be sorted by newest
    sortedRecordings.sort((a, b) => {
      // the scheduled ones should always be the last.
      if (
        a.status !== RecordingMetaStatus.SCHEDULED &&
        b.status === RecordingMetaStatus.SCHEDULED
      ) {
        return -1;
      }
      if (
        a.status === RecordingMetaStatus.SCHEDULED &&
        b.status !== RecordingMetaStatus.SCHEDULED
      ) {
        return 1;
      }
      return sorting === PlannerSorting.OLDEST ? a.start - b.start : b.start - a.start;
    });
    const brandsById = sortedRecordings.reduce((result, recordingMeta) => {
      const { slot, size = 0 } = recordingMeta;
      const brand = isShow(slot) ? (slot?.programme as Episode)?.show : slot?.programme;
      if (slot && brand) {
        if (result[brand.id]) {
          const resBrand = result[brand.id];
          // always keep the recordings for overlay sorted by newest
          if (sorting === PlannerSorting.OLDEST) {
            resBrand.recordings.unshift(recordingMeta);
          } else {
            resBrand.recordings.push(recordingMeta);
          }
          return {
            ...result,
            [brand.id]: { ...resBrand, size: resBrand.size + size },
          };
        }
        return {
          ...result,
          [brand.id]: { ...brand, size, recordings: [recordingMeta] },
        };
      }
      return result;
    }, {});
    const brandsByIdArray: Array<BrandWithRecordingsMeta> = Object.values(brandsById);
    if (sorting === PlannerSorting.ALPHABETICAL) {
      brandsByIdArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    return brandsByIdArray;
  },
);

const recordingSettingsState = createSelector(moduleState, state => state.recordingSettings);

export const usedStorage = createSelector(
  recordingSettingsState,
  recordingSettings => recordingSettings.usedStorage || 0,
);

export const usedDiskspace = createSelector(
  recordingSettingsState,
  recordingSettings => recordingSettings.usedDiskspace || 0,
);

export const freeDiskspace = createSelector(
  recordingSettingsState,
  recordingSettings => recordingSettings.freeDiskspace || 0,
);

export const scheduledSeries = createSelector(moduleState, state => state.scheduledSeries);
