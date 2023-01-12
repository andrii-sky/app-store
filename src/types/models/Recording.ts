import { RecordingState } from '../enums/RecordingState';

// eslint-disable-next-line import/prefer-default-export
export interface Recording {
  id: string;

  programmeId: string;

  state: RecordingState;

  start: number;

  duration: number;

  channelDvbTriplet: string;

  errors: string;
}
