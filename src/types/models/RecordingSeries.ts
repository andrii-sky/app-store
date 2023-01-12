import { RecordingPlaybackMeta } from './RecordingMeta';

// eslint-disable-next-line import/prefer-default-export
export interface RecordingSeries {
  id: string;
  scheduledRecordings?: RecordingPlaybackMeta[];
  ignoreSlots?: string[];
}
