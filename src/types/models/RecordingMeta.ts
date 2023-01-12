import { RecordingMetaStatus } from '../enums/RecordingMetaStatus';
import { LinearSlot } from '../graph-ql';

// eslint-disable-next-line import/prefer-default-export
export interface RecordingPlaybackMeta {
  id: string;

  programmeId: string;

  scheduledRecordingId: string;

  status: RecordingMetaStatus;

  start: number;

  duration: number;

  size: number;

  playInfo: string;

  channelDvbTriplet: string;

  profileId: string;

  seriesId?: string;

  slot?: LinearSlot;

  position?: string;
}
