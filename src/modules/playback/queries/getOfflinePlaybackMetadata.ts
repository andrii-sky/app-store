import { PLAYBACK_SCHEDULE_SNIPPET, PLAYBACK_SOURCES_SNIPPET } from '@/utils/queries/Fragments';

const GET_OFFLINE_PLAYBACK_METADATA = drmType => `query GetOfflineVodPlayback($assetId: ID!, $deviceId: ID!, $playbackDevice: PlaybackDevice) {
  getOfflineVodPlayback(assetId: $assetId, deviceId: $deviceId, playbackDevice: $playbackDevice) {
      __typename
      ... on VodPlaybackSources {
        ${PLAYBACK_SOURCES_SNIPPET(drmType)}
      }
      ${PLAYBACK_SCHEDULE_SNIPPET}
    }
  }`;

export default GET_OFFLINE_PLAYBACK_METADATA;
